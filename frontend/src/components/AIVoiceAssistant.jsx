import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useVoiceSynthesis, useNetworkStatus, useLocationDetection } from '../hooks/useEmergency';

const AIVoiceAssistant = ({ emergencyType, threatLevel, isActive }) => {
  const { speak } = useVoiceSynthesis();
  const isOnline = useNetworkStatus();
  const location = useLocationDetection();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    const guidances = {
      Fire: [
        { speaker: 'AI COMMAND', text: 'Fire detected. Evacuate immediately via nearest exit.' },
        { speaker: 'SECURITY', text: 'Floor corridors being monitored. Move to stairwell.' },
        { speaker: 'FIRE RESPONSE', text: 'Units en route. ETA 4 minutes.' },
        { speaker: 'AI COMMAND', text: 'Avoid elevators. Use stairs only.' },
        { speaker: 'MEDICAL', text: 'Teams standing by for assistance.' }
      ],
      'Medical Emergency': [
        { speaker: 'AI COMMAND', text: 'Medical assistance activated.' },
        { speaker: 'MEDICAL', text: 'Paramedics dispatched. ETA 3 minutes.' },
        { speaker: 'AI COMMAND', text: 'Please remain calm and stay in place.' },
        { speaker: 'MEDICAL', text: 'First aid stations available at each floor.' },
        { speaker: 'MANAGEMENT', text: 'Guest assistance provided.' }
      ],
      'Security Threat': [
        { speaker: 'AI COMMAND', text: 'Security threat detected. Lock down initiated.' },
        { speaker: 'SECURITY', text: 'Officers responding. Shelter in place.' },
        { speaker: 'AI COMMAND', text: 'Do not approach the threat. Wait for clearance.' },
        { speaker: 'MANAGEMENT', text: 'Guest safety protocols activated.' }
      ]
    };

    const sequence = guidances[emergencyType] || guidances['Medical Emergency'];
    let index = 0;

    const interval = setInterval(() => {
      if (index < sequence.length) {
        const msg = sequence[index];
        setMessages(prev => [...prev, msg]);
        speak(`${msg.speaker}: ${msg.text}`);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, emergencyType, speak]);

  return (
    <motion.div className="ai-voice-assistant glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="assistant-header">
        <h2>🎙️ AI Voice Command Center</h2>
        <span className={`status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? '🟢 LIVE' : '🔴 OFFLINE'}
        </span>
      </div>

      <div className="communication-feed">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`message ${msg.speaker.toLowerCase().replace(' ', '-')}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="speaker">[{msg.speaker}]</span>
            <p className="text">{msg.text}</p>
          </motion.div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="empty-state">
          <p>Awaiting emergency commands...</p>
        </div>
      )}
    </motion.div>
  );
};

export default AIVoiceAssistant;