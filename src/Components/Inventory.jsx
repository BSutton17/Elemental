import { useState, useEffect } from 'react';
import './game.css';
import { useGameContext } from '../Store/GameContext';
import elements from './Elements.json';

function Inventory({ Element }) {
  const [mana, setMana] = useState(0);
  const [citizens, setCitizens] = useState(0);
  const [citizenPrice, setCitizenPrice] = useState(100)
  const { 
    clicked, targetHealth, targetDefense 
  } = useGameContext(); 

  // Initialize citizens based on the Element prop
  useEffect(() => {
    console.log(Element);
    if (Element && Element.Citizens) {
      setCitizens(Element.Citizens);
    }
  }, [Element]);

  // Generate mana based on the number of citizens every second
  useEffect(() => {
    if (citizens > 0) {
      const interval = setInterval(() => {
        setMana((prev) => prev + citizens); 
      }, 1000);

      return () => clearInterval(interval); 
    }
  }, [citizens]); 

  // Attack function that reduces targetHealth
  const attack = (damage, cost) => {
    if (clicked && mana >= cost) {
      targetHealth(clicked - (damage * targetDefense)); 
      setMana((prev) => prev - cost);
    }else{
        console.log("Too Expensive")
    }
  };

  const buyCitizens = () =>{
    if (mana >= citizenPrice) {
        setCitizens((prev) => prev + 1)
        setCitizenPrice((prev) => prev += 10)
        setMana((prev) => prev - citizenPrice);
    }
  }
  return (
    <>
      <div className="inventory-bar">
        <div className="inventory-btn">
          <div className='info'>
            <h3 id="citizens">Citizens: {citizens}</h3>
            <h3 id="Mana">Mana: {mana}</h3>
          </div>
          <button
            className="inventory-attack-btn"
            onClick={buyCitizens} 
          >
            <div className="attack-name">Buy Cititzens</div>
            <div className="attack-cost">{citizenPrice}M</div>
          </button>
          <button
            className="inventory-attack-btn"
            onClick={() => attack(Element.Attacks.Primary.dmg, Element.Attacks.Primary.cost)} 
          >
            <div className="attack-name">{Element.Attacks.Primary.name}</div>
            <div className="attack-cost">{Element.Attacks.Primary.cost}M</div>
          </button>
          <button 
            className="inventory-attack-btn"
            onClick={() => attack(Element.Attacks.Secondary.dmg, Element.Attacks.Secondary.cost)} 
          >
            <div className="attack-name">{Element.Attacks.Secondary.name}</div>
            <div className="attack-cost">{Element.Attacks.Secondary.cost}M</div>
          </button>
          <button 
            className="inventory-attack-btn"
            onClick={() => attack(Element.Attacks.Special.dmg, Element.Attacks.Special.cost)} 
          >
            <div className="attack-name">{Element.Attacks.Special.name}</div>
            <div className="attack-cost">{Element.Attacks.Special.cost}M</div>
          </button>
          <button 
          className="inventory-attack-btn"
          onClick={() => attack(Element.Utility.cost)} >
            <div className="attack-name">{Element.Utility.name}</div>
            <div className="attack-cost">{Element.Utility.cost}M</div>
          </button>
          <button 
          className="inventory-attack-btn"
          onClick={() => attack(Element.Ultimate.cost)} >
            <div className="attack-name">{Element.Ultimate.name}</div>
            <div className="attack-cost">{Element.Ultimate.cost}M</div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Inventory;
