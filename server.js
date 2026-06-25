import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// LLM client
const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

// AI ROUTE (CORE DAY 3 REQUIREMENT)
app.post("/api/ask", async (req, res) => {
try {
const { question } = req.body;

const response = await client.chat.completions.create({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: "You are a helpful Study Buddy AI that explains concepts simply."
},
{
role: "user",
content: question
}
]
});

res.json({
answer: response.choices[0].message.content
});

} catch (err) {
res.status(500).json({ error: "AI failed" });
}
});

app.listen(process.env.PORT, () => {
console.log("Server running on port", process.env.PORT);
});
