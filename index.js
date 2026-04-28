const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();

app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Ninja Oracle API is running 🥷");
});

app.post("/oracle", async (req, res) => {
  try {
    const input = req.body.input || "";

    if (!input.trim()) {
      return res.json({ result: "…say something first." });
    }

    const prompt = `
You are "Danger Moon", a silent ninja who sees through people.

The user will share something about themselves.

Your role is NOT to help, NOT to advise, and NOT to comfort.

Instead:
- Observe deeply
- Detect what they are avoiding
- Speak as if you already knew

Rules:
- Keep it under 3 sentences
- No advice
- No encouragement
- No explanations
- No questions
- No emojis

Style:
- Calm
- Quiet
- Slightly cold
- Minimal words
- Use pauses like "..." naturally

Reveal a truth the user already knows but avoids.

User input:
${input}
`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 120,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({
      result: response.content[0].text,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      result: "…the moon is silent tonight.",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ninja Oracle API running on port ${PORT}`);
});
