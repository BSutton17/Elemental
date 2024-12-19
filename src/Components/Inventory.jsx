import { useState, useEffect } from 'react';
import './game.css';
import { useGameContext } from '../Store/GameContext';
import elements from './Elements.json';
import HealthBar from './HealthBar';

function Inventory({ Element }) {
  const [mana, setMana] = useState(2000);
  const [citizens, setCitizens] = useState(0);
  const [citizenPrice, setCitizenPrice] = useState(100)
  const [currentHealth, setCurrentHealth] = useState(Element.Health)
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [critRate, setCritRate]= useState(Element.Attacks.crit_rate)
  const [critDmg, setCritDmg]= useState(Element.Attacks.crit_dmg)

  const [primaryCooldown, setPrimaryCooldown] = useState(0); 
  const [secondaryCooldown, setSecondaryCooldown] = useState(0); 
  const [specialCooldown, setSpecialCooldown] = useState(0); 
  const [utilityCooldown, setUtilityCooldown] = useState(0); 
  const [ultimateCooldown, setUltimateCooldown] = useState(0); 

  const [toggleUlt, setToggleUlt] = useState(false)

  const [shieldHp, setShieldHp] = useState(Element["Shield-hp"])
  const { targetHealth, enemyElem, setClickedEnemy, setEnemyElem, setBirdsEye, isAir, setIsAir, selectedEnemies, setSelectedEnemies,} = useGameContext(); 

  //elements for var
  const water = elements['Water']; 
  const fire = elements['Fire']; 
  const air = elements['Air']; 
  const earth = elements['Earth']; 
  const ice = elements['Ice'];
  const electricity = elements['Electricity']; 
  const nature = elements['Nature']; 

  //handle special abilities for all elements
  const specialAbility = (Element) =>{
    switch(Element){
        case water:
            
            break;
        case fire:
            
            break;
        case air:
            
            break;
        case earth:
            
            break;
        case ice:
            
            break;
        case electricity:
            
            break;
        case nature:
            
            break;

    }
  }

  const utilityAbility = (Element, cost, cooldownTime, setCooldown) =>{
    switch(Element){
        case water:
          if(currentHealth < Element.Health - (Element.Health * 0.15)){
            setCurrentHealth((prev) => prev + (Element.Health * 0.15))
          }
          else{
            setCurrentHealth(Element.Health)
          }
            break;
        case fire:
            setCritRate((prev) => prev + 5)
            setCritDmg((prev) => prev + (prev * 0.1))
            setTimeout(()=>{
              setCritRate(Element.Attacks.crit_rate)
              setCritDmg(Element.Attacks.crit_dmg)
            }, [10000])
            break;
        case air:
            setBirdsEye(true)
            setTimeout(()=>{
              setBirdsEye(false)
            },[5000])
            break;
        case earth:
            
            break;
        case ice:
            
            break;
        case electricity:
            
            break;
        case nature:
            
            break;

    }
    cooldown(cooldownTime, setCooldown);
    setMana((prev) => prev - cost);
  }

  const ultimateAbility = (Element, cost, cooldownTime, setCooldown) =>{
    switch(Element){
        case water:
          if(currentHealth < Element.Health - (Element.Health * 0.5)){
            setCurrentHealth((prev) => prev + (Element.Health * 0.5))
          }
          else{
            setCurrentHealth(Element.Health)
          }

          setCitizens((prev)=> Math.floor(prev + prev * 0.2))
            break;
        case fire:
            setCritRate(100)
            setCritDmg(2.5)
            break;
        case air:
            
            break;
        case earth:
            
            break;
        case ice:
            
            break;
        case electricity:
            
            break;
        case nature:
            
            break;

    }
    cooldown(cooldownTime, setCooldown);
    setMana((prev) => prev - cost);
  }

  // Initialize citizens based on the Element prop
  useEffect(() => {
    console.log(Element);
    if (Element && Element.Citizens) {
      setCitizens(Element.Citizens);
    }
    //nature passive
    if(Element == elements['Nature']){
        setCitizenPrice(150)
    }

    if(Element == air){
      setIsAir(true)
    }
  }, [Element]);

  // Generate mana based on the number of citizens every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (Element !== water) {
        setMana(prev =>prev + citizens); 
      } 
      //water passive
      else {
        setMana(prev => Math.floor(prev + citizens * 1.1));
      }
    }, 1000);
      

      return () => clearInterval(interval); 
    
  }, [citizens]); 

  useEffect(()=>{
    if(currentHealth < Element.Health){
      const regen = setInterval(() => {
      setCurrentHealth((prev) => {
        const newHealth = prev + 10;
        return newHealth;
      });
    }, 1000);

    return () => clearInterval(regen); 
  }
  },[currentHealth])

    //cooldown
    const cooldown = (cooldownTime, setCooldown ) => {
      setCooldown(cooldownTime);
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

  // Attack function that reduces targetHealth
  const attack = (damage, cost, cooldownTime, setCooldown) => {
    if (mana < cost) {
      console.log("Too Expensive");
      return;
    }
  
    if (isAir && selectedEnemies.length > 0) {
      // Attack all selected enemies if isAir is true
      selectedEnemies.forEach(({ enemy, setter }) => {
        const random = Math.floor(Math.random() * 100) + 1;
        let updatedHealth;
  
        if (random <= critRate) {
          updatedHealth = Math.floor(
            (enemy.Health - ((damage * critDmg / selectedEnemies.length) * enemy.Defense))
          );
        } else {
          updatedHealth = Math.floor(
            (enemy.Health - (damage / selectedEnemies.length * enemy.Defense)) 
          );
        }
  
        setter((prev) => ({
          ...prev,
          Health: updatedHealth,
        }));
      });
  
      // Cleanup after attacking multiple enemies
      setSelectedEnemies([]);
      cooldown(cooldownTime, setCooldown);
      setMana((prev) => prev - cost);
    } else if (enemyElem) {
      // Single target attack
      const random = Math.floor(Math.random() * 100) + 1;
      let updatedHealth;
  
      if (random <= critRate) {
        updatedHealth = Math.floor(
          enemyElem.Health - (damage * critDmg * enemyElem.Defense)
        );
      } else {
        updatedHealth = Math.floor(
          enemyElem.Health - (damage * enemyElem.Defense)
        );
      }
  
      targetHealth((prev) => ({
        ...prev,
        Health: updatedHealth,
      }));
  
      setClickedEnemy(null);
      setEnemyElem(null);
      cooldown(cooldownTime, setCooldown);
      setMana((prev) => prev - cost);
  
      // Cleanup fire ultimate
      if (critRate >= 100) {
        setCritRate(Element.Attacks.crit_rate);
        setCritDmg(Element.Attacks.crit_dmg);
      }
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
        <HealthBar currentHealth={currentHealth} maxHealth={Element.Health} classNameSet={"personal-bar"} />
        <div className="inventory-bar">
          <div className="inventory-btn">
            <div className="info">
              <h3 id="citizens">Citizens: {citizens}</h3>
              <h3 id="Mana">Mana: {mana}</h3>
            </div>
            <button
              className="inventory-attack-btn"
              onClick={buyCitizens}
            >
              <div className="attack-name">Buy Citizens</div>
              <div className="attack-cost">{citizenPrice}M</div>
            </button>
            <button
              className="inventory-attack-btn"
              onClick={() => attack(Element.Attacks.Primary.dmg, Element.Attacks.Primary.cost, Element.Attacks.Primary.CD, setPrimaryCooldown)}
              disabled={primaryCooldown > 0}
            >
              <div className="attack-name">{Element.Attacks.Primary.name}</div>
              <div className="attack-cost">
                {Element.Attacks.Primary.cost}M
                {primaryCooldown > 0 && ` (${primaryCooldown}s)`}
              </div>
            </button>
            <button
              className="inventory-attack-btn"
              onClick={() => attack(Element.Attacks.Secondary.dmg, Element.Attacks.Secondary.cost, Element.Attacks.Secondary.CD, setSecondaryCooldown) }
              disabled={secondaryCooldown > 0}
            >
              <div className="attack-name">{Element.Attacks.Secondary.name}</div>
              <div className="attack-cost">
                {Element.Attacks.Secondary.cost}M
                {secondaryCooldown > 0 && ` (${secondaryCooldown}s)`}
              </div>
            </button>
            <button
              className="inventory-attack-btn"
              onClick={() => attack(Element.Attacks.Special.dmg, Element.Attacks.Special.cost, Element.Attacks.Special.CD, setSpecialCooldown)}
              disabled={specialCooldown > 0}
            >
              <div className="attack-name">{Element.Attacks.Special.name}</div>
              <div className="attack-cost">
                {Element.Attacks.Special.cost}M
                {specialCooldown > 0 && ` (${specialCooldown}s)`}
              </div>
            </button>
            <button
              className="inventory-attack-btn"
              onClick={() => utilityAbility(Element, Element.Utility.cost, Element.Utility.CD, setUtilityCooldown)}
              disabled={utilityCooldown > 0}
            >
              <div className="attack-name">{Element.Utility.name}</div>
              <div className="attack-cost">
                {Element.Utility.cost}M
                {utilityCooldown > 0 && ` (${utilityCooldown}s)`}
              </div>
            </button>
            <button
              className="inventory-attack-btn"
              onClick={() =>  ultimateAbility(Element, Element.Ultimate.cost, Element.Ultimate.CD, setUltimateCooldown)}
              disabled={ultimateCooldown > 0}
            >
              <div className="attack-name">{Element.Ultimate.name}</div>
              <div className="attack-cost">
                {Element.Ultimate.cost}M
                {ultimateCooldown > 0 && ` (${ultimateCooldown}s)`}
              </div>
            </button>
          </div>
        </div>
      </>
    );
    
}

export default Inventory;
