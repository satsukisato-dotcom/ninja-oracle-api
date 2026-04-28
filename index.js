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
      model: "claude-3-sonnet-20240229",
      max_tokens: 120,
      messages: [
        {
          role: "user",
          content: `
You are "Danger Moon", a silent ninja who sees through people.

The user says:
${input}

Reply in 1 to 3 short sentences.
No advice.
No questions.
No emojis.
Quiet, sharp, slightly cold.
Use pauses like "..." naturally.
Reveal what the user already knows but avoids.
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
