import { slimeTitles } from '../data/slimeTitles';
import { slimeAccent, slimeColor, slimePattern, slimeTexture } from '../data/slimeTraits';
import { rollDice } from '../utils/diceroller';
import { generateSlimeName } from '../utils/slimeNameGenerator';
import {
    physicalSkills,
    socialSkills,
    knowledgeSkills,
    type Skill
} from '../data/slimeSkills';
import { forwardRef, useImperativeHandle, useCallback } from 'react';
import { getArticle, capitalize } from '../utils/textUtilities';
import { RerollButton } from '../utils/RerollButton';
import { DICE, GENERATION } from '../constants/gameConfig';
import { CornerDistress } from '../utils/CornerDistress';

interface GenerateSlimeProps {
    traits: {
        name: string;
        color: string;
        pattern: string;
        accent: string;
        texture: string;
        title: { name: string; description: string }
    }
    skills: Skill[];
    weaknesses: Skill[];
    onUpdateTraits: (traits: GenerateSlimeProps['traits']) => void;
    onUpdateSkills: (skills: Skill[]) => void;
    onUpdateWeaknesses: (weaknesses: Skill[]) => void;
}

export interface SlimeHandle {
    regenerateSlime: (traitsToRegenerate?: {
        name?: boolean;
        color?: boolean;
        pattern?: boolean;
        accent?: boolean;
        texture?: boolean;
        title?: boolean;
    }) => void;
}

