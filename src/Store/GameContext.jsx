import React, { createContext, useContext, useState } from 'react';
import elements from '../Components/Elements.json';

const GameContext = createContext();

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  // Elements Health
  const [water, setWater] = useState(elements['Water']);
  const [fire, setFire] = useState(elements['Fire']);
  const [air, setAir] = useState(elements['Air']);
  const [earth, setEarth] = useState(elements['Earth']);
  const [electricity, setElectricity] = useState(elements['Electricity']);
  const [ice, setIce] = useState(elements['Ice']);
  const [nature, setNature] = useState(elements['Nature']);
  //passes the enemy object in one location
  const [enemyElem, setEnemyElem] = useState()

  //enemy border
  const [clickedEnemy, setClickedEnemy] = useState(); 

  //Air's ult and passives
  const [birdsEye, setBirdsEye] = useState(false)
  const [isAir, setIsAir] = useState(false)
  const [selectedEnemies, setSelectedEnemies] = useState([]);
  //tech stuff
  const [clicked, setClicked] = useState(); 
  const [targetHealth, setTargetHealth] = useState()
  const [targetDefense, setTargetDefense] = useState()
  const [targetShield, setTargetShield] = useState()

  return (
    <GameContext.Provider
      value={{
        //elements
        water, setWater,
        fire, setFire,
        air, setAir,
        earth, setEarth,
        electricity, setElectricity,
        ice, setIce,
        nature, setNature,

        //misc stuff
        enemyElem, setEnemyElem,
        clickedEnemy, setClickedEnemy,
        birdsEye, setBirdsEye,
        isAir, setIsAir,
        selectedEnemies, setSelectedEnemies,
        targetShield, setTargetShield,
        //tech stuff
        clicked,
        setClicked,
        targetHealth, 
        setTargetHealth,
        targetDefense, 
        setTargetDefense,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
