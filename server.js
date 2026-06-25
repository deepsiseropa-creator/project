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

// ✅ DAY 4 AI FEATURE (MAIN REQUIREMENT)
app.post("/api/ai", async (req, res) => {
  try {
    const { type, input } = req.body;

    let systemPrompt = "";

    if (type === "explain") {
      systemPrompt =
        "Explain the topic in simple student-friendly language with examples.";
    }

    if (type === "summarize") {
      systemPrompt =
        "Summarize the given notes into short exam revision points.";
    }

    if (type === "plan") {
      systemPrompt =
        "Convert the topic into a structured study plan with steps and schedule.";
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input }
      ]
    });

    res.json({
      result: response.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
