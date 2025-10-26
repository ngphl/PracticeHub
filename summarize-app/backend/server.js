// Import required Libraries
import express, { json } from "express";
import cors from "cors";

// require("dotenv").config();

import "dotenv/config";
import { generateSummary, getAvailableOptions } from "./services/openai.js";

// Create express server application
const app = express();

// Middleware
app.use(cors());
app.use(json());

//Port number
const PORT = process.env.PORT || 3000;

//Test Route
app.get("/", (req, res) => {
  res.json({
    status: "Server is Running!",
    timestamp: new Date().toISOString(),
  });
});

//Get available options
app.get("/api/options", (req, res) => {
  const options = getAvailableOptions();
  res.json(options);
});

// Summarize endpoint
app.post("/summarize", async (req, res) => {
  try {
    const { text, mode = "medium", tone = "professional" } = req.body;

    //Validate
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Text is required",
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        success: false,
        error: "Text too long (max 10,000 characters)",
      });
    }

    // Generate summary
    const result = await generateSummary(text, mode, tone);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(
    `📝 OpenAI API key: ${process.env.OPENAI_API_KEY ? "Loaded" : "❌ MISSING"}`
  );
});

// // openai.js
// (async () => {
//   const text =
//     "Artificial intelligence is transforming industries by automating tasks and enhancing decision-making.";

//   const result = await generateSummary(text, "short", "simple");
//   console.log(result);
// })();
