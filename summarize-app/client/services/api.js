import axios from "axios";

//Base URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

//Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

//API Functions
export const summarizeText = async (text) => {
  try {
    const response = await api.post("/summarize", { text });
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
