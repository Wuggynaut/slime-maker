import { useState } from "react"
import { rollDice, parseDieFormula, type DieGroup } from "./utils/diceroller"

export function Diceroller() {
    const [dieResult, setDieResult] = useState('');
    const [dieFormula, setDieFormula] = useState('');

    const addDie = (die: number) => {
        if (!dieFormula) {
            setDieFormula(String('1d' + die));
            return;
        }

        const groups = parseDieFormula(dieFormula);
        const toAdd: DieGroup = {
            count: 1,
            sides: die
        }

        const groupsIndex = groups.findIndex(d => d.sides === toAdd.sides);

        if (groupsIndex >= 0) {
            groups[groupsIndex].count += toAdd.count;
        } else {
            groups.push(toAdd);
        }

        setDieFormula(groups.map(d => `${d.count}d${d.sides}`).join(' + '));
    }

    return (
        <>
            <h2>Dice Roller</h2>
            <p>Dice:</p>
            <div className="result-display"
                style={{
                    border: '2px solid #ccc',
                    borderRadius: '8px',
                    padding: '15px',
                    minHeight: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px'
                }}>
                <strong style={{ fontSize: '24px' }}>
                    {dieFormula || '—'}
                </strong>
            </div>
            <p>Result:</p>
            <div style={{
                border: '2px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                minHeight: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px'
            }}>
                <strong style={{ fontSize: '32px' }}>
                    {dieResult || '—'}
                </strong>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => addDie(4)}>D4</button>
                <button onClick={() => addDie(6)}>D6</button>
                <button onClick={() => addDie(8)}>D8</button>
                <button onClick={() => addDie(10)}>D10</button>
                <button onClick={() => addDie(12)}>D12</button>
                <button onClick={() => addDie(20)}>D20</button>
                <button onClick={() => addDie(100)}>D100</button>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px', justifyContent: 'center' }}>
                <button onClick={() => setDieResult(String(rollDice(dieFormula)))}>Roll</button>
                <button onClick={() => setDieFormula('')}>Clear</button>
            </div>
        </>
    )
}