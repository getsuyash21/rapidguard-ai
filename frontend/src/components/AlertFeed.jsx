import React from 'react';
import { motion } from 'framer-motion';

const AlertFeed = () => {
  const alerts = [
    'Guest: Please proceed calmly to West Stair Exit.',
    'Staff: Fire escalation risk increasing on Floor 4.',
    'AI Guardian: Potential panic situation detected.',
    'AI Guardian: Abnormal crowd movement identified.'
  ];

  return (
    <motion.div className="alert-feed glass" initial={{ y: 50 }} animate={{ y: 0 }}>
      <h2>AI Auto Communication Generator</h2>
      <div className="feed">
        {alerts.map((alert, i) => (
          <motion.div key={i} className="alert-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.3 }}>
            {alert}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AlertFeed;