import { useState, forwardRef, useImperativeHandle } from 'react';
import { rollDice } from './utils/diceRoller';
import { type HostBody, hostBodies } from './data/hostBodies';
import {
    hostHair,
    hostHairColor,
    hostPhysique,
    hostFace,
    hostEyes,
    hostMouth,
    hostNose
} from './data/hostTraits'
import { getArticle, capitalize } from './utils/textUtilities';

export interface HostHandle {
    generateBody: () => void;
}

export const GenerateHost = forwardRef<HostHandle, {}>((_props, ref) => {
    const [body, setBody] = useState<HostBody>(hostBodies[rollDice('1d36')]);
    const [traits, setTraits] = useState(() => ({
        physique: hostPhysique[rollDice('1d10')],
        hair: hostHair[rollDice('1d10')],
        hairColor: hostHairColor[rollDice('1d10')],
        face: hostFace[rollDice('1d10')],
        eyes: hostEyes[rollDice('1d10')],
        mouth: hostMouth[rollDice('1d10')],
        nose: hostNose[rollDice('1d10')]
    }));

    const generateDescription = (currentTraits = traits): string => {
        const facePart = rollDice('1d3');
        let faceDescription = '';

        if (facePart === 1) {
            faceDescription = currentTraits.eyes + ' eyes.'
        } else if (facePart === 2) {
            faceDescription = getArticle(currentTraits.mouth) + ' ' + currentTraits.mouth + ' mouth.'
        } else {
            faceDescription = getArticle(currentTraits.nose) + ' ' + currentTraits.nose + ' nose.'
        }

        return 'Your host is ' + getArticle(currentTraits.physique) + ' ' + currentTraits.physique
            + ' human. They have ' + currentTraits.hair + ' ' + currentTraits.hairColor
            + ' hair and ' + getArticle(currentTraits.face) + ' ' + currentTraits.face + ' face with '
            + faceDescription;
    }

    const [description, setDescription] = useState(() => generateDescription());

    const generateBody = () => {
        setBody(hostBodies[rollDice('1d36')]);
        const newTraits = {
            physique: hostPhysique[rollDice('1d10')],
            hair: hostHair[rollDice('1d10')],
            hairColor: hostHairColor[rollDice('1d10')],
            face: hostFace[rollDice('1d10')],
            eyes: hostEyes[rollDice('1d10')],
            mouth: hostMouth[rollDice('1d10')],
            nose: hostNose[rollDice('1d10')]
        };

        setTraits(newTraits)
        setDescription(generateDescription(newTraits));
    }

    useImperativeHandle(ref, () => ({
        generateBody
    }));

    return (
        <>
            <section className='card left-col'>
                <h2>Host body</h2>
                <p>Your host body is {getArticle(body.occupation)} <strong>{body.occupation}</strong>.</p>
                <p>{description}</p>
            </section>
            <section className='card right-col'>
                <h2>Belongings</h2>
                <ul>
                    {body.belongings.map((s, index) => <li key={index}>{capitalize(s)}</li>)}
                </ul>
            </section>
        </>
    );
});