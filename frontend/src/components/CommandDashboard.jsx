import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroCommandPanel from './HeroCommandPanel';
import AIAnalysisPanel from './AIAnalysisPanel';
import PersonalizedEvacuationAI from './PersonalizedEvacuationAI';
import LiveEvacuationNavigator from './LiveEvacuationNavigator';
import HeatmapPanel from './HeatmapPanel';
import DepartmentStatus from './DepartmentStatus';
import TimelinePanel from './TimelinePanel';
import AlertFeed from './AlertFeed';
import MetricsPanel from './MetricsPanel';
import SimulationControls from './SimulationControls';
import IncidentLog from './IncidentLog';
import AIVoiceAssistant from './AIVoiceAssistant';
import { useVoiceSynthesis, useNetworkStatus } from '../hooks/useEmergency';

const CommandDashboard = ({ emergencyType, analysis, loading, onGoBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedAccordion, setExpandedAccordion] = useState('analysis');
  const [incidents, setIncidents] = useState([{ type: emergencyType, severity: 'Critical', timestamp: new Date().toLocaleTimeString(), status: 'Active' }]);
  const [timeline, setTimeline] = useState([
    { time: '00:00', event: 'Incident detected' },
    { time: '00:08', event: 'Security alerted' },
    { time: '00:20', event: 'Medical dispatched' },
    { time: '00:42', event: 'Evacuation started' },
    { time: '01:10', event: 'Fire contained' }
  ]);
  const [departments, setDepartments] = useState([
    { name: 'Security Team', status: 'ACTIVE' },
    { name: 'Medical Team', status: 'ACTIVE' },
    { name: 'Fire Response', status: 'ACTIVE' },
    { name: 'Management', status: 'ACTIVE' },
    { name: 'Guest Support', status: 'ACTIVE' }
  ]);
  const [threatLevel, setThreatLevel] = useState('CRITICAL');
  const { speak } = useVoiceSynthesis();
  const isOnline = useNetworkStatus();

  useEffect(() => {
    speak(`Emergency dashboard activated. ${emergencyType} in critical status.`);
  }, []);

  const tabs = [
    { id: 'overview', label: '🎯 Overview', icon: '📊' },
    { id: 'evacuation', label: '🚪 Evacuation', icon: '🗺️' },
    { id: 'coordination', label: '👥 Coordination', icon: '📡' },
    { id: 'analysis', label: '🤖 AI Analysis', icon: '⚡' },
    { id: 'logs', label: '📋 Logs', icon: '📝' }
  ];

  const accordions = {
    analysis: ['AI Analysis', 'Risk Assessment'],
    evacuation: ['Evacuation Routes', 'Personalized Guidance', 'Heatmap'],
    coordination: ['Department Status', 'Timeline', 'Communications'],
    overview: ['Hero Panel', 'Threat Status', 'Metrics']
  };

  return (
    <motion.div className="command-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Sticky Status Bar */}
      <div className="sticky-status-bar glass">
        <div className="status-left">
          <span className={`threat-indicator ${threatLevel.toLowerCase()}`}>
            ⚠️ {threatLevel}
          </span>
          <span className={`connectivity ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? '🟢 ONLINE' : '🔴 OFFLINE'}
          </span>
        </div>
        <div className="status-center">
          <span className="emergency-type">{emergencyType}</span>
        </div>
        <div className="status-right">
          <span>Active Teams: {departments.filter(d => d.status === 'ACTIVE').length}</span>
          <motion.button
            className="back-btn"
            whileHover={{ scale: 1.05 }}
            onClick={onGoBack}
          >
            ← Back to Emergency
          </motion.button>
        </div>
      </div>

      {/* AI Voice Assistant (Always Visible) */}
      <AIVoiceAssistant emergencyType={emergencyType} threatLevel={threatLevel} isActive={true} />

      {/* Tab Navigation */}
      <div className="tab-navigation">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon} {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div className="dashboard-content">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HeroCommandPanel threatLevel={threatLevel} activeIncidents={1} responseTeams={departments.length} emergencyStatus="ACTIVE" />
              <MetricsPanel />
            </motion.div>
          )}

          {activeTab === 'evacuation' && (
            <motion.div key="evacuation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LiveEvacuationNavigator />
              <PersonalizedEvacuationAI />
              <HeatmapPanel />
            </motion.div>
          )}

          {activeTab === 'coordination' && (
            <motion.div key="coordination" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DepartmentStatus departments={departments} />
              <TimelinePanel timeline={timeline} />
              <AlertFeed />
            </motion.div>
          )}

          {activeTab === 'analysis' && (
            <motion.div key="analysis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AIAnalysisPanel analysis={analysis} loading={loading} />
              <SimulationControls onSimulate={(type) => {
                if (type === 'Fire Spread') {
                  setThreatLevel('EXTREME');
                  speak('Fire spread detected. Escalating response.');
                }
              }} />
            </motion.div>
          )}

          {activeTab === 'logs' && (
            <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <IncidentLog incidents={incidents} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CommandDashboard;