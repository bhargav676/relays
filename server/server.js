const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Store relay states in memory
let relayStates = { relay1: false, relay2: false };

// GET relay states
app.get('/api/relays', (req, res) => {
  try {
    console.log('GET /api/relays:', relayStates);
    res.json(relayStates);
  } catch (err) {
    console.error('GET /api/relays error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST relay toggle
app.post('/api/relays', (req, res) => {
  try {
    const { relay, state } = req.body;
    console.log('POST /api/relays received:', { relay, state });
    if (!Number.isInteger(relay) || typeof state !== 'boolean' || (relay !== 1 && relay !== 2)) {
      return res.status(400).json({ error: 'Invalid relay or state' });
    }
    relayStates = { ...relayStates, [`relay${relay}`]: state };
    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/relays error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));