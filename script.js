import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Home route (prevents 404 on "/")
app.get("/", (req, res) => {
  res.send("Study Buddy Backend is Running 🚀");
});

// AI Route
app.post("/api/ai", async (req, res) => {
  try {
    const { type, input } = req.body;

    if (!input || input.trim() === "") {
      return res.status(400).json({
        error: "Please enter a question."
      });
    }

    let systemPrompt = "";

    switch (type) {
      case "explain":
        systemPrompt =
          "Explain the topic in simple student-friendly language with examples.";
        break;

      case "summarize":
        systemPrompt =
          "Summarize the given notes into short exam revision points.";
        break;

      case "plan":
        systemPrompt =
          "Convert the topic into a structured study plan with steps and schedule.";
        break;

      default:
        systemPrompt =
          "Help the student with the given question in a clear and simple way.";
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: input
        }
      ]
    });

    res.json({
      result: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "AI request failed."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
