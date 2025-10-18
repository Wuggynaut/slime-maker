import './App.css'
import { GenerateHost, type HostHandle } from './GenerateHost'
//import { GenerateMission } from './GenerateMission';
import { GenerateSlime, type SlimeHandle } from './GenerateSlime';
import { useRef } from 'react';
import { FaDice } from "react-icons/fa";

function App() {
  const slimeRef = useRef<SlimeHandle>(null);
  const bodyRef = useRef<HostHandle>(null);

  const handleRerollSlime = () => {
    slimeRef.current?.regenerateSlime();
  };

  const handleRerollBody = () => {
    bodyRef.current?.generateBody();
  };

  return (
    <div className='slime-sheet'>
      <div style={{ textAlign: 'center' }}>
        <h1 className='header-title'>THE SLIME MAKER</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px', marginBottom: '20px', justifyContent: 'center' }}>
          <button onClick={handleRerollSlime}><FaDice /> Reroll Slime</button>
          <button onClick={handleRerollBody}><FaDice /> Reroll Host Body</button>
        </div>
      </div>

      <div className='content-grid'>
        <GenerateSlime ref={slimeRef} />
        <GenerateHost ref={bodyRef} />
      </div>

    </div >
  )
}

export default App
