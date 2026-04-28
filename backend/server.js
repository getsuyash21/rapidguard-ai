require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("RapidGuard AI Backend Running");
});

app.post('/analyze', async (req, res) => {
  const { emergencyType } = req.body;
  const prompt = `You are an emergency response AI commander.

Analyze this situation:
- ${emergencyType}

Return:
1. Risk level
2. Predicted escalation/spread
3. Top 3 recommended actions
4. Priority level
5. Evacuation recommendation

Keep response short, realistic, and actionable.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });
    const data = await response.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ analysis: aiText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));