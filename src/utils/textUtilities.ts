export function getArticle(word: string): string {
    return ['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase()) ? 'an' : 'a';
}

export function capitalize(word: string): string {
    if (!word) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function capitalizeAll(text: string): string {
    if (!text) return text;

    const words = text.split(' ');
    let capitalized = '';

    for (const word of words) {
        capitalized += ' ' + capitalize(word);
    }

    return capitalized;
}