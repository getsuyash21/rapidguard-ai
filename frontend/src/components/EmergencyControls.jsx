import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmergencyControls = ({ onTrigger, loading }) => {
  const [customEmergency, setCustomEmergency] = useState('');
  const emergencies = ['Fire', 'Medical Emergency', 'Security Threat', 'Gas Leak', 'Flooding', 'Violence', 'Electrical Failure'];

  return (
    <motion.div className="emergency-controls glass" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
      <h2>Smart Panic Button System</h2>
      <div className="buttons-grid">
        {emergencies.map((em) => (
          <motion.button
            key={em}
            className="emergency-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTrigger(em)}
            disabled={loading}
          >
            {em}
          </motion.button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Custom emergency input"
        value={customEmergency}
        onChange={(e) => setCustomEmergency(e.target.value)}
      />
      <motion.button
        className="trigger-btn"
        whileHover={{ scale: 1.05 }}
        onClick={() => onTrigger(customEmergency || 'Custom Emergency')}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Trigger Emergency'}
      </motion.button>
    </motion.div>
  );
};

export default EmergencyControls;