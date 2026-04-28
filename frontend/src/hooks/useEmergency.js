import { useState, useCallback, useEffect } from 'react';

export const useVoiceCommand = (onCommandDetected) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(transcript);
          if (onCommandDetected) onCommandDetected(transcript);
        } else {
          interim += transcript;
        }
      }
      if (interim) setTranscript(interim);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  }, [onCommandDetected]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return { isListening, transcript, startListening, stopListening };
};

export const useVoiceSynthesis = () => {
  const speak = useCallback((text, options = {}) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech Synthesis not supported');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    utterance.voice = window.speechSynthesis.getVoices()[0];

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
};

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export const useLocationDetection = () => {
  const [location, setLocation] = useState('Floor 1, Lobby');
  
  const floors = ['Floor 1, Lobby', 'Floor 2, Restaurant', 'Floor 3, Conference', 'Floor 4, Rooms', 'Floor 5, Rooms'];
  const randomLocation = () => floors[Math.floor(Math.random() * floors.length)];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLocation(randomLocation());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return location;
};