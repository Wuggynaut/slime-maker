export type Skill = {
    name: string;
    description: string;
}

export const physicalSkills: Record<number, Skill> = {
    1: {
        name: 'Limb Coordination',
        description: 'Arms, legs, broad movements'
    },
    2: {
        name: 'Locomotion',
        description: 'Walking, running, climbing'
    },
    3: {
        name: 'Finger Movement',
        description: 'Fine motor control, object manipulation'
    },
    4: {
        name: 'Eye Control',
        description: 'Looking, tracking movement, focusing'
    },
    5: {
        name: 'Balance',
        description: 'Keeping footing, not falling over'
    },
    6: {
        name: 'Reflexes',
        description: 'Quick reactions, involuntary movement control'
    }
}

export const socialSkills: Record<number, Skill> = {
    1: {
        name: 'Forming Sentences',
        description: 'Speaking coherently, proper grammar'
    },
    2: {
        name: 'Tone & Volume',
        description: 'Control over vocal chords'
    },
    3: {
        name: 'Facial Expressions',
        description: 'Conveying appropriate emotions'
    },
    4: {
        name: 'Body Language',
        description: 'Posture, social gestures'
    },
    5: {
        name: 'Emotional Reading',
        description: 'Understanding a human\'s tone and expressions'
    },
    6: {
        name: 'Humor',
        description: 'Understanding and delivering Human jokes'
    }
}

export const knowledgeSkills: Record<number, Skill> = {
    1: {
        name: 'Pop Culture',
        description: 'Entertainment, trends, references'
    },
    2: {
        name: 'Social Norms',
        description: 'Human etiquette, cultural customs'
    },
    3: {
        name: 'Technology',
        description: 'Mechanics, electronics, digital systems'
    },
    4: {
        name: 'Human Biology',
        description: 'Anatomy, health, medical knowledge'
    },
    5: {
        name: 'Non-Human Biology',
        description: 'Animals, plants, earth ecosystems'
    },
    6: {
        name: 'Economics',
        description: 'Money, jobs, commerce'
    }
}