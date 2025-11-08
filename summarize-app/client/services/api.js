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

//API Functions (Stream)
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
      throw new Error(`Stream request failed ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      //Decode chunk
      const chunk = decoder.decode(value);
      //Split by newlines
      const lines = chunk.split("\n");
      console.log(lines);
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = JSON.parse(line.slice(6));
          if (data.type === "chunk") {
            onChunk(data.content);
          } else if (data.type === "done") {
            onDone(data);
          } else if (data.type === "error") {
            onError(data.error);
          }
        }
      }
    }
  } catch (error) {
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
