# 🚨 RapidGuard AI - Emergency Crisis Response Platform

An **AI-powered emergency coordination system** for hospitality venues. Built with a mobile-first, emergency-first UX that enables crisis response in seconds.

## 🎯 Key Features

### **STAGE 1: Emergency Action Screen**
Ultra-clean, panic-friendly interface for triggering emergencies:
- ✅ **Giant Panic Button** - Large, red, pulsing emergency trigger
- ✅ **Voice Command System** - Web Speech API for hands-free emergency activation
- ✅ **Emergency Type Selector** - 7 pre-defined emergency types (Fire, Medical, Security, etc.)
- ✅ **SMS Fallback Mode** - Works offline with emergency SMS simulation
- ✅ **AI Voice Assistant Orb** - Floating voice assistant indicator with waveform animation
- ✅ **Network Status Detection** - Real-time connectivity indicator
- ✅ **Location Detection** - Simulated guest location tracking (Floor/Room)
- ✅ **Voice Response System** - SpeechSynthesis API for AI voice guidance

### **STAGE 2: Advanced Command Dashboard**
Full emergency management system with:
- ✅ **Sticky Status Bar** - Always-visible threat level, connectivity, active teams
- ✅ **AI Voice Command Center** - Live multi-department communication simulation
- ✅ **5 Organized Tabs**:
  1. 📊 **Overview** - Threat level, metrics, response status
  2. 🚪 **Evacuation** - Routes, personalized guidance, crowd heatmap
  3. 👥 **Coordination** - Department status, timeline, communications
  4. ⚡ **AI Analysis** - Gemini AI analysis, what-if simulations
  5. 📋 **Logs** - Incident history and timeline

### **AI Voice Guidance System**
- 🎙️ Real-time voice commands from AI, Security, Medical, Fire Response teams
- 📢 Dynamic voice modulation based on threat severity
- 🔊 Multi-voice department communication simulation
- 🎯 Continuous guidance updates during crisis

### **Advanced Features**
- ✅ Personalized evacuation routing (Elderly, Injured, Staff, Children)
- ✅ Live heatmap visualization with crowd density alerts
- ✅ Multi-department response coordination
- ✅ Timeline simulation with dynamic updates
- ✅ What-if simulation system (Fire spread, crowd panic, exit blockage)
- ✅ Offline emergency mode with SMS fallback
- ✅ Response metrics and coordination efficiency scores

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Framer Motion for animations
- Web Speech API (voice commands & synthesis)
- Glassmorphism + neon emergency aesthetic

