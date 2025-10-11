import { rollDice } from './diceRoller';
import {
    slimeNamePart1, slimeNamePart2, slimeNamePart3, slimeNamePart4
} from '../data/slimeNames';

export function generateSlimeName(): string {
    const part1 = slimeNamePart1[rollDice('1d6')];
    const part2 = slimeNamePart2[rollDice('1d6')];
    const part3 = slimeNamePart3[rollDice('1d6')];
    const part4 = slimeNamePart4[rollDice('1d6')];

    return part1 + part2 + part3 + part4;
}