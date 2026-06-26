import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route (fix 404 issue)
app.get("/", (req, res) => {
  res.send("Study Buddy Backend is Running 🚀");
});

// ✅ AI route (frontend calls this)
app.post("/api/ai", async (req, res) => {
  try {
    const { type, input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    // 🔥 TEMP RESPONSE (replace with OpenAI later)
    const result = `You asked: "${input}" | Type: ${type}`;

    res.json({ result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
