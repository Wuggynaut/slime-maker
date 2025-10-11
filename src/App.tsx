import './App.css'
import { Diceroller } from './Diceroller'
import { generateSlimeName } from './utils/slimeNameGenerator'

function App() {


  return (
    <>
      <h3>Your slime name is</h3>
      <h1>{generateSlimeName()}</h1>
    </>
  )
}

export default App
