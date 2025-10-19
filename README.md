# The Slime Maker

A random character generator for the tabletop RPG [Alien Brain Slimes](https://wuggy.itch.io/alien-brain-slimes). Generate unique slime aliens and their human host bodies.

[Live Demo](https://wuggynaut.github.io/slime-maker/)

## About the Project

The Slime Maker creates randomized characters for Alien Brain Slimes, a tabletop RPG where players control alien slimes inhabiting human hosts.
The generator produces complete character sheets including:

- **Slime characteristics**: Randomly generated names, titles, appearance traits, skills, and weaknesses
- **Host bodies**: Occupation, physical description, and belongings
- **Granular control**: Reroll the entire character or just specific traits

## Technical Highlights

### Dice Rolling System
The project includes a custom dice roller that mimics tabletop RPG dice notation (1d6, 1d10, etc.). This maps directly to the game's mechanics. For now all this happens behind the scenes but may be utilized later.

### Unique Skill Generation
The skill generation system ensures no duplicates between skills and weaknesses by tracking used skills and implementing collision detection with a retry mechanism. Different slime titles have different skill generation rules.

### Visual Design
The grainy texture effect is achieved using SVG filters with fractal noise.

## Running locally

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd slime-maker
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173/slime-maker/`

### Building for Production
```bash
npm run build
```

## Possible Future Additions

- Add character export/save functionality
- Add print-friendly character sheet view
- More unnecessary visual effects

## About Alien Brain Slimes

Alien Brain Slimes is my sci-fi comedy tabletop RPG. Check it out on [itch.io](https://wuggy.itch.io/alien-brain-slimes).

## License

This project is for portfolio purposes.

## 👤 Contact

Ari-Matti Toivonen
arimatti.toivonen@gmail.com
https://bsky.app/profile/wuggy.bsky.social

Project Link: https://github.com/Wuggynaut/slime-maker