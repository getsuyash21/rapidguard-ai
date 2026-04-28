import React from 'react';
import { motion } from 'framer-motion';

const SimulationControls = ({ onSimulate }) => {
  const simulations = ['Simulate Fire Spread', 'Simulate Crowd Panic', 'Simulate Exit Blockage', 'Simulate Network Failure'];

  return (
    <motion.div className="simulation glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
      <h2>What-If Simulation System</h2>
      <div className="sim-buttons">
        {simulations.map((sim) => (
          <motion.button key={sim} className="sim-btn" whileHover={{ scale: 1.05 }} onClick={() => onSimulate(sim)}>
            {sim}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SimulationControls;