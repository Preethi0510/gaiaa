import React, { useState, useEffect } from 'react';
import './BiologyFact.css';

function BiologyFact() {
  const [fact, setFact] = useState('');
  
  const biologyFacts = [
    "A single tree can absorb up to 48 pounds of carbon dioxide per year.",
    "Bamboo is the fastest-growing plant on Earth, growing up to 91 cm per day.",
    "Over 50% of the world's oxygen comes from the ocean through phytoplankton.",
    "It takes about 1,000 years for a plastic bag to degrade in a landfill.",
    "An area of rainforest the size of a football field is destroyed every second.",
    "Composting can reduce household waste by up to 30%.",
    "One reusable bag can replace over 700 plastic bags during its lifetime.",
    "Microplastics have been found in 90% of bottled water and 83% of tap water.",
    "It takes 2,700 liters of water to produce one cotton t-shirt.",
    "If every household in the US replaced one roll of virgin fiber toilet paper with recycled, it would save 423,900 trees."
  ];

  useEffect(() => {
    const randomFact = biologyFacts[Math.floor(Math.random() * biologyFacts.length)];
    setFact(randomFact);
    
    const interval = setInterval(() => {
      const newFact = biologyFacts[Math.floor(Math.random() * biologyFacts.length)];
      setFact(newFact);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="biology-fact">
      <div className="fact-container">
        <i className="fas fa-leaf"></i>
        <p className="fact-text">{fact}</p>
        <i className="fas fa-seedling"></i>
      </div>
    </div>
  );
}

export default BiologyFact;