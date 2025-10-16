import { useState, forwardRef, useImperativeHandle } from 'react';
import { rollDice } from './utils/diceRoller';
import { type HostBody, hostBodies } from './data/hostBodies';
import { getArticle, capitalize } from './utils/textUtilities';

export interface HostHandle {
    generateBody: () => void;
}

export const GenerateHost = forwardRef<HostHandle>((_props, ref) => {
    const [body, setBody] = useState<HostBody>(hostBodies[rollDice('1d36')]);

    const generateBody = () => {
        setBody(hostBodies[rollDice('1d36')]);
    }

    useImperativeHandle(ref, () => ({
        generateBody
    }));

    return (
        <>
            <section className='card left-col'>
                <h2>Host body</h2>
                <p>Your host body is {getArticle(body.occupation)} <strong>{body.occupation}</strong>.</p>
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