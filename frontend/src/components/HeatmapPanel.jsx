import React from 'react';
import { motion } from 'framer-motion';

const HeatmapPanel = () => {
  return (
    <motion.div className="heatmap glass" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
      <h2>Crowd Intelligence Heatmap</h2>
      <div className="heatmap-grid">
        <div className="zone high">High Density</div>
        <div className="zone panic">Panic Area</div>
        <div className="zone safe">Safe Zone</div>
      </div>
      <div className="insights">
        <p className="neon-yellow">Lobby congestion increasing</p>
        <p className="neon-red">North stairwell overloaded</p>
      </div>
    </motion.div>
  );
};

export default HeatmapPanel;