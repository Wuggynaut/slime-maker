import './App.css'
import { GenerateHost, type HostHandle } from './GenerateHost'
//import { GenerateMission } from './GenerateMission';
import { GenerateSlime, type SlimeHandle } from './GenerateSlime';
import { useRef, useState } from 'react';
import { FaDice } from "react-icons/fa";
import { DICE } from './constants/gameConfig';
import logo from './assets/logo.png'
import { generateSlimeName } from './utils/slimeNameGenerator';
import { slimeAccent, slimeColor, slimePattern, slimeTexture } from './data/slimeTraits';
import { slimeTitles } from './data/slimeTitles';
import { rollDice } from './utils/diceRoller';
import type { Skill } from './data/slimeSkills';
import { hostBodies, type HostBody } from './data/hostBodies';
import { hostEyes, hostFace, hostHair, hostHairColor, hostMouth, hostNose, hostPhysique, type HostTraits } from './data/hostTraits';
import { formatCharacterForClipboard } from './utils/characterFormatter';
import { generateHostDescription } from './utils/hostDescription';

function App() {
  const [slimeTraits, setSlimeTraits] = useState(() => ({
    name: generateSlimeName(),
    color: slimeColor[rollDice(DICE.SLIME_TRAIT)],
    pattern: slimePattern[rollDice(DICE.SLIME_TRAIT)],
    accent: slimeAccent[rollDice(DICE.SLIME_TRAIT)],
    texture: slimeTexture[rollDice(DICE.SLIME_TRAIT)],
    title: slimeTitles[rollDice(DICE.SLIME_TRAIT)]
  }));

  const [slimeSkills, setSlimeSkills] = useState<Skill[]>([]);
  const [slimeWeaknesses, setSlimeWeaknesses] = useState<Skill[]>([]);

  const [hostBody, setHostBody] = useState<HostBody>(hostBodies[rollDice(DICE.HOST_BODY)]);
  const [hostTraits, setHostTraits] = useState<HostTraits>(() => ({
    physique: hostPhysique[rollDice(DICE.HOST_TRAIT)],
    hair: hostHair[rollDice(DICE.HOST_TRAIT)],
    hairColor: hostHairColor[rollDice(DICE.HOST_TRAIT)],
    face: hostFace[rollDice(DICE.HOST_TRAIT)],
    eyes: hostEyes[rollDice(DICE.HOST_TRAIT)],
    mouth: hostMouth[rollDice(DICE.HOST_TRAIT)],
    nose: hostNose[rollDice(DICE.HOST_TRAIT)],
    selectedFacePart: rollDice(DICE.FACE_FEATURE) as 1 | 2 | 3
  }));

  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [copyCount, setCopyCount] = useState(0);

  const slimeRef = useRef<SlimeHandle>(null);
  const bodyRef = useRef<HostHandle>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  const handleRerollSlime = () => {
    slimeRef.current?.regenerateSlime();
  };

  const handleRerollBody = () => {
    bodyRef.current?.generateBody();
  };

  const handleCopyCharacter = async () => {
    try {

      if (copyTimeoutRef.current !== null) {
        clearTimeout(copyTimeoutRef.current);
      }

      const text = formatCharacterForClipboard(
        slimeTraits.name,
        slimeTraits.title.name,
        slimeTraits.title.description,
        slimeTraits.color,
        slimeTraits.accent,
        slimeTraits.pattern,
        slimeTraits.texture,
        slimeSkills,
        slimeWeaknesses,
        hostBody.occupation,
        generateHostDescription(hostTraits),
        hostBody.belongings
      );
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
      setCopyCount(prev => prev + 1); //Increment copy counter to force React to remount element

      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  }

  return (
    <div>
      <svg className='grainy-svg'>
        <defs>
          <filter id='grainy' x='0' y='0' width='100%' height='100%'>
            <feTurbulence type='fractalNoise' baseFrequency='0.637' />
            <feColorMatrix type="saturate" values="0" />
            <feBlend mode="multiply" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      <div className='grainy-background' />

      <div className='slime-sheet'>
        <div style={{ textAlign: 'center' }}>
          <h1 className='header-title'>THE SLIME MAKER</h1>
          <div className='description'><strong>A character generator for</strong></div>
          <a href='https://wuggy.itch.io/alien-brain-slimes'>
            <img
              src={logo}
              alt="Alien Brain Slimes logo"
              className="logo"
            />
          </a>
          <div className='button-group'>
            <button onClick={handleRerollSlime} aria-label='Reroll slime'><FaDice /> Reroll Slime</button>
            <button onClick={handleRerollBody} aria-label='Reroll host body'><FaDice /> Reroll Host Body</button>
          </div>
        </div>

        <div className='content-grid'>
          <GenerateSlime
            ref={slimeRef}
            traits={slimeTraits}
            skills={slimeSkills}
            weaknesses={slimeWeaknesses}
            onUpdateSkills={setSlimeSkills}
            onUpdateWeaknesses={setSlimeWeaknesses}
            onUpdateTraits={setSlimeTraits}
          />
          <GenerateHost
            ref={bodyRef}
            body={hostBody}
            traits={hostTraits}
            onUpdateBody={setHostBody}
            onUpdateTraits={setHostTraits}
          />


        </div>
        <div className='button-group'><button onClick={handleCopyCharacter} aria-label='Copy slime to clipboard' className='copy-button'>
          <span key={copyCount} className={copyStatus === 'copied' ? 'fade-in' : ''}>
            {copyStatus === 'copied' ? '✓ Copied!' : 'Copy Slime to Clipboard'}
          </span>
        </button>
        </div>
        <div className='description' style={{ textAlign: 'center' }}><p>Version <strong>1.1</strong></p>
          <p>Created by  <a href="https://bsky.app/profile/wuggy.bsky.social">Ari-Matti 'Wuggy' Toivonen</a> </p></div>
      </div >
    </div>
  )
}

export default App
