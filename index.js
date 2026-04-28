const express = require("express");
const app = express();

app.use(express.json());

app.post("/oracle", (req, res) => {
  const input = req.body.input || "";

  let result = "";

  if (input.length < 5) {
    result = "…you’re holding back.";
  } else if (input.includes("love")) {
    result = "…you already know who.";
  } else {
    result = "…you already know what's wrong.";
  }

  res.json({ result });
});

app.get("/", (req, res) => {
  res.send("Ninja Oracle API is running 🥷");
});

app.listen(3000, () => {
  console.log("Server running");
});
