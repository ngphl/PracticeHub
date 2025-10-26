import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import { useSummarize } from "../hooks/useSummarize";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { SummaryResult } from "../components/SummaryResult";
import { ErrorMessage } from "../components/ErrorMessage";
import { Select } from "../components/Select";
import { StatsDisplay } from "../components/StatsDisplay";
import "./App.css";

function App() {
  const {
    text,
    setText,
    mode,
    setMode,
    tone,
    setTone,
    availableOptions,
    summary,
    loading,
    error,
    tokensUsed,
    cost,
    handleSummarize,
    clearAll,
  } = useSummarize();

  return (
    <div className="App">
      <h1>🤖 AI Text Summarizer</h1>
      <p style={{ color: "#666", fontSize: "14px" }}>
        Powered by OpenAI GPT-4o-mini
      </p>
      <div className="input-section">
        <TextInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          placeholder="Paste your text here..."
          maxLength={10000}
        />
      </div>

      <div className="options-section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        ></div>
        <Select
          label="Summary Mode"
          value={mode}
          onChange={setMode}
          options={availableOptions.modes}
          disabled={loading}
        />
        <Select
          label="Summary Tone"
          value={tone}
          onChange={setTone}
          options={availableOptions.tones}
          disabled={loading}
        />
      </div>

      <div className="actions-section" style={{ display: "flex", gap: "10px" }}>
        <Button onClick={handleSummarize} loading={loading} variant="primary">
          Summarize
        </Button>
        <Button onClick={clearAll} loading={loading} variant="secondary">
          Clear
        </Button>
      </div>

      <SummaryResult summary={summary} loading={loading} />
      <StatsDisplay tokensUsed={tokensUsed} cost={cost} />
      <ErrorMessage message={error} />
    </div>
  );
}

export default App;
