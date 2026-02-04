import React, { useState, useEffect } from 'react';
import './BiologyFact.css';

const BiologyFact = () => {
  const [currentFact, setCurrentFact] = useState(0);

  const biologyFacts = [
    "Trees communicate through underground fungal networks",
    "A single mature tree can absorb up to 48 pounds of CO2 per year",
    "Bamboo grows up to 35 inches per day - the fastest-growing plant",
    "Over 50% of the world's oxygen comes from the ocean",
    "Recycling one aluminum can saves enough energy for 3 hours of TV",
    "A bee visits 50-100 flowers during one collection trip"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % biologyFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [biologyFacts.length]);

  return (
    <div className="biology-fact-simple">
      <div className="fact-container">
        <div className="fact-text">
          <p>{biologyFacts[currentFact]}</p>
        </div>
      </div>
    </div>
  );
};

export default BiologyFact;