import { create } from 'zustand';
import { generateSlimeName } from '../utils/slimeNameGenerator';
import { slimeAccent, slimeColor, slimePattern, slimeTexture } from '../data/slimeTraits';
import { slimeTitles } from '../data/slimeTitles';
import { rollDice } from '../utils/diceroller';
import { DICE } from '../constants/gameConfig';
import type { Skill } from '../data/slimeSkills';
import { hostBodies, type HostBody } from '../data/hostBodies';
import {
    hostEyes,
    hostFace,
    hostHair,
    hostHairColor,
    hostMouth,
    hostNose,
    hostPhysique,
    type HostTraits
} from '../data/hostTraits';

interface SlimeTraits {
    name: string;
    color: string;
    pattern: string;
    accent: string;
    texture: string;
    title: { name: string; description: string };
}

interface GeneratorState {
    // State
    slimeTraits: SlimeTraits;
    slimeSkills: Skill[];
    slimeWeaknesses: Skill[];
    hostBody: HostBody;
    hostTraits: HostTraits;

    // Actions
    setSlimeTraits: (traits: SlimeTraits) => void;
    setSlimeSkills: (skills: Skill[]) => void;
    setSlimeWeaknesses: (weaknesses: Skill[]) => void;
    setHostBody: (body: HostBody) => void;
    setHostTraits: (traits: HostTraits) => void;
    regenerateSlimeTraits: () => void;
    regenerateHostBody: () => void;
    regenerateHostTraits: () => void;
}

const generateInitialSlimeTraits = (): SlimeTraits => ({
    name: generateSlimeName(),
    color: slimeColor[rollDice(DICE.SLIME_TRAIT)],
    pattern: slimePattern[rollDice(DICE.SLIME_TRAIT)],
    accent: slimeAccent[rollDice(DICE.SLIME_TRAIT)],
    texture: slimeTexture[rollDice(DICE.SLIME_TRAIT)],
    title: slimeTitles[rollDice(DICE.SLIME_TRAIT)]
});

const generateInitialHostTraits = (): HostTraits => ({
    physique: hostPhysique[rollDice(DICE.HOST_TRAIT)],
    hair: hostHair[rollDice(DICE.HOST_TRAIT)],
    hairColor: hostHairColor[rollDice(DICE.HOST_TRAIT)],
    face: hostFace[rollDice(DICE.HOST_TRAIT)],
    eyes: hostEyes[rollDice(DICE.HOST_TRAIT)],
    mouth: hostMouth[rollDice(DICE.HOST_TRAIT)],
    nose: hostNose[rollDice(DICE.HOST_TRAIT)],
    selectedFacePart: rollDice(DICE.FACE_FEATURE) as 1 | 2 | 3
});

export const useGeneratorStore = create<GeneratorState>((set) => ({
    // Initial state
    slimeTraits: generateInitialSlimeTraits(),
    slimeSkills: [],
    slimeWeaknesses: [],
    hostBody: hostBodies[rollDice(DICE.HOST_BODY)],
    hostTraits: generateInitialHostTraits(),

    // Actions
    setSlimeTraits: (traits) => set({ slimeTraits: traits }),
    setSlimeSkills: (skills) => set({ slimeSkills: skills }),
    setSlimeWeaknesses: (weaknesses) => set({ slimeWeaknesses: weaknesses }),
    setHostBody: (body) => set({ hostBody: body }),
    setHostTraits: (traits) => set({ hostTraits: traits }),

    regenerateSlimeTraits: () => set({ slimeTraits: generateInitialSlimeTraits() }),
    regenerateHostBody: () => set({ hostBody: hostBodies[rollDice(DICE.HOST_BODY)] }),
    regenerateHostTraits: () => set({ hostTraits: generateInitialHostTraits() })
}));