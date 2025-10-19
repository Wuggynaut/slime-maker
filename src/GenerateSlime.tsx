import { slimeTitles } from './data/slimeTitles';
import { slimeAccent, slimeColor, slimePattern, slimeTexture } from './data/slimeTraits';
import { rollD6, rollDice } from './utils/diceRoller';
import { generateSlimeName } from './utils/slimeNameGenerator';
import {
    physicalSkills,
    socialSkills,
    knowledgeSkills,
    type Skill
} from './data/slimeSkills';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { getArticle, capitalize } from './utils/textUtilities';
import { RerollButton } from './utils/RerollButton';

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

export const GenerateSlime = forwardRef<SlimeHandle>((_props, ref) => {
    const [traits, setTraits] = useState(() => ({
        name: generateSlimeName(),
        color: slimeColor[rollD6()],
        pattern: slimePattern[rollD6()],
        accent: slimeAccent[rollD6()],
        texture: slimeTexture[rollD6()],
        title: slimeTitles[rollD6()]
    }));

    const [skills, setSkills] = useState<Skill[]>([]);
    const [weaknesses, setWeaknesses] = useState<Skill[]>([]);

    const regenerateSlime = (traitsToRegenerate?: {
        name?: boolean;
        color?: boolean;
        pattern?: boolean;
        accent?: boolean;
        texture?: boolean;
        title?: boolean;
    }) => {
        const regenAll = !traitsToRegenerate;

        setTraits(prevTraits => ({
            name: (regenAll || traitsToRegenerate?.name) ? generateSlimeName() : prevTraits.name,
            color: (regenAll || traitsToRegenerate?.color) ? slimeColor[rollD6()] : prevTraits.color,
            pattern: (regenAll || traitsToRegenerate?.pattern) ? slimePattern[rollD6()] : prevTraits.pattern,
            accent: (regenAll || traitsToRegenerate?.accent) ? slimeAccent[rollD6()] : prevTraits.accent,
            texture: (regenAll || traitsToRegenerate?.texture) ? slimeTexture[rollD6()] : prevTraits.texture,
            title: (regenAll || traitsToRegenerate?.title) ? slimeTitles[rollD6()] : prevTraits.title
        }));
    };

    useImperativeHandle(ref, () => ({
        regenerateSlime
    }));

    const randomCategory = (): Record<number, Skill> => {
        let randomCategory = rollDice('1d3');
        if (randomCategory === 1) {
            return physicalSkills;
        } else if (randomCategory === 2) {
            return socialSkills;
        } else {
            return knowledgeSkills;
        }
    }

    const regenerateSkills = (mode: 'skills' | 'weaknesses' | 'all') => {
        const newSkills: Skill[] = [];
        const newWeaknesses: Skill[] = [];
        const usedSkills: Skill[] = [];

        if (mode === 'skills') {
            weaknesses.forEach(s => usedSkills.push(s));
        } else if (mode === 'weaknesses') {
            skills.forEach(s => usedSkills.push(s));
        }

        const uniqueSkill = (category: Record<number, Skill>): Skill => {
            let skill: Skill;
            let attempts = 0;
            do {
                skill = category[rollD6()];
                attempts++;
            } while (usedSkills.includes(skill) && attempts < 50);
            usedSkills.push(skill);
            return skill;
        };

        const twoFromCategoryPlusRandom = (category: Record<number, Skill>) => {
            newSkills.push(uniqueSkill(category));
            newSkills.push(uniqueSkill(category));
            newSkills.push(uniqueSkill(randomCategory()));
        };

        const threeRandomWeaknesses = () => {
            newWeaknesses.push(uniqueSkill(randomCategory()));
            newWeaknesses.push(uniqueSkill(randomCategory()));
            newWeaknesses.push(uniqueSkill(randomCategory()));
        }

        if (mode === 'skills' || mode === 'all') {
            switch (traits.title.name) {
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
                    newSkills.push(physicalSkills[4]);
                    usedSkills.push(physicalSkills[4]);
                    newSkills.push(uniqueSkill(randomCategory()));
                    newSkills.push(uniqueSkill(randomCategory()));
                    break;
                case 'Embryonic Slime':
                    newSkills.push(uniqueSkill(physicalSkills));
                    newSkills.push(uniqueSkill(socialSkills));
                    newSkills.push(uniqueSkill(knowledgeSkills));
                    break;
                case 'Prince Slime':
                    break;
            }
        }

        if (mode === 'weaknesses' || mode === 'all') {
            threeRandomWeaknesses();
        }

        if (mode === 'all') {
            setSkills(newSkills);
            setWeaknesses(newWeaknesses);
        } else if (mode === 'skills') {
            setSkills(newSkills);
        } else if (mode === 'weaknesses') {
            setWeaknesses(newWeaknesses);
        }
    }

    useEffect(() => {
        regenerateSkills('all');
    }, [traits.title.name]);

    return (
        <>
            <section className='card left-col'>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <h2 className='slime-name'>
                        <strong>{traits.name.toUpperCase()}</strong>
                    </h2><RerollButton onClick={() => setTraits({ ...traits, name: generateSlimeName() })} style={{ fontSize: '1.5rem' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', alignItems: 'flex-start', marginTop: '-1rem' }}>
                    <RerollButton onClick={() => setTraits({ ...traits, title: slimeTitles[rollD6()] })} style={{ fontSize: '1.5rem' }} />
                    <h2 className='slime-title'>
                        the {traits.title.name.toUpperCase()}
                    </h2>
                </div>
                <div className='description'>
                    <p>{traits.title.description}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '0.5rem', marginTop: '0.5rem' }}>
                    <div style={{ width: '1.2rem' }} />
                    <h2 style={{ color: '#bed62a' }}>Appearance </h2>
                    <RerollButton onClick={() => regenerateSlime({ color: true, pattern: true, accent: true, texture: true })} style={{ fontSize: '1.2rem' }} />
                </div>
                <div className='description'>
                    <p>{capitalize(getArticle(traits.color[0]))}{' '}
                        <span className='no-wrap'>
                            <strong className='highlight'>{traits.color}</strong>
                            <RerollButton onClick={() => setTraits({ ...traits, color: slimeColor[rollD6()] })} />
                        </span>
                        {' '}slime, patterned with{' '}
                        <span className='no-wrap'>
                            <strong className='highlight'>{traits.accent}</strong>
                            <RerollButton onClick={() => setTraits({ ...traits, accent: slimeAccent[rollD6()] })} />
                        </span>
                        ,{' '}
                        <span className='no-wrap'>
                            <strong className='highlight'>{traits.pattern}</strong>
                            <RerollButton onClick={() => setTraits({ ...traits, pattern: slimePattern[rollD6()] })} />
                        </span>
                        {' '}accents, with {getArticle(traits.texture[0])}{' '}
                        <span className='no-wrap'>
                            <strong className='highlight'>{traits.texture}</strong>
                            <RerollButton onClick={() => setTraits({ ...traits, texture: slimeTexture[rollD6()] })} />
                        </span>
                        {' '}surface.</p>
                </div>
            </section>
            <section className='card right-col'>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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

            </section >
        </>
    )
});