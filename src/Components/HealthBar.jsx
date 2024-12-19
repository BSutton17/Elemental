import React from 'react';

const HealthBar = ({ currentHealth, maxHealth, classNameSet }) => {
  const healthPercentage = (currentHealth / maxHealth) * 100;
  console.log(healthPercentage)

  return (
    <>
      <h3 className="player-health">Your Health</h3>
      <div className={classNameSet}>
        <div
          className={healthPercentage > 50 ? "health-bar-fill" : healthPercentage > 25 ? "health-bar-critical" : "health-bar-danger"}
          style={{
            width: `${healthPercentage}%`,
            transition: 'width 0.5s ease-in-out'
          }}
        ></div>
      </div>
    </>
  );
};

export default HealthBar;
