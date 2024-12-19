import { useEffect, useState } from 'react';
import './game.css';
import { useGameContext } from '../Store/GameContext'; // Import the custom context
import HealthBar from './HealthBar';

function GameScreen() {
  const { 
        water, setWater,
        fire, setFire,
        air, setAir,
        earth, setEarth,
        electricity, setElectricity,
        ice, setIce,
        nature, setNature,
        targetHealth, setTargetHealth, 
        setEnemyElem, enemyElem,
        clickedEnemy, setClickedEnemy,
        birdsEye,
        isAir, setIsAir,
        selectedEnemies, setSelectedEnemies,
        targetShield, setTargetShield,
  } = useGameContext();

  // Handle clicking on the enemy element and toggle it in the selection
  const multiClick = (enemy, setter) => {
    setSelectedEnemies((prev) => {
      if (prev.find((e) => e.enemy === enemy)) {
        // If enemy is already selected, remove it
        return prev.filter((e) => e.enemy !== enemy);
      } else {
        // Otherwise, add it
        return [...prev, { enemy, setter }];
      }
    });
  };

  // Handle clicking on the enemy element and store its health in clicked state
  const handleClick = (elem, setter, enemy, shiled) => {
    if(isAir){
      multiClick(elem, setter)
    }
    else{
      setEnemyElem(elem); 
      setTargetHealth(() => setter); 
      setClickedEnemy(enemy); 
      setTargetShield(shiled)
    }
    
  };


  return (
    <>
      <div className='enemies'>
        <div className='birds'>
          <div
            className={isAir ? selectedEnemies.find((e) => e.enemy === nature) ? 'blue-border enemy' : 'enemy' : clickedEnemy === 'nature' ? 'red-border enemy' : 'enemy'} 
            onClick={() => handleClick(nature, setNature, "nature", nature.Shield_hp)}
          >
            <h3>Nature Health: {nature.Health}</h3>
          </div>
          {birdsEye && (
            <div className='birds-eye-view'>
              <HealthBar currentHealth={100} maxHealth={1000} classNameSet={"birds-eye-view"} />
              <h4>Citizens: {nature.Citizens}</h4>
              <h4>Mana:</h4>
            </div>
          )}
        </div>
        <div className='birds'>
          <div
            className={isAir ? selectedEnemies.find((e) => e.enemy === electricity) ? 'blue-border enemy' : 'enemy' :clickedEnemy === 'electricity' ? 'red-border enemy' : 'enemy'}
            onClick={() => handleClick(electricity, setElectricity, "electricity", electricity.Shield_hp)}
          >
            <h3>Electricity Health: {electricity.Health}</h3>
          </div>
          {birdsEye && (
            <div className='birds-eye-view'>
              <HealthBar currentHealth={100} maxHealth={1000} classNameSet={"birds-eye-view"} />
              <h4>Citizens: {electricity.Citizens}</h4>
              <h4>Mana:</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GameScreen;
