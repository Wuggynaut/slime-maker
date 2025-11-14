import { forwardRef, useImperativeHandle } from 'react';
import { rollDice } from '../utils/diceroller';
import { type HostBody, hostBodies } from '../data/hostBodies';
import {
    hostHair,
    hostHairColor,
    hostPhysique,
    hostFace,
    hostEyes,
    hostMouth,
    hostNose,
    type HostTraits
} from '../data/hostTraits'
import { RerollButton } from '../utils/RerollButton';
import { getArticle, capitalize } from '../utils/textUtilities';
import { DICE } from '../constants/gameConfig';
import { generateHostDescription } from '../utils/hostDescription';
import { CornerDistress } from '../utils/CornerDistress';

interface GenerateHostProps {
    body: HostBody;
    traits: HostTraits;
    onUpdateBody: (body: HostBody) => void;
    onUpdateTraits: (traits: HostTraits) => void;
}

export interface HostHandle {
    generateBody: () => void;
}

export const GenerateHost = forwardRef<HostHandle, GenerateHostProps>(({ body, traits, onUpdateBody, onUpdateTraits }, ref) => {

    const description = generateHostDescription(traits);

    const generateBody = () => {
        onUpdateBody(hostBodies[rollDice(DICE.HOST_BODY)]);
        const newTraits = {
            physique: hostPhysique[rollDice(DICE.HOST_TRAIT)],
            hair: hostHair[rollDice(DICE.HOST_TRAIT)],
            hairColor: hostHairColor[rollDice(DICE.HOST_TRAIT)],
            face: hostFace[rollDice(DICE.HOST_TRAIT)],
            eyes: hostEyes[rollDice(DICE.HOST_TRAIT)],
            mouth: hostMouth[rollDice(DICE.HOST_TRAIT)],
            nose: hostNose[rollDice(DICE.HOST_TRAIT)],
            selectedFacePart: rollDice(DICE.FACE_FEATURE) as 1 | 2 | 3
        };

        onUpdateTraits(newTraits)
    }

    useImperativeHandle(ref, () => ({
        generateBody
    }));

    return (
        <>
            <section className='card left-col'>

                <div className='card-content'>
                    <CornerDistress bottomLeft />
                    <h2 className='card-header'>Host body</h2>
                    <div className='description'>
                        <p>Your host body is {getArticle(body.occupation)} <strong className='highlight'>{body.occupation}</strong> <RerollButton onClick={() => onUpdateBody(hostBodies[rollDice(DICE.HOST_BODY)])} />.</p>
                        <p>{description}</p>
                    </div>
                </div>
            </section>
            <section className='card right-col'>
                <div className='card-content'>
                    <CornerDistress bottomRight />
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