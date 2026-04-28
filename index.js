import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.post("/generate", async (req, res) => {
  const { input } = req.body;

  const response = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `
You are a ninja oracle.
You reveal truth, not comfort.

User input: ${input}

Answer in one short, mysterious sentence.
        `
      }
    ]
  });

  res.json({
    result: response.content[0].text
  });
});
app.get("/", (req, res) => {
  res.send("Ninja Oracle API is running 🥷");
});
app.listen(3000, () => {
  console.log("Ninja Oracle API is running 🥷");
});
