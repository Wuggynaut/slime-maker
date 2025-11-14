// stores/generatorStore.ts
import { create } from 'zustand';
import { generateSlimeName } from '../utils/slimeNameGenerator';
import { slimeAccent, slimeColor, slimePattern, slimeTexture } from '../data/slimeTraits';
import { slimeTitles } from '../data/slimeTitles';
import { rollDice } from '../utils/diceroller';
import { DICE, GENERATION } from '../constants/gameConfig';
import type { Skill } from '../data/slimeSkills';
import {
    physicalSkills,
    socialSkills,
    knowledgeSkills
} from '../data/slimeSkills';
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
}

// Helper: Generate initial slime traits
const generateInitialSlimeTraits = (): SlimeTraits => ({
    name: generateSlimeName(),
    color: slimeColor[rollDice(DICE.SLIME_TRAIT)],
    pattern: slimePattern[rollDice(DICE.SLIME_TRAIT)],
    accent: slimeAccent[rollDice(DICE.SLIME_TRAIT)],
    texture: slimeTexture[rollDice(DICE.SLIME_TRAIT)],
    title: slimeTitles[rollDice(DICE.SLIME_TRAIT)]
});

// Helper: Generate initial host traits
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

// Helper: Generate skills and weaknesses based on title
// This is the same logic from GenerateSlime.regenerateSkills()
const generateSkillsAndWeaknesses = (titleName: string): { skills: Skill[], weaknesses: Skill[] } => {
    const skills: Skill[] = [];
    const weaknesses: Skill[] = [];
    const usedSkills: Skill[] = [];

    // Randomly selects one of the three skill categories
    const randomCategory = (): Record<number, Skill> => {
        const randomCat = rollDice(DICE.RANDOM_CATEGORY);
        if (randomCat === 1) return physicalSkills;
        if (randomCat === 2) return socialSkills;
        return knowledgeSkills;
    };

    // Generates a unique skill, avoiding duplicates
    const uniqueSkill = (category: Record<number, Skill>): Skill => {
        let skill: Skill;
        let attempts = 0;
        do {
            skill = category[rollDice(DICE.SLIME_TRAIT)];
            attempts++;
        } while (usedSkills.includes(skill) && attempts < GENERATION.MAX_UNIQUE_SKILL_ATTEMPTS);
        usedSkills.push(skill);
        return skill;
    };

    // Helper: 2 from specific category + 1 random
    const twoFromCategoryPlusRandom = (category: Record<number, Skill>) => {
        skills.push(uniqueSkill(category));
        skills.push(uniqueSkill(category));
        skills.push(uniqueSkill(randomCategory()));
    };

    // Generate skills based on title
    switch (titleName) {
        case 'Sabotage Slime':
            twoFromCategoryPlusRandom(physicalSkills);
            break;
        case 'Infiltration Slime':
            twoFromCategoryPlusRandom(socialSkills);
            break;
        case 'Science Slime':
            twoFromCategoryPlusRandom(knowledgeSkills);
            break;
        case 'Surveillance Slime':
            skills.push(physicalSkills[GENERATION.SURVEILLANCE_SLIME_FIXED_SKILL_INDEX]);
            usedSkills.push(physicalSkills[GENERATION.SURVEILLANCE_SLIME_FIXED_SKILL_INDEX]);
            skills.push(uniqueSkill(randomCategory()));
            skills.push(uniqueSkill(randomCategory()));
            break;
        case 'Embryonic Slime':
            skills.push(uniqueSkill(physicalSkills));
            skills.push(uniqueSkill(socialSkills));
            skills.push(uniqueSkill(knowledgeSkills));
            break;
        case 'Prince Slime':
            // Intentionally no skills
            break;
    }

    // Generate 3 random weaknesses
    weaknesses.push(uniqueSkill(randomCategory()));
    weaknesses.push(uniqueSkill(randomCategory()));
    weaknesses.push(uniqueSkill(randomCategory()));

    return { skills, weaknesses };
};

export const useGeneratorStore = create<GeneratorState>((set) => {
    // Generate initial traits first
    const initialTraits = generateInitialSlimeTraits();

    // Generate skills/weaknesses based on the initial title
    const { skills, weaknesses } = generateSkillsAndWeaknesses(initialTraits.title.name);

    return {
        // Initial state
        slimeTraits: initialTraits,
        slimeSkills: skills,
        slimeWeaknesses: weaknesses,
        hostBody: hostBodies[rollDice(DICE.HOST_BODY)],
        hostTraits: generateInitialHostTraits(),

        // Actions
        setSlimeTraits: (traits) => set({ slimeTraits: traits }),
        setSlimeSkills: (skills) => set({ slimeSkills: skills }),
        setSlimeWeaknesses: (weaknesses) => set({ slimeWeaknesses: weaknesses }),
        setHostBody: (body) => set({ hostBody: body }),
        setHostTraits: (traits) => set({ hostTraits: traits })
    };
});