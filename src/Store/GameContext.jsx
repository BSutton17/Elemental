import React, { createContext, useContext, useState } from 'react';
import elements from '../Components/Elements.json';

const GameContext = createContext();

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  // Elements Health
  const [waterHealth, setWaterHealth] = useState(elements.Water.Health);
  const [fireHealth, setFireHealth] = useState(elements.Fire.Health);
  const [airHealth, setAirHealth] = useState(elements.Air.Health);
  const [earthHealth, setEarthHealth] = useState(elements.Earth.Health);
  const [electricityHealth, setElectricityHealth] = useState(elements.Electricity.Health);
  const [iceHealth, setIceHealth] = useState(elements.Ice.Health);
  const [natureHealth, setNatureHealth] = useState(elements.Nature.Health);

  // Elements Defese
  const [waterDefense, setWaterDefense] = useState(elements.Water.Defense);
  const [fireDefense, setFireDefense] = useState(elements.Fire.Defense);
  const [airDefense, setAirDefense] = useState(elements.Air.Defense);
  const [earthDefense, setEarthDefense] = useState(elements.Earth.Defense);
  const [electricityDefense, setElectricityDefense] = useState(elements.Electricity.Defense);
  const [iceDefense, setIceDefense] = useState(elements.Ice.Defense);
  const [natureDefense, setNatureDefense] = useState(elements.Nature.Defense);

  //tech stuff
  const [clicked, setClicked] = useState(); 
  const [targetHealth, setTargetHealth] = useState()
  const [targetDefense, setTargetDefense] = useState()

  return (
    <GameContext.Provider
      value={{
        // Health States
        waterHealth,
        setWaterHealth,
        fireHealth,
        setFireHealth,
        airHealth,
        setAirHealth,
        earthHealth,
        setEarthHealth,
        electricityHealth,
        setElectricityHealth,
        iceHealth,
        setIceHealth,
        natureHealth,
        setNatureHealth,

        //defense
        waterDefense, 
        setWaterDefense,
        fireDefense, 
        setFireDefense,
        airDefense, 
        setAirDefense,
        earthDefense, 
        setEarthDefense,
        electricityDefense, 
        setElectricityDefense,
        iceDefense, 
        setIceDefense,
        natureDefense, 
        setNatureDefense,

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
