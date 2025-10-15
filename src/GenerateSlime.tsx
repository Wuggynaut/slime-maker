import { slimeTitles } from './data/slimeTitles';
import { slimeAccent, slimeColor, slimePattern, slimeTexture } from './data/slimeTraits'
import { rollD6, rollDice } from './utils/diceRoller'
import { generateSlimeName } from './utils/slimeNameGenerator'

import {
    physicalSkills,
    socialSkills,
    knowledgeSkills,
    type Skill
} from './data/slimeSkills'
import { useEffect, useState } from 'react';

export function GenerateSlime() {

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

    const regenerate = () => {
        setTraits({
            name: generateSlimeName(),
            color: slimeColor[rollD6()],
            pattern: slimePattern[rollD6()],
            accent: slimeAccent[rollD6()],
            texture: slimeTexture[rollD6()],
            title: slimeTitles[rollD6()]
        });
    }

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

    useEffect(() => {

        const newSkills: Skill[] = [];
        const newWeaknesses: Skill[] = [];
        const usedSkills: Skill[] = [];

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

        switch (traits.title.name) {
            case 'Sabotage Slime':
                twoFromCategoryPlusRandom(physicalSkills);
                threeRandomWeaknesses();
                break;
            case 'Infiltration Slime':
                twoFromCategoryPlusRandom(socialSkills);
                threeRandomWeaknesses();
                break;
            case 'Science Slime':
                twoFromCategoryPlusRandom(knowledgeSkills);
                threeRandomWeaknesses();
                break;
            case 'Surveillance Slime':
                newSkills.push(physicalSkills[4]);
                usedSkills.push(physicalSkills[4]);
                newSkills.push(uniqueSkill(randomCategory()));
                newSkills.push(uniqueSkill(randomCategory()));
                threeRandomWeaknesses();
                break;
            case 'Embryonic Slime':
                newSkills.push(uniqueSkill(physicalSkills));
                newSkills.push(uniqueSkill(socialSkills));
                newSkills.push(uniqueSkill(knowledgeSkills));
                threeRandomWeaknesses();
                break;
            case 'Prince Slime':
                threeRandomWeaknesses();
                break;
        }


        setSkills(newSkills);
        setWeaknesses(newWeaknesses);
    }, [traits.title.name]);

    const getArticle = (word: string) =>
        ['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase()) ? 'an' : 'a';

    return (
        <>
            <h3>You are</h3>
            <h2><strong>{traits.name}</strong>,<br />the {traits.title.name}</h2>
            <p>{traits.title.description}</p>
            <h3>Description</h3>
            <p>You are {getArticle(traits.color[0])} <strong>{traits.color}</strong> slime, patterned with <strong>{traits.accent}</strong>, <strong>{traits.pattern}</strong> accents, with {getArticle(traits.texture[0])} <strong>{traits.texture}</strong> surface</p>
            <h3>You are skilled at</h3>

            {skills.length === 0 ? <p>Nothing</p> : <ul>{skills.map((s, index) => <li key={index}>{s.name}</li>)}</ul>}

            <h3>You are weak at</h3>

            <ul>
                {weaknesses.map((s, index) => <li key={index}>{s.name}</li>)}
            </ul>

            <button onClick={() => regenerate()}>New Slime</button>
        </>
    )
}