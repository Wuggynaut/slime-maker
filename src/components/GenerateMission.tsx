import { useState } from 'react'
import {
    missionType,
    missionTargetIndividual,
    missionTargetObject,
    missionLocation,
    missionLocationFeature,
    missionComplication
} from '../data/missionData'
import { getMissionText, type MissionParams, type MissionType } from '../data/missionTemplates';
import { rollD6 } from '../utils/diceroller';
import { capitalize, capitalizeAll } from '../utils/textUtilities'

export function GenerateMission() {
    const rollFromArray = <T,>(array: T[]): T => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const generateMissionParameters = (): MissionParams => {
        let mission = missionType[rollD6()] as MissionType;

        if (mission === 'infiltrate') {
            const locationCategory = missionLocation[rollD6()];
            return {
                type: mission,
                targetCategory: null,
                targetCategoryId: null,
                target: null,
                location: rollFromArray(locationCategory.locations),
                locationFeature: missionLocationFeature[rollD6()].name,
                complication: missionComplication[rollD6()].name
            };
        }

        const targetroll = Math.floor(Math.random() * 2) + 1;
        const targetCategory = targetroll === 1
            ? missionTargetIndividual
            : missionTargetObject;

        let targetType = targetCategory[rollD6()];
        let validtargets;

        if (mission === 'study') {
            validtargets = Object.values(targetCategory).filter(t => t.id !== 5);
            targetType = rollFromArray(validtargets)
        } else if (mission === 'protect') {
            validtargets = Object.values(targetCategory).filter(t => t.id !== 4);
            targetType = rollFromArray(validtargets)
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
            targetCategory: targetType.name,
            targetCategoryId: targetType.id,
            target: target,
            location: rollFromArray(locationCategory.locations),
            locationFeature: missionLocationFeature[rollD6()].name,
            complication: missionComplication[rollD6()].name
        };
    };

    const [missionParameters, setMissionParameters] = useState(generateMissionParameters);
    const [missionText, setMissionText] = useState(getMissionText(missionParameters));

    const handleNewMission = () => {
        const newMission = generateMissionParameters();

        setMissionParameters(newMission);
        setMissionText(getMissionText(newMission));
    }

    return (
        <>
            <h2>Mission: {capitalize(missionParameters.type)} {missionParameters.target ? capitalizeAll(missionParameters.target.name) : capitalizeAll(missionParameters.location.name)} </h2>
            <p><strong>Description:</strong> {missionText}</p>
            <div className='card'>
                <p><strong>Mission type:</strong> {capitalize(missionParameters.type)}</p>
                {missionParameters.target && <p><strong>Target:</strong> {capitalize(missionParameters.target.name)}</p>}
                <p><strong>Location:</strong> {capitalize(missionParameters.location.name)}</p>
                <p><strong>Location Feature:</strong> {capitalize(missionParameters.locationFeature)}</p>
                <p><strong>Complication:</strong> {capitalize(missionParameters.complication)}</p>
            </div>
            <button onClick={handleNewMission}>New Mission</button>
            <p>{capitalizeAll('this is test text')}</p>
        </>
    )
}