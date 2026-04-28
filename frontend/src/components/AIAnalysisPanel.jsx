import React from 'react';
import { motion } from 'framer-motion';

const AIAnalysisPanel = ({ analysis, loading }) => {
  if (!analysis && !loading) return null;
  return (
    <motion.div className="ai-analysis glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>AI Situation Understanding Panel</h2>
      {loading ? (
        <div className="loading">AI analyzing situation...</div>
      ) : (
        <div className="analysis-content">
          <pre>{analysis}</pre>
        </div>
      )}
    </motion.div>
  );
};

export default AIAnalysisPanel;