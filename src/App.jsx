import { useState } from 'react'
import './App.css'
import { useGameContext } from './Store/GameContext';
import Inventory from './Components/Inventory';
import GameScreen from './Components/GameScreen';
import elements from './Components/Elements.json';

function App() {
  const [count, setCount] = useState(0)

  //pass in the data as a index in the elements array
  const water = elements['Water']; 
  const fire = elements['Fire']; 
  const air = elements['Air']; 
  const earth = elements['Earth']; 
  const ice = elements['Ice'];
  const electricity = elements['Electricity']; 
  const nature = elements['Nature']; 

  return (
    <>
      <GameScreen />
      <Inventory Element={air} />
    </>
  )
}

export default App
