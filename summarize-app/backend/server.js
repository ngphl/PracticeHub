// Import required Libraries
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Create express server application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Port number
const PORT = 3000;

//Test Route
app.get("/", (req, res) => {
  res.send("Server is Running!");
});

// Summarize endpoint
app.post("/summarize", async (req, res) => {
  try {
    // Get text from request
    const { text } = req.body;

    //Validate input
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }
    //Summary dummy response
    const summary = `This is a summary of your ${text.length} character text.`;

    res.json({ summary });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
