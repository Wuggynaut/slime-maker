import { create } from 'zustand';
import {
    missionType,
    missionTargetIndividual,
    missionTargetObject,
    missionLocation,
    missionLocationFeature,
    missionComplication
} from '../data/missionData';
import { getMissionText, type MissionParams, type MissionType } from '../data/missionTemplates';
import { rollD6 } from '../utils/diceroller';
import { rollFromArray } from '../utils/rollFromArray';

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

    if (mission === 'protect') {
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

interface MissionStore {
    missionParameters: MissionParams;
    missionText: string;
    regenerateMission: () => void;
}

export const useMissionStore = create<MissionStore>((set) => {
    const initialMission = generateMissionParameters();

    return {
        missionParameters: initialMission,
        missionText: getMissionText(initialMission),
        regenerateMission: () => {
            const newMission = generateMissionParameters();
            set({
                missionParameters: newMission,
                missionText: getMissionText(newMission)
            });
        }
    };
});