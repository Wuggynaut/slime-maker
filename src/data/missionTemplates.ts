import { type Target, type Location } from './missionData';
import { getArticle, capitalize } from '../utils/textUtilities'
import { hostBodies } from '../data/hostBodies';
import { rollDice } from '../utils/diceRoller';

export type MissionType = 'sabotage' | 'steal' | 'study' | 'eliminate' | 'protect' | 'infiltrate';

export type MissionParams = {
    type: MissionType;
    targetCategory: string | null;
    targetCategoryId: number | null;
    target: Target | null;
    location: Location;
    locationFeature: string;
    complication: string;
}

const pickRandom = <T,>(options: T[]): T => {
    return options[Math.floor(Math.random() * options.length)];
};

const getHostBody = (): string => {
    const body = hostBodies[rollDice('1d36')].occupation;

    return getArticle(body) + ' ' + body;
}

const missionTemplates = {
    sabotage: {
        'politician': (p: MissionParams) =>
            `${pickRandom(['Sabotage', 'Ruin'])} the reputation of ${getArticle(p.target!.name)} ${p.target!.name}! The target is located in ${getArticle(p.location.name)} ${p.location.name}!`,
        'expert': (p: MissionParams) =>
            `${pickRandom(['Sabotage', 'Ruin'])} the reputation of ${getArticle(p.target!.name)} ${p.target!.name}! The target is located in ${getArticle(p.location.name)} ${p.location.name}!`,
        'civilian': (p: MissionParams) =>
            `${pickRandom(['Sabotage', 'Ruin'])} the reputation of ${getArticle(p.target!.name)} ${p.target!.name}! The target is located in ${getArticle(p.location.name)} ${p.location.name}!`,
        'military officer': (p: MissionParams) =>
            `${pickRandom(['Sabotage', 'Ruin'])} the reputation of ${getArticle(p.target!.name)} ${p.target!.name}! The target is located in ${getArticle(p.location.name)} ${p.location.name}!`,
        'technology': (p: MissionParams) =>
            `${pickRandom(['Sabotage', 'Disable'])} ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}!`,
        'data': (p: MissionParams) =>
            `${pickRandom(['Alter', 'Compromise', 'Sabotage'])} ${p.target!.name} found in ${getArticle(p.location.name)} ${p.location.name}!`,
        'cultural artifact': (p: MissionParams) =>
            `${pickRandom(['Alter', 'Deface'])} ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}!`,
        'evidence': (p: MissionParams) =>
            `${pickRandom(['Alter', 'Compromise', 'Sabotage'])} incriminating evidence! The target is ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}.`,
        'slime technology': (p: MissionParams) =>
            `${pickRandom(['Sabotage', 'Disable'])} slime technology at the hands of our enemies! The target technology is ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}.`,
        'weapon': (p: MissionParams) =>
            `${pickRandom(['Sabotage', 'Disable'])} ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}, for the defense of the Mucilarchy!`,
    },

    steal: {
        'politician': (p: MissionParams) =>
            `${pickRandom(['Kidnap', 'Capture'])} ${getArticle(p.target!.name)} ${p.target!.name}! The target can be found in ${getArticle(p.location.name)} ${p.location.name}.`,
        'expert': (p: MissionParams) =>
            `${pickRandom(['Kidnap', 'Capture'])} ${getArticle(p.target!.name)} ${p.target!.name}! The target can be found in ${getArticle(p.location.name)} ${p.location.name}.`,
        'civilian': (p: MissionParams) =>
            `${pickRandom(['Kidnap', 'Capture'])} ${getArticle(p.target!.name)} ${p.target!.name}! The target can be found in ${getArticle(p.location.name)} ${p.location.name}.`,
        'military officer': (p: MissionParams) =>
            `${pickRandom(['Kidnap', 'Capture'])} ${getArticle(p.target!.name)} ${p.target!.name}! The target can be found in ${getArticle(p.location.name)} ${p.location.name}.`,
        'witness': (p: MissionParams) =>
            `Safeguard the invasion by kidnapping a human who knows too much! The target is ${getArticle(p.target!.name)} ${p.target!.name} and can be found in ${getArticle(p.location.name)} ${p.location.name}.`,
        'a brain slime': (p: MissionParams) => {
            const isHostless = Math.random() > 0.5;
            if (isHostless) {
                return `Retrieve another slime from the field. The target is a hostless brain slime, hiding in ${getArticle(p.location.name)} ${p.location.name}.`;
            } else {
                return `Kidnap a rogue brain slime from the field! The target is within ${getHostBody()} host body, and can be found in ${getArticle(p.location.name)} ${p.location.name}.`;
            }
        },
        'technology': (p: MissionParams) =>
            `${pickRandom(['Steal', 'Acquire'])} ${getArticle(p.target!.name)} ${p.target!.name} from ${getArticle(p.location.name)} ${p.location.name}!`,
        'data': (p: MissionParams) =>
            `Locate and ${pickRandom(['steal', 'acquire'])} ${p.target!.name} from ${getArticle(p.location.name)} ${p.location.name}!`,
        'cultural artifact': (p: MissionParams) =>
            `${pickRandom(['Steal', 'Acquire'])} ${getArticle(p.target!.name)} ${p.target!.name} from ${getArticle(p.location.name)} ${p.location.name}!`,
        'evidence': (p: MissionParams) =>
            `Incriminating evidence has been located in ${getArticle(p.location.name)} ${p.location.name}, and must be captured! The evidence in question is ${getArticle(p.target!.name)} ${p.target!.name}.`,
        'slime technology': (p: MissionParams) =>
            `A piece of slime technology has been found in ${getArticle(p.location.name)} ${p.location.name}, and must be retrieved at once! The technology in question is ${getArticle(p.target!.name)} ${p.target!.name}.`,
        'weapon': (p: MissionParams) =>
            `${pickRandom(['Steal', 'Acquire'])} ${getArticle(p.target!.name)} ${p.target!.name} from ${getArticle(p.location.name)} ${p.location.name}!`,
    },

    study: {
        'politician': (p: MissionParams) =>
            `The Mucilarchy needs information about earthlings. ${pickRandom(['Observe', 'Study', 'Research'])} ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}.`,
        'expert': (p: MissionParams) =>
            `The Mucilarchy needs information about earthlings. ${pickRandom(['Observe', 'Study', 'Research'])} ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}.`,
        'civilian': (p: MissionParams) =>
            `The Mucilarchy needs information about earthlings. ${pickRandom(['Observe', 'Study', 'Research'])} ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}.`,
        'witness': (p: MissionParams) =>
            `The Mucilarchy needs information about earthlings. ${pickRandom(['Observe', 'Study', 'Research'])} ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}.`,
        'military officer': (p: MissionParams) =>
            `The Mucilarchy needs information about earthlings. ${pickRandom(['Observe', 'Study', 'Research'])} ${getArticle(p.target!.name)} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name}.`,
        'technology': (p: MissionParams) =>
            `The Mucilarchy needs to understand how human technology works. Find ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name} and ${pickRandom(['study', 'research'])} it!`,
        'cultural artifact': (p: MissionParams) =>
            `The Mucilarchy needs to know what significance ${getArticle(p.target!.name)} ${p.target!.name} holds to humans. Find the object in ${getArticle(p.location.name)} ${p.location.name} and ${pickRandom(['study', 'investigate'])}.`,
        'evidence': (p: MissionParams) =>
            `Humans hold incriminating evidence in ${getArticle(p.location.name)} ${p.location.name}. The evidence is ${getArticle(p.target!.name)} ${p.target!.name}. Find out whether this is true and report back!`,
        'weapon': (p: MissionParams) =>
            `The Mucilarchy must know how human defenses work. ${pickRandom(['Observe', 'Study', 'Research'])} ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name} and report back!`,
    },

    eliminate: {
        'politician': (p: MissionParams) =>
            `A human stands in the way of the invasion plan! The target is ${getArticle(p.target!.name)} ${p.target!.name}. Locate them in ${getArticle(p.location.name)} ${p.location.name} and ${pickRandom(['eliminate', 'assassinate', 'take care of'])} them.`,
        'expert': (p: MissionParams) =>
            `A human stands in the way of the invasion plan! The target is ${getArticle(p.target!.name)} ${p.target!.name}. Locate them in ${getArticle(p.location.name)} ${p.location.name} and ${pickRandom(['eliminate', 'assassinate', 'take care of'])} them.`,
        'civilian': (p: MissionParams) =>
            `A human stands in the way of the invasion plan! The target is ${getArticle(p.target!.name)} ${p.target!.name}. Locate them in ${getArticle(p.location.name)} ${p.location.name} and ${pickRandom(['eliminate', 'assassinate', 'take care of'])} them.`,
        'military officer': (p: MissionParams) =>
            `A human stands in the way of the invasion plan! The target is ${getArticle(p.target!.name)} ${p.target!.name}. Locate them in ${getArticle(p.location.name)} ${p.location.name} and ${pickRandom(['eliminate', 'assassinate', 'take care of'])} them.`,
        'witness': (p: MissionParams) =>
            `The invasion has been compromised! You must ${pickRandom(['eliminate', 'assassinate', 'take care of'])} the human who knows too much. The target is ${getArticle(p.target!.name)} ${p.target!.name} and can be found in ${getArticle(p.location.name)} ${p.location.name}.`,
        'a brain slime': (p: MissionParams) =>
            `A fellow slime has gone rogue, and must be eliminated. They are within ${getHostBody()} host body, and located in ${getArticle(p.location.name)} ${p.location.name}. Do what needs to be done.`,
        'technology': (p: MissionParams) =>
            `The Mucilarchy needs you to ${pickRandom(['destroy', 'dispose of'])} ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name}!`,
        'cultural artifact': (p: MissionParams) =>
            `The Mucilarchy needs you to ${pickRandom(['destroy', 'dispose of'])} ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name}!`,
        'weapon': (p: MissionParams) =>
            `The Mucilarchy needs you to ${pickRandom(['destroy', 'dispose of'])} ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name}!`,
        'data': (p: MissionParams) =>
            `You must dispose of ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name}.`,
        'evidence': (p: MissionParams) =>
            `You must dispose of incriminating evidence located in ${getArticle(p.location.name)} ${p.location.name}! The evidence is ${getArticle(p.target!.name)} ${p.target!.name}!`,
        'slime technology': (p: MissionParams) =>
            `A piece of slime technology has been found in ${getArticle(p.location.name)} ${p.location.name}! It is ${getArticle(p.target!.name)} ${p.target!.name}. You must ${pickRandom(['destroy', 'dispose of'])} it before the humans find it!`,
    },

    protect: {
        'politician': (p: MissionParams) =>
            `${capitalize(getArticle(p.target!.name))} ${p.target!.name} is vital to the invasion plan. Go to the ${p.location.name} and protect them from harm!`,
        'expert': (p: MissionParams) =>
            `${capitalize(getArticle(p.target!.name))} ${p.target!.name} is vital to the invasion plan. Go to the ${p.location.name} and protect them from harm!`,
        'civilian': (p: MissionParams) =>
            `${capitalize(getArticle(p.target!.name))} ${p.target!.name} is vital to the invasion plan. Go to the ${p.location.name} and protect them from harm!`,
        'military officer': (p: MissionParams) =>
            `${capitalize(getArticle(p.target!.name))} ${p.target!.name} is vital to the invasion plan. Go to the ${p.location.name} and protect them from harm!`,
        'a brain slime': (p: MissionParams) =>
            `A fellow Brain Slime in ${getArticle(p.location.name)} ${p.location.name} needs your protection. They are within ${getHostBody()} host body.`,
        'technology': (p: MissionParams) =>
            `The Mucilarchy has gained control of ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name}. Go there and protect it from harm!`,
        'cultural artifact': (p: MissionParams) =>
            `The Mucilarchy has gained control of ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name}. Go there and protect it from harm!`,
        'weapon': (p: MissionParams) =>
            `The Mucilarchy has gained control of ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name}. Go there and protect it from harm!`,
        'data': (p: MissionParams) =>
            `There is vital data located in ${getArticle(p.location.name)} ${p.location.name}. The data is ${p.target!.name}. Protect it at all costs!`,
        'slime technology': (p: MissionParams) =>
            `The Mucilarchy has embedded a piece of Slime Technology within ${getArticle(p.location.name)} ${p.location.name} to aid with the invasion. It is ${getArticle(p.target!.name)} ${p.target!.name}, and must be protected at all costs!`,
    },

    infiltrate: {
        'default': (p: MissionParams) =>
            `The Mucilarchy needs a group of slimes to infiltrate a human ${p.location.name}.`
    }
};

export const getMissionText = (params: MissionParams): string => {
    if (params.type === 'infiltrate') {
        return missionTemplates.infiltrate.default(params);
    }

    const typeTemplates = missionTemplates[params.type] as Record<string, (p: MissionParams) => string>;
    const template = typeTemplates?.[params.targetCategory || ''];

    if (!template) {
        console.error(`No template found for type: ${params.type}, category: ${params.targetCategory}`);
        return 'Mission template not found';
    }

    return template(params);
};