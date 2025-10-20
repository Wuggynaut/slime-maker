export const hostHair: Record<number, string> = {
    1: 'greasy',
    2: 'thinning',
    3: 'immaculate',
    4: 'long',
    5: 'short',
    6: 'messy',
    7: 'patchy',
    8: 'slicked back',
    9: 'graying',
    10: 'frosted'
}

export const hostHairColor: Record<number, string> = {
    1: 'dark brown',
    2: 'chestnut',
    3: 'dirty blond',
    4: 'auburn',
    5: 'bleached',
    6: 'dyed blue',
    7: 'jet-black',
    8: 'platinum blond',
    9: 'sandy',
    10: 'red'
}

export const hostPhysique: Record<number, string> = {
    1: 'broad',
    2: 'gaunt',
    3: 'muscular',
    4: 'heavyset',
    5: 'lanky',
    6: 'small',
    7: 'average sized',
    8: 'large',
    9: 'huge',
    10: 'tiny'
}

export const hostFace: Record<number, string> = {
    1: 'soft',
    2: 'angular',
    3: 'round',
    4: 'freckled',
    5: 'plain',
    6: 'youthful',
    7: 'smooth',
    8: 'worn',
    9: 'pale',
    10: 'weathered'
}

export const hostEyes: Record<number, string> = {
    1: 'bright',
    2: 'dark',
    3: 'piercing',
    4: 'deep-set',
    5: 'narrow',
    6: 'wide',
    7: 'sharp',
    8: 'small',
    9: 'large',
    10: 'squinting'
}

export const hostMouth: Record<number, string> = {
    1: 'wide',
    2: 'thin',
    3: 'full',
    4: 'narrow',
    5: 'crooked',
    6: 'pursed',
    7: 'dry',
    8: 'frowning',
    9: 'small',
    10: 'toothy'
}

export const hostNose: Record<number, string> = {
    1: 'long',
    2: 'crooked',
    3: 'broad',
    4: 'pointed',
    5: 'button',
    6: 'hooked',
    7: 'flat',
    8: 'sharp',
    9: 'broken',
    10: 'red'
}

export interface HostTraits {
    physique: string;
    hair: string;
    hairColor: string;
    face: string;
    eyes: string;
    mouth: string;
    nose: string;
    selectedFacePart: 1 | 2 | 3;
}