**Backend:**
- Node.js + Express
- Google Gemini 1.5 Flash API
- CORS-enabled REST endpoint

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Google Gemini API key from [makersuite.google.com](https://makersuite.google.com/app/apikey)

### Installation

**1. Clone & Setup Backend**
```bash
cd backend
npm install
```

**2. Configure Environment**
Edit `backend/.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

**3. Start Backend**
```bash
npm start
# Server runs on http://localhost:5000
```

**4. Setup Frontend**
```bash
cd frontend
npm install
```

**5. Start Frontend**
```bash
npm run dev
# App opens at http://localhost:5173
```

## 📱 Usage

### Emergency Trigger Flow

1. **Stage 1 - Emergency Action Screen**
   - Select emergency type OR speak "Fire", "Medical", etc.
   - Click giant red EMERGENCY button
   - Or click "Send Emergency SMS" for offline mode

2. **Stage 2 - Command Dashboard**
   - AI Voice Command Center shows live guidance
   - Navigate tabs to view evacuation, coordination, analysis
   - Use "Back to Emergency" to reset

### Voice Commands
Say these commands to trigger emergencies:
- "Fire"
- "Medical emergency" / "Help"
- "Security threat"
- "Gas leak"
- "Flooding"
- "Violence"
- "Electrical failure"

## 🎨 UI/UX Highlights

### Emergency-First Design
- **Minimal cognitive load** during panic
- **One-tap activation** for emergencies
- **Large, high-contrast buttons** for accessibility
- **Voice-first interface** for hands-free operation
- **Mobile-optimized** layouts for all devices

### Aesthetic
- Dark mode with emergency red glow
- Glassmorphism for modern look
- Neon indicators (green=safe, red=danger, yellow=caution)
- Pulsing animations for critical states
- Smooth transitions for clarity

## 🔧 API Endpoints

### POST `/analyze`
```json
Request:
{
  "emergencyType": "Fire"
}

Response:
{
  "analysis": "AI analysis text from Gemini..."
}
```

## 📋 Project Structure

```
google prototype/
├── backend/
│   ├── package.json
│   ├── server.js          # Express server
│   └── .env               # Gemini API key
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env               # Backend URL
│   └── src/
│       ├── App.jsx        # Main app with 2-stage flow
│       ├── index.css      # Complete styling
│       ├── hooks/
│       │   └── useEmergency.js   # Voice & network hooks
│       └── components/
│           ├── EmergencyActionScreen.jsx
│           ├── CommandDashboard.jsx
│           ├── AIVoiceAssistant.jsx
│           ├── HeroCommandPanel.jsx
│           ├── AIAnalysisPanel.jsx
│           ├── DepartmentStatus.jsx
│           ├── TimelinePanel.jsx
│           ├── AlertFeed.jsx
│           ├── MetricsPanel.jsx
│           ├── PersonalizedEvacuationAI.jsx
│           ├── LiveEvacuationNavigator.jsx
│           ├── HeatmapPanel.jsx
│           ├── SimulationControls.jsx
│           └── IncidentLog.jsx
```

## 🎓 Hackathon Tips

### For Judges
- **Start with Emergency Action Screen** - Shows emergency-first UX philosophy
- **Click panic button with no emergency type** - Demonstrates flexible triggering
- **Enable voice commands** - Say "Fire" or "Help" (requires microphone permission)
- **Navigate tabs** - Shows organized information hierarchy
- **Check AI Voice Center** - Shows real-time voice guidance simulation
- **Test offline mode** - Click SMS button when offline (simulated)
- **Mobile view** - Toggle device emulation (Ctrl+Shift+M) to see responsive design

### Demo Script (2-3 minutes)

1. **Emergency Scenario Setup** (15 sec)
   - "We have a fire emergency on Floor 4"
   - Show the emergency action screen's clean, panic-friendly design

2. **Voice-First Response** (30 sec)
   - Click voice button and say "Fire"
   - Show AI recognizes and auto-fills emergency type
   - Click emergency button to trigger

3. **AI Command Center** (45 sec)
   - Show sticky status bar with threat level
   - Point out AI Voice Command Center with live guidance
   - Highlight multi-department communication (AI, Security, Fire Response)

4. **Coordination Dashboard** (45 sec)
   - Navigate through tabs (Evacuation, Coordination, Analysis)
   - Show real-time metrics and response status
   - Demonstrate what-if simulations affecting live data

5. **Offline Resilience** (15 sec)
   - Show SMS fallback button
   - Explain offline voice-guided emergency mode

## 🔐 Security & Privacy

- **No database** - All data is session-based
- **No authentication** - Emergency accessibility first
- **No personal data storage** - Privacy by design
- **Offline-capable** - Doesn't require constant connectivity

## 🚀 Performance

- **Fast startup** - Vite delivers instant hot reload
- **Voice recognition latency** - ~1-2 seconds for command detection
- **API response time** - Depends on Gemini (typically 2-5 seconds)
- **Offline mode** - Instant response with SMS simulation
- **Mobile optimization** - Sub-1s page transitions on 4G

## 🎯 Next Steps (Beyond MVP)

- Real SMS integration with Twilio
- Actual hotel floor maps with dynamic routing
- Crowd density detection (computer vision)
- Real emergency responder APIs
- Multi-language voice support
- Emergency shelter location mapping
- Guest evacuation status tracking
- Real-time video feeds from security cameras

## 📞 Support

For issues:
1. Ensure API key is valid
2. Check network connectivity
3. Try refreshing the page
4. Check browser console for errors

## 📄 License

MIT - Built for hackathon showcase

---

**Built with ❤️ for emergency resilience in hospitality.**