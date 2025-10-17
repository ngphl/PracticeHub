import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import { useSummarize } from "../hooks/useSummarize";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { SummaryResult } from "../components/SummaryResult";
import { ErrorMessage } from "../components/ErrorMessage";
import "./App.css";

function App() {
  const { text, summary, loading, error, setText, handleSummarize, clearAll } =
    useSummarize();

  return (
    <div className="App">
      <h1>🤖 AI Text Summarizer</h1>
      <TextInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
        placeholder="Paste your text here..."
      />

      <div className="button-area">
        <Button onClick={handleSummarize} loading={loading} variant="primary">
          Summarize
        </Button>
        <Button onClick={clearAll} loading={loading} variant="secondary">
          Clear
        </Button>
      </div>

      <SummaryResult summary={summary} loading={loading} />
      <ErrorMessage message={error} />
    </div>
  );
}

export default App;
