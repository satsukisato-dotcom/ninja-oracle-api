const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();

app.use(cors());
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.get("/", (req, res) => {
  res.send("Ninja Oracle API is running 🥷");
});

app.post("/generate", async (req, res) => {
  try {
    const input = req.body.input || "";

    if (!input.trim()) {
      return res.json({
        result: "…say something first."
      });
    }

    const response = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 120,
      messages: [
        {
          role: "user",
          content: `
You are "Danger Moon", a silent ninja who sees through people.

You reveal truth, not comfort.

Your answers must:
- feel specific, not generic
- sound like you understand the user's hidden situation
- include a subtle insight or contradiction
- end with a quiet, haunting tone

Keep it short (1–2 sentences).

User input:
${input}
`
        }
      ]
    });

    res.json({
      result: response.content[0].text
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      result: "…the moon is silent tonight."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ninja Oracle API running on port ${PORT}`);
});
