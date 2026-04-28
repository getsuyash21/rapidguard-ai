import React from 'react';
import { motion } from 'framer-motion';

const HeroCommandPanel = ({ threatLevel, activeIncidents, responseTeams, emergencyStatus }) => {
  return (
    <motion.div className="hero-panel glass emergency-glow pulse" initial={{ y: -50 }} animate={{ y: 0 }}>
      <div className="logo">
        <h1 className="neon-red">RapidGuard AI</h1>
        <p>AI-Powered Crisis Coordination System</p>
      </div>
      <div className="status-grid">
        <div className="status-item">
          <span>Threat Level</span>
          <span className={`level ${threatLevel.toLowerCase()}`}>{threatLevel}</span>
        </div>
        <div className="status-item">
          <span>Active Incidents</span>
          <span className="neon-red">{activeIncidents}</span>
        </div>
        <div className="status-item">
          <span>Response Teams Active</span>
          <span className="neon-green">{responseTeams}</span>
        </div>
        <div className="status-item">
          <span>Emergency Status</span>
          <span className={`status ${emergencyStatus.toLowerCase()}`}>{emergencyStatus}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCommandPanel;