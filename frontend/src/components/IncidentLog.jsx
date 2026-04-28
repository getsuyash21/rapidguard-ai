import React from 'react';
import { motion } from 'framer-motion';

const IncidentLog = ({ incidents }) => {
  return (
    <motion.div className="incident-log glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>Incident Log System</h2>
      <div className="log-list">
        {incidents.map((inc, i) => (
          <div key={i} className="log-item">
            <span>{inc.type} - {inc.severity}</span>
            <span>{inc.timestamp}</span>
            <span>{inc.status}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default IncidentLog;