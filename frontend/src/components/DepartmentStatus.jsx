import React from 'react';
import { motion } from 'framer-motion';

const DepartmentStatus = ({ departments }) => {
  return (
    <motion.div className="departments glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <h2>Multi-Department Response System</h2>
      <div className="dept-grid">
        {departments.map((dept, i) => (
          <motion.div key={i} className="dept-card" whileHover={{ scale: 1.05 }}>
            <h3>{dept.name}</h3>
            <span className={`status ${dept.status.toLowerCase()}`}>{dept.status}</span>
            <div className="progress-bar">
              <motion.div className="progress" initial={{ width: 0 }} animate={{ width: dept.status === 'ACTIVE' ? '80%' : '20%' }} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DepartmentStatus;