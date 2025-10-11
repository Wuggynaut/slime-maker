import { slimeAccent, slimeColor, slimePattern, slimeTexture } from './data/slimeTraits'
import { rollD6 } from './utils/diceRoller'
import { generateSlimeName } from './utils/slimeNameGenerator'

export function GenerateSlime() {

    const color = slimeColor[rollD6()];
    const pattern = slimePattern[rollD6()];
    const accent = slimeAccent[rollD6()];
    const texture = slimeTexture[rollD6()];

    const vowels =
        ['a', 'e', 'i', 'o', 'u'];

    return (
        <>
            <h3>You are</h3>
            <h1>{generateSlimeName()}</h1>
            <p>You are {vowels.includes(color[0]) ? 'an' : 'a'} <strong>{color}</strong> slime, patterned with <strong>{accent}</strong>, <strong>{pattern}</strong> accents, with {vowels.includes(texture[0]) ? 'an' : 'a'} <strong>{texture}</strong> surface</p>
        </>
    )
}