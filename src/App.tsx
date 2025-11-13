import './App.css'
import { GeneratorPage } from './pages/GeneratorPage';

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

      <GeneratorPage />
    </div>
  )
}

export default App
