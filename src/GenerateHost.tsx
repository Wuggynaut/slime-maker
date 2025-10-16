import { useState } from 'react';
import { rollDice } from './utils/diceRoller';
import { type HostBody, hostBodies } from './data/hostBodies';
import { GetArticle } from './utils/GetArticle';
import { RerollButton } from './utils/RerollButton';


export function GenerateHost() {
    const [body, setBody] = useState<HostBody>(hostBodies[rollDice('1d36')]);

    const generateBody = () => {
        setBody(hostBodies[rollDice('1d36')]);
    }

    const capitalize = (word: string): string => {
        if (!word) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <>
            <h3>Host body  <RerollButton onClick={generateBody} /></h3>
            <p>Your host body is {GetArticle(body.occupation)} <strong>{body.occupation}</strong>.</p>
            <h3>Belongings</h3>
            <ul>
                {body.belongings.map((s, index) => <li key={index}>{capitalize(s)}</li>)}
            </ul>
        </>
    );
}