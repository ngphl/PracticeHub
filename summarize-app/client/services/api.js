import axios from "axios";

//Base URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

//Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

//API Functions (Normal)
export const summarizeText = async (text, mode, tone) => {
  try {
    const response = await api.post("/summarize", { text, mode, tone });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.error || error.message || " Failed to summarize",
    };
  }
};

// API Function (Streaming with SSE)
export const summarizeTextStream = async (
  text,
  mode,
  tone,
  onChunk,
  onDone,
  onError
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/summarize/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, mode, tone }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      // Decode the chunk and add to buffer
      buffer += decoder.decode(value, { stream: true });

      // Split by newlines to get individual SSE messages
      const lines = buffer.split("\n");

      // Keep the last incomplete line in the buffer
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));

            if (data.type === "chunk") {
              onChunk(data.content);
            } else if (data.type === "done") {
              console.log("Done event received:", data);
              onDone({
                tokensUsed: data.tokensUsed,
                cost: data.cost,
              });
            } else if (data.type === "error") {
              onError(data.error);
              return;
            }
          } catch (parseError) {
            console.warn("Failed to parse SSE data:", line, parseError);
          }
        }
      }
    }
  } catch (error) {
    console.error("Streaming error:", error);
    onError(error.message || "Failed to stream summary");
  }
};

//** Get Summarization Option */
export const getOptions = async () => {
  try {
    const response = await api.get("/api/options");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

//
