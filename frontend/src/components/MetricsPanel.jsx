import React from 'react';
import { motion } from 'framer-motion';

const MetricsPanel = () => {
  const metrics = {
    responseTime: '2.3 min',
    successRate: '94%',
    alertsHandled: 127,
    efficiency: '68% faster'
  };

  return (
    <motion.div className="metrics glass" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
      <h2>Response Score System</h2>
      <div className="metrics-grid">
        <div className="metric">
          <h3>Response Time</h3>
          <span className="value">{metrics.responseTime}</span>
        </div>
        <div className="metric">
          <h3>Evacuation Success Rate</h3>
          <span className="value">{metrics.successRate}</span>
        </div>
        <div className="metric">
          <h3>Alerts Handled</h3>
          <span className="value">{metrics.alertsHandled}</span>
        </div>
        <div className="metric">
          <h3>Coordination Efficiency</h3>
          <span className="value">{metrics.efficiency}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsPanel;