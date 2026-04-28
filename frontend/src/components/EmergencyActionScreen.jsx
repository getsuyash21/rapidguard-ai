import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useVoiceCommand, useVoiceSynthesis, useNetworkStatus, useLocationDetection } from '../hooks/useEmergency';

const EmergencyActionScreen = ({ onEmergencyTriggered }) => {
  const [selectedType, setSelectedType] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const isOnline = useNetworkStatus();
  const location = useLocationDetection();
  const { speak } = useVoiceSynthesis();

  const emergencyTypes = ['Fire', 'Medical Emergency', 'Security Threat', 'Gas Leak', 'Flooding', 'Violence', 'Electrical Failure'];

  const handleVoiceCommand = (transcript) => {
    const lower = transcript.toLowerCase();
    let detected = null;

    if (lower.includes('fire')) detected = 'Fire';
    else if (lower.includes('medical') || lower.includes('help')) detected = 'Medical Emergency';
    else if (lower.includes('security') || lower.includes('threat')) detected = 'Security Threat';
    else if (lower.includes('gas')) detected = 'Gas Leak';
    else if (lower.includes('flood')) detected = 'Flooding';
    else if (lower.includes('violence') || lower.includes('assault')) detected = 'Violence';
    else if (lower.includes('electrical')) detected = 'Electrical Failure';

    if (detected) {
      setSelectedType(detected);
      speak(`Emergency activated. ${detected} detected at ${location}.`);
      setTimeout(() => onEmergencyTriggered(detected), 500);
    }
  };

  const { isListening, transcript, startListening } = useVoiceCommand(handleVoiceCommand);

  const triggerEmergency = (type) => {
    speak(`Emergency activated. ${type} detected at ${location}.`);
    setTimeout(() => onEmergencyTriggered(type), 300);
  };

  const sendEmergencySMS = () => {
    speak('Sending emergency SMS to local authorities.');
    alert(`SMS SENT:\n"EMERGENCY: ${selectedType || 'HELP'} at ${location}. Immediate assistance required."`);
  };

  return (
    <motion.div className="emergency-action-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Network Status Bar */}
      <div className={`network-status ${isOnline ? 'online' : 'offline'}`}>
        <span>{isOnline ? '🟢 ONLINE' : '🔴 OFFLINE - EMERGENCY MODE'}</span>
        <span>📍 {location}</span>
      </div>

      {/* AI Voice Assistant Orb */}
      <motion.div 
        className={`ai-voice-orb ${isListening ? 'listening' : ''}`}
        animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
        transition={{ repeat: isListening ? Infinity : 0, duration: 0.6 }}
      >
        <div className="orb-inner">
          {isListening && <div className="waveform"></div>}
          <span>🤖</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="action-content">
        <h1 className="title">RapidGuard AI</h1>
        <p className="subtitle">Emergency Response System</p>

        {/* Giant Panic Button */}
        <motion.button
          className="panic-button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => triggerEmergency(selectedType || 'General Emergency')}
        >
          <div className="pulse-ring"></div>
          <span>EMERGENCY</span>
        </motion.button>

        {/* Voice Command Button */}
        <motion.button
          className={`voice-button ${isListening ? 'active' : ''}`}
          whileHover={{ scale: 1.05 }}
          onMouseDown={startListening}
        >
          🎤 {isListening ? 'LISTENING...' : 'VOICE COMMAND'}
        </motion.button>

        {isListening && <p className="transcript">{transcript}</p>}

        {/* Emergency Type Selector */}
        <div className="type-selector">
          <p className="selector-label">Select Emergency Type:</p>
          <div className="type-grid">
            {emergencyTypes.map((type) => (
              <motion.button
                key={type}
                className={`type-btn ${selectedType === type ? 'selected' : ''}`}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedType(type);
                  speak(type);
                }}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        {/* SMS Fallback Button */}
        <motion.button
          className={`sms-button ${!isOnline ? 'active' : ''}`}
          whileHover={{ scale: 1.05 }}
          onClick={sendEmergencySMS}
          disabled={!selectedType && isOnline}
        >
          📩 {isOnline ? 'SMS FALLBACK' : 'SEND EMERGENCY SMS'}
        </motion.button>

        {/* AI Status */}
        <div className="ai-status">
          <div className="status-indicator">
            <span className={`dot ${isOnline ? 'online' : 'offline'}`}></span>
            AI {isOnline ? 'CONNECTED' : 'OFFLINE MODE'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyActionScreen;