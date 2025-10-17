import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";

function App() {
  //State variable
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL;

  //Function to handle summarize
  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text to summarize");
      return;
    }

    //Clear state
    setError("");
    setSummary("");
    setLoading(true);

    try {
      //Call backend API
      const response = await axios.post(`${BASE_URL}/summarize`, {
        text: text,
      });

      //Update state summary
      setSummary(response.data.summary);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to summarize");
      console.log("Error:", err);
    } finally {
      //Turn off loading
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Text Summarizer</h1>
      <textarea
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        disabled={loading}
      ></textarea>
      <p>Characters: {text.length}</p>
      <div className="button-area">
        <button button className="summarize-btn" onClick={() => setText("")}>
          Clear
        </button>
        <button
          className="summarize-btn"
          onClick={handleSummarize}
          disabled={!text}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>
      {loading && <p className="loading">⏳ Processing your text...</p>}
      {summary && (
        <div className="result-box">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
