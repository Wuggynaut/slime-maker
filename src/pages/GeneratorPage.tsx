import { GenerateHost, type HostHandle } from '../components/GenerateHost'
//import { GenerateMission } from './GenerateMission';
import { GenerateSlime, type SlimeHandle } from '../components/GenerateSlime';
import { useRef, useState } from 'react';
import { FaDice } from "react-icons/fa";
import logo from '../assets/logo.png'
import { formatCharacterForClipboard } from '../utils/characterFormatter';
import { generateHostDescription } from '../utils/hostDescription';
import { useGeneratorStore } from '../stores/generatorStore';

export function GeneratorPage() {

    const {
        slimeTraits,
        slimeSkills,
        slimeWeaknesses,
        hostBody,
        hostTraits,
        setSlimeTraits,
        setSlimeSkills,
        setSlimeWeaknesses,
        setHostBody,
        setHostTraits
    } = useGeneratorStore();

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

            </div >
        </div>
    )
}