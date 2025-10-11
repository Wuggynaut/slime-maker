export type DieGroup = {
    count: number;
    sides: number;
}

export function rollDice(formula: string): number {
    const diesToRoll = parseDieFormula(formula);

    let total = 0;

    for (const dies of diesToRoll) {
        for (let i = 0; i < dies.count; i++) {
            total += Math.floor(Math.random() * dies.sides) + 1;
        }
    }

    return total;
}

export function rollD6(): number {
    return Math.floor(Math.random() * 6) + 1;
}

export function parseDieFormula(formula: string): DieGroup[] {
    const groups: DieGroup[] = [];

    const parts = formula.split('+').map(p => p.trim());

    for (const part of parts) {
        const match = part.match(/(\d+)d(\d+)/);
        if (match) {
            groups.push({
                count: parseInt(match[1]),
                sides: parseInt(match[2])
            });
        }
    }

    return groups;
}