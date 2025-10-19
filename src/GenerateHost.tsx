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
import { RerollButton } from './utils/RerollButton';
import { getArticle, capitalize } from './utils/textUtilities';
import { DICE } from './constants/gameConfig';
import cornerdistress3 from './assets/corner_effects/Cornerdistress3.png'
import cornerdistress4 from './assets/corner_effects/Cornerdistress4.png'

export interface HostHandle {
    generateBody: () => void;
}

export const GenerateHost = forwardRef<HostHandle, {}>((_props, ref) => {
    const [body, setBody] = useState<HostBody>(hostBodies[rollDice(DICE.HOST_BODY)]);
    const [traits, setTraits] = useState(() => ({
        physique: hostPhysique[rollDice(DICE.HOST_TRAIT)],
        hair: hostHair[rollDice(DICE.HOST_TRAIT)],
        hairColor: hostHairColor[rollDice(DICE.HOST_TRAIT)],
        face: hostFace[rollDice(DICE.HOST_TRAIT)],
        eyes: hostEyes[rollDice(DICE.HOST_TRAIT)],
        mouth: hostMouth[rollDice(DICE.HOST_TRAIT)],
        nose: hostNose[rollDice(DICE.HOST_TRAIT)]
    }));

    /**
    * Generates a descriptive sentence about the host's appearance
    * Randomly chooses one facial feature (eyes, mouth, or nose) to highlight
    * @param currentTraits - The trait set to generate description from (defaults to current state)
    **/
    const generateDescription = (currentTraits = traits): string => {
        const facePart = rollDice('1d3');
        let faceDescription = '';

        // Randomly highlight one of three facial features
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
        setBody(hostBodies[rollDice(DICE.HOST_BODY)]);
        const newTraits = {
            physique: hostPhysique[rollDice(DICE.HOST_TRAIT)],
            hair: hostHair[rollDice(DICE.HOST_TRAIT)],
            hairColor: hostHairColor[rollDice(DICE.HOST_TRAIT)],
            face: hostFace[rollDice(DICE.HOST_TRAIT)],
            eyes: hostEyes[rollDice(DICE.HOST_TRAIT)],
            mouth: hostMouth[rollDice(DICE.HOST_TRAIT)],
            nose: hostNose[rollDice(DICE.HOST_TRAIT)]
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

                <div className='card-content'>
                    <img
                        src={cornerdistress3}
                        alt=""
                        aria-hidden="true"
                        className="corner bottom-left"
                    />
                    <h2 className='card-header'>Host body</h2>
                    <div className='description'>
                        <p>Your host body is {getArticle(body.occupation)} <strong className='highlight'>{body.occupation}</strong> <RerollButton onClick={() => setBody(hostBodies[rollDice(DICE.HOST_BODY)])} />.</p>
                        <p>{description}</p>
                    </div>
                </div>
            </section>
            <section className='card right-col'>
                <div className='card-content'>
                    <img
                        src={cornerdistress4}
                        alt=""
                        aria-hidden="true"
                        className="corner bottom-right"
                    />
                    <h2 className='card-header'>Belongings</h2>
                    {body.belongings.map((s, index) => (
                        <div key={s}>
                            <div className='item'><strong>{capitalize(s)}</strong></div>
                            {index < body.belongings.length - 1 && (
                                <div className="dot-border" />
                            )}
                        </div>
                    )
                    )}
                </div>
            </section>
        </>
    );
});