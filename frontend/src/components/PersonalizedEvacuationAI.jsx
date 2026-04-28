import React from 'react';
import { motion } from 'framer-motion';

const PersonalizedEvacuationAI = () => {
  const recommendations = [
    { type: 'Elderly guests', advice: 'Avoid stairs', route: 'Elevator route selected', score: 95 },
    { type: 'Injured guests', advice: 'Escort required', route: 'Shortest low-risk route', score: 98 },
    { type: 'Staff members', advice: 'Use service exits', route: 'Back corridors', score: 92 },
    { type: 'Children', advice: 'Adult supervision', route: 'Main hallways', score: 90 }
  ];

  return (
    <motion.div className="evacuation-ai glass" initial={{ x: -100 }} animate={{ x: 0 }}>
      <h2>Personalized Evacuation AI</h2>
      <div className="recommendations">
        {recommendations.map((rec, i) => (
          <motion.div key={i} className="rec-card" whileHover={{ scale: 1.02 }}>
            <h3>{rec.type}</h3>
            <p>{rec.advice}</p>
            <p>{rec.route}</p>
            <p>Safety Score: {rec.score}%</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PersonalizedEvacuationAI;