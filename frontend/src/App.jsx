import React, { useState } from 'react';
import EmergencyActionScreen from './components/EmergencyActionScreen';
import CommandDashboard from './components/CommandDashboard';
import './index.css';

function App() {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmergencyTriggered = async (type) => {
    setEmergencyType(type);
    setEmergencyActive(true);
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emergencyType: type })
      });
      const data = await response.json();
      setAnalysis(data.analysis || data.error || 'Analysis unavailable');
    } catch (error) {
      setAnalysis(error.message || 'Backend unavailable - using offline mode');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      {!emergencyActive ? (
        <EmergencyActionScreen onEmergencyTriggered={handleEmergencyTriggered} />
      ) : (
        <CommandDashboard
          emergencyType={emergencyType}
          analysis={analysis}
          loading={loading}
          onGoBack={() => setEmergencyActive(false)}
        />
      )}
    </div>
  );
}

export default App;