export const GenerateSlime = forwardRef<SlimeHandle, GenerateSlimeProps>(({
    traits,
    skills,
    weaknesses,
    onUpdateSkills,
    onUpdateWeaknesses,
    onUpdateTraits
}, ref) => {

    const regenerateSlime = (traitsToRegenerate?: {
        name?: boolean;
        color?: boolean;
        pattern?: boolean;
        accent?: boolean;
        texture?: boolean;
        title?: boolean;
    }) => {
        const regenAll = !traitsToRegenerate;

        const newTraits = {
            name: (regenAll || traitsToRegenerate?.name) ? generateSlimeName() : traits.name,
            color: (regenAll || traitsToRegenerate?.color) ? slimeColor[rollDice(DICE.SLIME_TRAIT)] : traits.color,
            pattern: (regenAll || traitsToRegenerate?.pattern) ? slimePattern[rollDice(DICE.SLIME_TRAIT)] : traits.pattern,
            accent: (regenAll || traitsToRegenerate?.accent) ? slimeAccent[rollDice(DICE.SLIME_TRAIT)] : traits.accent,
            texture: (regenAll || traitsToRegenerate?.texture) ? slimeTexture[rollDice(DICE.SLIME_TRAIT)] : traits.texture,
            title: (regenAll || traitsToRegenerate?.title) ? slimeTitles[rollDice(DICE.SLIME_TRAIT)] : traits.title
        };

        onUpdateTraits(newTraits);

        // If title was regenerated, also regenerate skills
        if (regenAll || traitsToRegenerate?.title) {
            regenerateSkills('all', newTraits.title.name);  // ← Pass new title here!
        }
    };


    useImperativeHandle(ref, () => ({
        regenerateSlime
    }));

    /**
     * Randomly selects one of the three skill categories for skill generation
     * @returns One of: physicalSkills, socialSkills, or knowledgeSkills
     */
    const randomCategory = (): Record<number, Skill> => {
        let randomCategory = rollDice(DICE.RANDOM_CATEGORY);
        if (randomCategory === 1) {
            return physicalSkills;
        } else if (randomCategory === 2) {
            return socialSkills;
        } else {
            return knowledgeSkills;
        }
    }

    /**
     * Generates skills and/or weaknesses based on the slime's title
     * @param mode - 'skills': regenerate only skills, 'weaknesses': regenerate only weaknesses, 'all': regenerate both
     * 
     * Each slime title has unique skill generation rules:
     * - Sabotage/Infiltration/Science: 2 from their specialty + 1 random
     * - Surveillance: Always gets "Eye Control" + 2 random
     * - Embryonic: 1 from each category
     * - Prince: No skills (intentionally empty)
     */
    const regenerateSkills = useCallback((mode: 'skills' | 'weaknesses' | 'all',
        titleNameOverride?: string) => {
        const newSkills: Skill[] = [];
        const newWeaknesses: Skill[] = [];
        // Track used skills to prevent duplicates between skills and weaknesses
        const usedSkills: Skill[] = [];

        // When regenerating only skills, preserve existing weaknesses (and vice versa)
        if (mode === 'skills') {
            weaknesses.forEach(s => usedSkills.push(s));
        } else if (mode === 'weaknesses') {
            skills.forEach(s => usedSkills.push(s));
        }

        /**
         * Generates a unique skill from a category, avoiding duplicates
         * Uses collision detection with a max retry limit to prevent infinite loops
         */
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

        /**
         * Helper: Generates 2 skills from a specific category plus 1 random skill
         * Used by specialist slimes (Sabotage, Infiltration, Science)
         */
        const twoFromCategoryPlusRandom = (category: Record<number, Skill>) => {
            newSkills.push(uniqueSkill(category));
            newSkills.push(uniqueSkill(category));
            newSkills.push(uniqueSkill(randomCategory()));
        };

        // Weaknesses are always 3 random skills from any category
        const threeRandomWeaknesses = () => {
            newWeaknesses.push(uniqueSkill(randomCategory()));
            newWeaknesses.push(uniqueSkill(randomCategory()));
            newWeaknesses.push(uniqueSkill(randomCategory()));
        }

        if (mode === 'skills' || mode === 'all') {
            // Generate skills based on slime title's specialization
            const titleName = titleNameOverride || traits.title.name;

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
                    // Always gets 'Eye Control' as their signature skill
                    newSkills.push(physicalSkills[GENERATION.SURVEILLANCE_SLIME_FIXED_SKILL_INDEX]);
                    usedSkills.push(physicalSkills[GENERATION.SURVEILLANCE_SLIME_FIXED_SKILL_INDEX]);
                    newSkills.push(uniqueSkill(randomCategory()));
                    newSkills.push(uniqueSkill(randomCategory()));
                    break;
                case 'Embryonic Slime':
                    // One skill from each category
                    newSkills.push(uniqueSkill(physicalSkills));
                    newSkills.push(uniqueSkill(socialSkills));
                    newSkills.push(uniqueSkill(knowledgeSkills));
                    break;
                case 'Prince Slime':
                    // Intentionally gains no skills
                    break;
            }
        }

        if (mode === 'weaknesses' || mode === 'all') {
            threeRandomWeaknesses();
        }

        // Update state based on what was regenerated
        if (mode === 'all') {
            onUpdateSkills(newSkills);
            onUpdateWeaknesses(newWeaknesses);
        } else if (mode === 'skills') {
            onUpdateSkills(newSkills);
        } else if (mode === 'weaknesses') {
            onUpdateWeaknesses(newWeaknesses);
        }
    }, [skills, weaknesses, traits.title.name]);



    return (
        <>
            <section className='card left-col'>
                <div className='card-content'>
                    <CornerDistress topLeft />
                    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <div className='slime-header'>
                            <h2 className='slime-name'>
                                <strong>{traits.name.toUpperCase()}</strong>
                            </h2><RerollButton onClick={() => onUpdateTraits({ ...traits, name: generateSlimeName() })} style={{ fontSize: '1.5rem' }} />
                        </div>
                        <div className='slime-header title'>
                            <RerollButton
                                onClick={() => regenerateSlime({ title: true })}
                                style={{ fontSize: '1.5rem' }}
                            />
                            <h2 className='slime-title'>
                                the {traits.title.name.toUpperCase()}
                            </h2>
                        </div>
                    </div>
                    <div className='description'>
                        <p>{traits.title.description}</p>
                    </div>

                    <div className='card-header-group' style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                        <div style={{ width: '1.2rem' }} />
                        <h2 style={{ color: '#bed62a' }}>Appearance </h2>
                        <RerollButton onClick={() => regenerateSlime({ color: true, pattern: true, accent: true, texture: true })} style={{ fontSize: '1.2rem' }} />
                    </div>
                    <div className='description'>
                        <p>{capitalize(getArticle(traits.color[0]))}{' '}
                            <span className='no-wrap'>
                                <strong className='highlight'>{traits.color}</strong>
                                <RerollButton onClick={() => onUpdateTraits({ ...traits, color: slimeColor[rollDice(DICE.SLIME_TRAIT)] })} />
                            </span>
                            {' '}slime, patterned with{' '}
                            <span className='no-wrap'>
                                <strong className='highlight'>{traits.accent}</strong>
                                <RerollButton onClick={() => onUpdateTraits({ ...traits, accent: slimeAccent[rollDice(DICE.SLIME_TRAIT)] })} />
                            </span>
                            ,{' '}
                            <span className='no-wrap'>
                                <strong className='highlight'>{traits.pattern}</strong>
                                <RerollButton onClick={() => onUpdateTraits({ ...traits, pattern: slimePattern[rollDice(DICE.SLIME_TRAIT)] })} />
                            </span>
                            {' '}accents, with {getArticle(traits.texture[0])}{' '}
                            <span className='no-wrap'>
                                <strong className='highlight'>{traits.texture}</strong>
                                <RerollButton onClick={() => onUpdateTraits({ ...traits, texture: slimeTexture[rollDice(DICE.SLIME_TRAIT)] })} />
                            </span>
                            {' '}surface.</p>
                    </div>
                </div>
            </section>
            <section className='card right-col'>
                <div className='card-content'>
                    <CornerDistress topRight />
                    <div className='card-header-group'>
                        <div style={{ width: '1.2rem' }} />
                        <h2 className='card-header'>Skills </h2>
                        <RerollButton onClick={() => regenerateSkills('skills')} style={{ fontSize: '1.2rem' }} />
                    </div>
                    {skills.length === 0 ? <div className='item'><strong>None</strong></div> : skills.map((s, index) => (
                        <div key={s.name}>
                            <div className='item'><strong>{s.name}</strong></div>
                            {index < skills.length - 1 && (
                                <div className="dot-border" />
                            )}
                        </div>
                    ))}
                    <div className='card-header-group'>
                        <div style={{ width: '1.2rem' }} />
                        <h2 className='card-header'>Weaknesses </h2>
                        <RerollButton onClick={() => regenerateSkills('weaknesses')} style={{ fontSize: '1.2rem' }} />
                    </div>
                    {weaknesses.map((s, index) => (
                        <div key={s.name}>
                            <div className='item'><strong>{s.name}</strong></div>
                            {index < weaknesses.length - 1 && (
                                <div className="dot-border" />
                            )}
                        </div>
                    ))}
                </div>
            </section >
        </>
    )
});