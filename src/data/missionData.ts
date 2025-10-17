export const missionType: Record<number, string> = {
    1: 'sabotage',
    2: 'steal',
    3: 'study',
    4: 'eliminate',
    5: 'protect',
    6: 'infiltrate'
}

export type Target = {
    id: number;
    name: string;
    validLocationCategories?: number[];
}

export type TargetCategory = {
    id: number;
    name: string;
    targets: Target[];
}

export const missionTargetIndividual: Record<number, TargetCategory> = {
    1: {
        id: 1,
        name: 'politician',
        targets: [
            { id: 1, name: 'mayor', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 2, name: 'president' },
            { id: 3, name: 'city councilor', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 4, name: 'governor' },
            { id: 5, name: 'senator' },
            { id: 6, name: 'prime minister' },
            { id: 7, name: 'school board member', validLocationCategories: [1, 2, 3, 4] },
            { id: 8, name: 'vice president' }
        ]
    },
    2: {
        id: 2,
        name: 'expert',
        targets: [
            { id: 1, name: 'scientist' },
            { id: 2, name: 'astronomer', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 3, name: 'professor', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 4, name: 'doctor', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 5, name: 'attourney' },
            { id: 6, name: 'engineer' },
            { id: 7, name: 'economist', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 8, name: 'sociologist', validLocationCategories: [1, 2, 3, 4, 5] }
        ]
    },
    3: {
        id: 3,
        name: 'civilian',
        targets: [
            { id: 1, name: 'store manager', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 2, name: 'influencer' },
            { id: 3, name: 'librarian', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 4, name: 'chef', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 5, name: 'office manager', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 6, name: 'clerk', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 7, name: 'banker', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 8, name: 'security guard' },
            { id: 9, name: 'dentist', validLocationCategories: [1, 2, 3, 4, 5] },
            { id: 10, name: 'retiree', validLocationCategories: [1, 2, 3, 4, 5] }
        ]
    },
    4: {
        id: 4,
        name: 'witness',
        targets: [
            { id: 1, name: 'previous host body' },
            { id: 2, name: 'eyewitness of slime operations' },
            { id: 3, name: 'conspiracy theorist' }
        ]
    },
    5: {
        id: 5,
        name: 'a brain slime',
        targets: [
            { id: 1, name: 'hostless brain slime' },
            { id: 2, name: 'brain slime within human host' }
        ],
    },
    6: {
        id: 6,
        name: 'military officer',
        targets: [
            { id: 1, name: 'admiral' },
            { id: 2, name: 'naval captain' },
            { id: 3, name: 'air marshal' },
            { id: 4, name: 'aircraft pilot' },
            { id: 5, name: 'submarine commander' },
            { id: 6, name: 'platoon commander' }
        ]
    }
}

export const missionTargetObject: Record<number, TargetCategory> = {
    1: {
        id: 1,
        name: 'technology',
        targets: [
            { id: 1, name: 'satellite network', validLocationCategories: [5, 6] },
            { id: 2, name: 'nuclear reactor', validLocationCategories: [5] },
            { id: 3, name: 'hard drives' },
            { id: 4, name: 'computer' },
            { id: 5, name: 'mining equipment', validLocationCategories: [5] },
            { id: 6, name: 'truck' },
            { id: 7, name: 'cell tower' },
            { id: 8, name: 'boat' }
        ]
    },
    2: {
        id: 2,
        name: 'data',
        targets: [
            { id: 1, name: 'blackmail material' },
            { id: 2, name: 'tax records' },
            { id: 3, name: 'nuclear codes', validLocationCategories: [3, 6] },
            { id: 4, name: 'weapon schematics', validLocationCategories: [5, 6] },
            { id: 5, name: 'research data', validLocationCategories: [2, 4, 5] },
            { id: 6, name: 'building blueprints' },
            { id: 7, name: 'passwords' },
            { id: 8, name: 'planetary defense plans', validLocationCategories: [3, 6] }
        ]
    },
    3: {
        id: 3,
        name: 'cultural artifact',
        targets: [
            { id: 1, name: 'religious text' },
            { id: 2, name: 'crown jewels', validLocationCategories: [1, 3] },
            { id: 3, name: 'painting' },
            { id: 4, name: 'statue' },
            { id: 5, name: 'family photo album' },
            { id: 6, name: 'declaration of independence', validLocationCategories: [1, 3] },
            { id: 7, name: 'ancient manuscript' },
            { id: 8, name: 'dinosaur fossil', validLocationCategories: [1, 2] }
        ]
    },
    4: {
        id: 4,
        name: 'evidence',
        targets: [
            { id: 1, name: 'photographs' },
            { id: 2, name: 'videotapes' },
            { id: 3, name: 'dead slime specimen', validLocationCategories: [2, 5, 6] },
            { id: 4, name: 'crashed space ship' },
            { id: 5, name: 'eye-witness account' },
            { id: 6, name: 'slime technology' }
        ]
    },
    5: {
        id: 5,
        name: 'slime technology',
        targets: [
            { id: 1, name: 'space vessel' },
            { id: 2, name: 'slime mass regeneration chamber' },
            { id: 3, name: 'biomass fabricator' },
            { id: 4, name: 'communicator membrane' },
            { id: 5, name: 'memory storage mass' },
            { id: 6, name: 'transportation egg' }
        ]
    },
    6: {
        id: 6,
        name: 'weapon',
        targets: [
            { id: 1, name: 'nuclear warhead', validLocationCategories: [6] },
            { id: 2, name: 'tank', validLocationCategories: [6] },
            { id: 3, name: 'fighter jet', validLocationCategories: [6] },
            { id: 4, name: 'rocket launcher', validLocationCategories: [6] },
            { id: 5, name: 'aerial defense cannon', validLocationCategories: [6] },
            { id: 6, name: 'pistol' },
            { id: 7, name: 'pepper spray' },
            { id: 8, name: 'taser' },
            { id: 9, name: 'orbital weapons platform', validLocationCategories: [6] },
            { id: 10, name: 'shotgun' }
        ]
    }
}

