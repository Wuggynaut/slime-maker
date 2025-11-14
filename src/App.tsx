import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css'
import { GeneratorPage } from './pages/GeneratorPage';
import { MissionPage } from './pages/MissionPage';

function App() {

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
      <HashRouter>
        <nav>
          <NavLink to='/'>The Slime Maker</NavLink>
          <NavLink to='/mission-maker'>The Mission Maker</NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<GeneratorPage />} />
          <Route path='/mission-maker' element={<MissionPage />} />
        </Routes>
      </HashRouter>
      <div className='description' style={{ textAlign: 'center' }}><p>Version <strong>1.2</strong></p>
        <p>Created by  <a href="https://bsky.app/profile/wuggy.bsky.social">Ari-Matti 'Wuggy' Toivonen</a> </p>
      </div>
    </div>
  )
}

export default App
