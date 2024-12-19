import { useState } from 'react';
import './game.css';
import { useGameContext } from '../Store/GameContext'; // Import the custom context

function GameScreen() {
  const [clickedEnemy, setClickedEnemy] = useState(); // Track the clicked enemy
  const { 
    fireHealth, airHealth, waterHealth, electricityHealth, earthHealth, iceHealth, natureHealth, 
    fireDefense, airDefense, waterDefense, electricityDefense, earthDefense, iceDefense, natureDefense, 
    clicked, setClicked, targetHealth, setTargetHealth, setTargetDefense,
    setFireHealth, setAirHealth, setWaterHealth, setElectricityHealth, setEarthHealth, setIceHealth, setNatureHealth 
  } = useGameContext();

  // Handle clicking on the enemy element and store its health in clicked state
  const handleClick = (health, setter, defense, enemy) => {
    setClicked(health);
    setTargetHealth(() => setter);
    setTargetDefense(() => defense)
    setClickedEnemy(enemy); 
    console.log(clickedEnemy)
  };

  return (
    <>
      <div className='enemies'>
        <div
          className={clickedEnemy === 'fire' ? 'red-border enemy' : 'enemy'}
          onClick={() => handleClick(fireHealth, setFireHealth, fireDefense, 'fire')}
        >
          Fire Health: {fireHealth}
        </div>

        <div
          className={clickedEnemy === 'air' ? 'red-border enemy' : 'enemy'} 
          onClick={() => handleClick(airHealth, setAirHealth, airDefense, 'air')}
        >
          Air Health: {airHealth}
        </div>

        <div
          className={clickedEnemy === 'water' ? 'red-border enemy' : 'enemy'}
          onClick={() => handleClick(waterHealth, setWaterHealth, waterDefense, 'water')}
        >
          Water Health: {waterHealth}
        </div>
      </div>
    </>
  );
}

export default GameScreen;
