import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [relayStates, setRelayStates] = useState({ relay1: false, relay2: false });

  // Fetch relay states periodically
  useEffect(() => {
    const fetchRelayStates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/relays');
        setRelayStates(response.data);
      } catch (err) {
        console.error('GET /api/relays error:', err.response?.data || err.message);
      }
    };

    fetchRelayStates();
    const interval = setInterval(fetchRelayStates, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Toggle relay
  const toggleRelay = async (relay) => {
    try {
      const newState = !relayStates[`relay${relay}`];
      await axios.post('http://localhost:3000/api/relays', { relay, state: newState });
      setRelayStates((prev) => ({ ...prev, [`relay${relay}`]: newState }));
    } catch (err) {
      console.error('POST /api/relays error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="app-container">
      <div className="dashboard">
        <h1>Relay Control</h1>
        {[1, 2].map((relay) => (
          <div key={relay} className="relay-control">
            <span className="relay-label">Relay {relay}: {relayStates[`relay${relay}`] ? 'ON' : 'OFF'}</span>
            <button
              onClick={() => toggleRelay(relay)}
              className={relayStates[`relay${relay}`] ? 'button-off' : 'button-on'}
            >
              Turn {relayStates[`relay${relay}`] ? 'OFF' : 'ON'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;