import { useState } from 'react'
import {
    missionType,
    missionTargetIndividual,
    missionTargetObject,
    missionLocation,
    missionLocationFeature,
    missionComplication
} from './data/missionData'
import { rollD6 } from './utils/diceRoller';

export function GenerateMission() {
    const rollFromArray = <T,>(array: T[]): T => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const generateMissionParameters = () => {
        let mission = missionType[rollD6()];

        const targetroll = Math.floor(Math.random() * 2) + 1;
        const targetCategory = targetroll === 1
            ? missionTargetIndividual
            : missionTargetObject;
        let targetType = targetCategory[rollD6()];

        switch (mission) {
            case 'steal':
                if (targetroll === 1) mission = 'kidnap';
                break;
            case 'study':
                const validtargets = Object.values(targetCategory).filter(t => t.id !== 5);
                targetType = rollFromArray(validtargets)
                break;
            case 'eliminate':
                if (targetroll === 2) mission = 'destroy';
                break;
            default:
                break;
        }

        const target = rollFromArray(targetType.targets);

        const validLocations = target.validLocationCategories
            ? Object.values(missionLocation).filter(loc =>
                target.validLocationCategories!.includes(loc.id)
            )
            : Object.values(missionLocation);

        const locationCategory = rollFromArray(validLocations);

        return {
            type: mission,
            target: target.name,
            location: rollFromArray(locationCategory.locations).name,
            locationFeature: missionLocationFeature[rollD6()],
            complication: missionComplication[rollD6()]
        };
    };

    const [missionParameters] = useState(generateMissionParameters);

    return (
        <>
            <p><strong>Mission type:</strong> {missionParameters.type}</p>
            <p><strong>Target:</strong> {missionParameters.target}</p>
            <p><strong>Location:</strong> {missionParameters.location}</p>
            <p><strong>Location Feature:</strong> {missionParameters.locationFeature}</p>
            <p><strong>Complication:</strong> {missionParameters.complication}</p>
        </>
    )
}

/*
Mission type
Target
 IndividualCategory
    CategoryTarget
 ObjectCategory
    CategoryTarget
Location
 Category
  CategoryLocation
Location Feature
Complication


Mission type: Sabotage
Target:
    Individual
        Politician (Politically)
        Expert (Professionally?)
        Civilian (Everyday life?)
        Witness (Reputation)
        A Brain Slime
        Military Officer (Professionally)
    Object
        Technology (Destroy/Disable)
        Important Data (Change/Compromise)
        Cultural Artifact (Change/Deface)
        Evidence (Change)
        Slime Technology (Destroy/Disable)
        Weapon (Destroy/Disable)

rules: missiontype
Sabotage:
    valid targets: individual, object
Steal:
    valid targets: Individual (kindap), object
Study:
    valid targets: Individual, object EXCEPT brain slime or slime technology
Eliminate:
    valid targets: Individual, object (destroy)
Protect:
    valid targets: individual, object
Infiltrate:
    Target is LOCATION

rules: target Individual
Politician: ALL
Expert: ALL


        */