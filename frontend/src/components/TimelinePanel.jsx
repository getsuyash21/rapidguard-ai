import React from 'react';
import { motion } from 'framer-motion';

const TimelinePanel = ({ timeline }) => {
  return (
    <motion.div className="timeline glass" initial={{ x: 100 }} animate={{ x: 0 }}>
      <h2>Live Incident Timeline</h2>
      <div className="timeline-list">
        {timeline.map((event, i) => (
          <motion.div key={i} className="timeline-item fade-in" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}>
            <span className="time">{event.time}</span>
            <span className="event">{event.event}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TimelinePanel;