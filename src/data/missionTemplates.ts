import { type Target, type Location } from './missionData';
import { getArticle, capitalize } from '../utils/textUtilities'
import { hostBodies } from '../data/hostBodies';
import { rollD6, rollDice } from '../utils/diceroller';

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

const eventTypes: Record<number, string> = {
    1: 'gala',
    2: 'birthday party',
    3: 'concert',
    4: 'flash mob',
    5: 'protest',
    6: 'wedding'
};

const emergencyTypes: Record<number, string> = {
    1: 'fire',
    2: 'gas leak',
    3: 'bomb threat',
    4: 'hostage situation',
    5: 'active shooter',
    6: 'medical emergency'
};

const malfunctionTypes: Record<number, string> = {
    1: 'power outage',
    2: 'access controls malfunction',
    3: 'security system mafunction',
    4: 'intermittent power outages',
    5: 'water main break',
    6: 'scheduled maintenance'
};

const identityCrisisTypes: Record<number, string> = {
    1: 'ex-spouse',
    2: 'former colleague',
    3: 'childhood friend',
    4: 'old rival',
    5: 'family member',
    6: 'former romantic partner'
};

const unwantedAttentionTypes: Record<number, string> = {
    1: 'media crews',
    2: 'social media influencers',
    3: 'news helicopters',
    4: 'paparazzi',
    5: 'citizen journalists',
    6: 'live streamers'
};

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
        'witness': (p: MissionParams) =>
            `${pickRandom(['Sabotage', 'Discredit'])} the testimony of ${getArticle(p.target!.name)} ${p.target!.name}! The target is located in ${getArticle(p.location.name)} ${p.location.name}!`,
        'a brain slime': (p: MissionParams) =>
            `A rogue brain slime has become a liability. Sabotage their operations! They are within ${getHostBody()} host body, located in ${getArticle(p.location.name)} ${p.location.name}.`,
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
        'a brain slime': (p: MissionParams) =>
            `The Mucilarchy needs intelligence on a rogue brain slime. They are within ${getHostBody()} host body in ${getArticle(p.location.name)} ${p.location.name}. Observe and report back.`,
        'slime technology': (p: MissionParams) =>
            `The Mucilarchy needs to locate and analyze the condition missing slime technology. ${pickRandom(['Find', 'Locate', 'Track down'])} the ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name} and report your findings!`,
        'technology': (p: MissionParams) =>
            `The Mucilarchy needs to understand how human technology works. Find ${getArticle(p.target!.name)} ${p.target!.name} in ${getArticle(p.location.name)} ${p.location.name} and ${pickRandom(['study', 'research'])} it!`,
        'cultural artifact': (p: MissionParams) =>
            `The Mucilarchy needs to know what significance ${getArticle(p.target!.name)} ${p.target!.name} holds to humans. Find the object in ${getArticle(p.location.name)} ${p.location.name} and ${pickRandom(['study', 'investigate'])}.`,
        'evidence': (p: MissionParams) =>
            `Humans hold incriminating evidence in ${getArticle(p.location.name)} ${p.location.name}. The evidence is ${getArticle(p.target!.name)} ${p.target!.name}. Find out whether this is true and report back!`,
        'data': (p: MissionParams) =>
            `The Mucilarchy needs to understand human record-keeping. ${pickRandom(['Observe', 'Study', 'Research'])} ${p.target!.name} located in ${getArticle(p.location.name)} ${p.location.name} and report back!`,
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
        return generateInfiltrateMission(params);
    }

    const typeTemplates = missionTemplates[params.type] as Record<string, (p: MissionParams) => string>;
    const template = typeTemplates?.[params.targetCategory || ''];

    if (!template) {
        console.error(`No template found for type: ${params.type}, category: ${params.targetCategory}`);
        return 'Mission template not found';
    }

    const baseMission = template(params);
    const contextualMission = addMissionContext(baseMission, params);

    return contextualMission;
};

const generateInfiltrateMission = (params: MissionParams): string => {
    const baseMission = missionTemplates.infiltrate.default(params);
    const featureContext = getFeatureContext(params.location.name, params.locationFeature);
    const complicationContext = getComplicationContext(params.complication, params.type, params.location.name, params);

    return `${baseMission} Note that ${featureContext} ${complicationContext}`;
};

const addMissionContext = (baseMission: string, params: MissionParams): string => {
    const { location, locationFeature, complication, type } = params;

    const featureContext = getFeatureContext(location.name, locationFeature);
    const complicationContext = getComplicationContext(complication, type, location.name, params);

    return `${baseMission} Note that ${featureContext} ${complicationContext}`;
};

const getFeatureContext = (locationName: string, feature: string): string => {
    // Outdoor/non-building locations
    const outdoorLocations = ['landfill', 'amusement park', 'trailer park', 'gated community', 'suburbs'];
    const isOutdoor = outdoorLocations.some(loc => locationName.includes(loc));

    const featureMap: Record<string, string | ((location: string, outdoor: boolean) => string)> = {
        'under construction': `the ${locationName} is currently under heavy construction, with scaffolding, exposed infrastructure, and construction crews working throughout the premises.`,
        'special event': (() => {
            const event = eventTypes[rollD6()];
            return `a ${event} is taking place at the ${locationName}, drawing large crowds and additional security personnel.`;
        })(),
        'emergency': (() => {
            const emergency = emergencyTypes[rollD6()];
            return `a ${emergency} is unfolding at the ${locationName}. First responders, evacuation procedures, and chaos will affect your approach.`;
        })(),
        'multi-level': `the ${locationName} is a multi-level structure with elevators, stairwells, and vertical access points across multiple floors.`,
        'open-air': `the ${locationName} features open-air sections with courtyards and outdoor walkways, exposing movements to observation.`,
        'historic building': (location: string, outdoor: boolean) => {
            if (outdoor) {
                return `the ${location} is a historic site with old infrastructure, worn pathways, and potentially unreliable facilities.`;
            }
            return `the ${location} is housed in a historic building with old architecture, narrow passages, and potentially unreliable infrastructure.`;
        }
    };

    const featureValue = featureMap[feature];

    if (typeof featureValue === 'function') {
        return featureValue(locationName, isOutdoor);
    }

    return featureValue || '';
};

const getComplicationContext = (complication: string, missionType: MissionType, locationName: string, params: MissionParams): string => {
    // Determine if target is a person or object
    const personCategories = ['politician', 'expert', 'civilian', 'witness', 'a brain slime', 'military officer'];
    const isPersonTarget = params.targetCategory && personCategories.includes(params.targetCategory);
    // Handle identity crisis specially since it uses randomization
    if (complication === 'identity crisis') {
        const relationship = identityCrisisTypes[rollD6()];
        return `Your host body's ${relationship} is at the ${locationName}. They will be able to recognize you and expect you to act normally.`;
    }

    // Handle technical malfunction specially
    if (complication === 'technical malfunction') {
        const malfunction = malfunctionTypes[rollD6()];
        return `A ${getArticle(malfunction)} ${malfunction} is affecting the target location.`;
    }

    if (complication === 'unwanted attention') {
        const attentionType = unwantedAttentionTypes[rollD6()];
        return `There are ${attentionType} on site. Any suspicious activity may be documented and shared. Maintain your cover.`;
    }

    if (complication === 'trap') {
        return `Intelligence suggests this mission may be a setup by ${pickRandom(['a rogue brain slime cell', 'an unknown opposing facction', 'a group of humans aware of brain slime activity'])}. Proceed with extreme caution.`;
    }

    // Regular complications without randomization
    const complicationMap: Record<string, Record<string, { person?: string; object?: string; default?: string }>> = {

        'time pressure': {
            'sabotage': {
                person: 'You have limited time before the target\'s schedule changes and they become inaccessible.',
                object: `You have a narrow window before the target is ${pickRandom(['moved', 'secured'])}.`
            },
            'steal': {
                person: 'The target is scheduled to move beyond our reach soon. Act fast.',
                object: 'The target will be moved to a secure location soon. Act fast.'
            },
            'study': {
                person: 'You must complete your observations before the target departs the area.',
                object: `You have limited time before the target is ${pickRandom(['relocated', 'secured', 'destroyed'])}.`
            },
            'eliminate': {
                person: 'The target is scheduled to enter protective custody soon. This is your only window.',
                object: `The target will be ${pickRandom(['relocated', 'secured'])} soon. This is your only window.`
            },
            'protect': {
                default: `${pickRandom(['A threat', 'An attack'])} on the asset is imminent. You must secure the area immediately.`
            },
            'infiltrate': {
                default: 'The location will become inaccessible soon. Act fast.'
            }
        },
        'high security': {
            'sabotage': {
                default: `The ${locationName} has abnormally high security measures, be careful.`
            },
            'steal': {
                person: 'The target is surrounded by bodyguards and security.',
                object: 'Multiple layers of security protect the target.'
            },
            'study': {
                default: `Heightened security presence in the ${locationName} will make observation difficult.`
            },
            'eliminate': {
                person: `The target is surrounded by bodyguards and security.`,
                object: `The target is in a highly secure area of the ${locationName}.`
            },
            'protect': {
                default: 'The area has heightened human security that may act against the target if something goes wrong.'
            },
            'infiltrate': {
                default: `The ${locationName} measures, which will make infiltration difficult.`
            }
        }
    };

    const missionComplications = complicationMap[complication]?.[missionType];
    if (!missionComplications) return '';

    // Choose person, object, or default text
    if (isPersonTarget && missionComplications.person) {
        return missionComplications.person;
    } else if (!isPersonTarget && missionComplications.object) {
        return missionComplications.object;
    } else {
        return missionComplications.default || '';
    }
}