export type Location = {
    id: number;
    name: string;
}

export type LocationCategory = {
    id: number;
    name: string;
    locations: Target[];
}

export const missionLocation: Record<number, LocationCategory> = {
    1: {
        id: 1,
        name: 'commercial',
        locations: [
            { id: 1, name: 'restaurant' },
            { id: 2, name: 'mall' },
            { id: 3, name: 'office' },
            { id: 4, name: 'supermarket' },
            { id: 5, name: 'museum' },
            { id: 6, name: 'casino' },
            { id: 7, name: 'amusement park' },
            { id: 8, name: 'hardware store' },
            { id: 9, name: 'airport' },
            { id: 10, name: 'train station' }
        ]
    },
    2: {
        id: 2,
        name: 'medical',
        locations: [
            { id: 1, name: 'hospital' },
            { id: 2, name: 'research lab' },
            { id: 3, name: 'clinic' },
            { id: 4, name: 'therapist\'s office' },
            { id: 5, name: 'morgue' },
            { id: 6, name: 'dentist\'s office' }
        ]
    },
    3: {
        id: 3,
        name: 'civic',
        locations: [
            { id: 1, name: 'city hall' },
            { id: 2, name: 'courthouse' },
            { id: 3, name: 'senate' },
            { id: 4, name: 'presidential office' },
            { id: 5, name: 'parliament' },
            { id: 6, name: 'embassy' },
            { id: 7, name: 'intelligence headquarters' },
            { id: 8, name: 'clerk\'s office' },
            { id: 9, name: 'prison' },
            { id: 10, name: 'police station' }
        ]
    },
    4: {
        id: 4,
        name: 'residential',
        locations: [
            { id: 1, name: 'suburbs' },
            { id: 2, name: 'frat house' },
            { id: 3, name: 'hotel' },
            { id: 4, name: 'apartment building' },
            { id: 5, name: 'motel' },
            { id: 6, name: 'vacation resort' },
            { id: 7, name: 'gated community' },
            { id: 8, name: 'trailer park' },
            { id: 9, name: 'luxury high-rise' },
            { id: 10, name: 'nursing home' }
        ]
    },
    5: {
        id: 5,
        name: 'industrial',
        locations: [
            { id: 1, name: 'factory' },
            { id: 2, name: 'warehouse' },
            { id: 3, name: 'power plant' },
            { id: 4, name: 'chemical plant' },
            { id: 5, name: 'oil refinery' },
            { id: 6, name: 'landfill' },
            { id: 7, name: 'satellite ground station' },
            { id: 8, name: 'data center' }
        ]
    },
    6: {
        id: 6,
        name: 'military',
        locations: [
            { id: 1, name: 'armory' },
            { id: 2, name: 'military base' },
            { id: 3, name: 'national military command center' },
            { id: 4, name: 'aircraft carrier' },
            { id: 5, name: 'air base' },
            { id: 6, name: 'nuclear submarine' },
            { id: 7, name: 'naval shipyard' },
            { id: 8, name: 'missile silo' },
            { id: 9, name: 'boot camp' },
            { id: 10, name: 'military prison' }
        ]
    }
}

export const missionLocationFeature: Record<number, string> = {
    1: 'under construction',
    2: 'special event',
    3: 'emergency',
    4: 'multi-level',
    5: 'open-air',
    6: 'historic building'
}

export const missionComplication: Record<number, string> = {
    1: 'time pressure',
    2: 'unwanted attention',
    3: 'technical malfunction',
    4: 'high security',
    5: 'identity crisis',
    6: 'trap'
}