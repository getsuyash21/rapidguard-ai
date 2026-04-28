import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroCommandPanel from './HeroCommandPanel';
import EmergencyControls from './EmergencyControls';
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

const Dashboard = () => {
  const [emergencyType, setEmergencyType] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [departments, setDepartments] = useState([
    { name: 'Security Team', status: 'STANDBY' },
    { name: 'Medical Team', status: 'STANDBY' },
    { name: 'Fire Response', status: 'STANDBY' },
    { name: 'Management', status: 'STANDBY' },
    { name: 'Guest Support', status: 'STANDBY' }
  ]);
  const [threatLevel, setThreatLevel] = useState('LOW');
  const [activeIncidents, setActiveIncidents] = useState(0);
  const [responseTeams, setResponseTeams] = useState(0);
  const [emergencyStatus, setEmergencyStatus] = useState('NORMAL');

  const triggerEmergency = async (type) => {
    setEmergencyType(type);
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emergencyType: type })
      });
      const data = await response.json();
      if (data.error) {
        setAnalysis(data.error);
      } else {
        setAnalysis(data.analysis);
        setThreatLevel('CRITICAL');
        setActiveIncidents(1);
        setResponseTeams(3);
        setEmergencyStatus('ACTIVE');
        setDepartments(departments.map(d => ({ ...d, status: 'ACTIVE' })));
        setIncidents([...incidents, { type, severity: 'Critical', timestamp: new Date().toLocaleTimeString(), status: 'Active' }]);
        setTimeline([
          { time: '00:00', event: 'Incident detected' },
          { time: '00:08', event: 'Security alerted' },
          { time: '00:20', event: 'Medical dispatched' },
          { time: '00:42', event: 'Evacuation started' },
          { time: '01:10', event: 'Fire contained' }
        ]);
      }
    } catch (error) {
      setAnalysis(error.message || JSON.stringify(error));
    }
    setLoading(false);
  };

  return (
    <motion.div className="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <HeroCommandPanel threatLevel={threatLevel} activeIncidents={activeIncidents} responseTeams={responseTeams} emergencyStatus={emergencyStatus} />
      <EmergencyControls onTrigger={triggerEmergency} loading={loading} />
      <AIAnalysisPanel analysis={analysis} loading={loading} />
      <PersonalizedEvacuationAI />
      <LiveEvacuationNavigator />
      <HeatmapPanel />
      <DepartmentStatus departments={departments} />
      <TimelinePanel timeline={timeline} />
      <AlertFeed />
      <MetricsPanel />
      <SimulationControls onSimulate={(type) => {
        if (type === 'Fire Spread') {
          setThreatLevel('EXTREME');
          setActiveIncidents(2);
        }
      }} />
      <IncidentLog incidents={incidents} />
    </motion.div>
  );
};

export default Dashboard;