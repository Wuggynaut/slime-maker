import { getArticle, capitalize, capitalizeAll } from "./textUtilities"

export const formatCharacterForClipboard = (
    slimeName: string,
    slimeTitle: string,
    titleDescription: string,
    color: string,
    accent: string,
    pattern: string,
    texture: string,
    skills: Array<{ name: string }>,
    weaknesses: Array<{ name: string }>,
    hostOccupation: string,
    hostDescription: string,
    belongings: string[]
) => {
    return `
${slimeName.toUpperCase()} , the ${capitalizeAll(slimeTitle)}
${titleDescription}

APPEARANCE
${capitalize(getArticle(color))} ${color} slime, patterned with ${accent}, ${pattern} accents, with ${getArticle(texture)} ${texture} surface.

SKILLS
${skills.length === 0 ? '• None' : skills.map(s => `• ${s.name}`).join('\n')}

WEAKNESSES
${weaknesses.map(w => `• ${w.name}`).join('\n')}
───────────────────────────────────────
HOST BODY
Your host body is ${getArticle(hostOccupation)} ${capitalize(hostOccupation)}.
${hostDescription}

BELONGINGS
${belongings.map(b => `• ${capitalize(b)}`).join('\n')}
`.trim();
}