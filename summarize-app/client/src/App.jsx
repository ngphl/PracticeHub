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
    useStreaming,
    setUseStreaming,
    isStreaming,
  } = useSummarize();

  return (
    <div className="App">
      <h1>AI Text Summarizer</h1>
      <p style={{ color: "#666", fontSize: "14px" }}>
        Powered by OpenAI GPT-4o-mini
      </p>
      <div className="input-section">
        <TextInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading || isStreaming}
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
          disabled={loading || isStreaming}
        />
        <Select
          label="Summary Tone"
          value={tone}
          onChange={setTone}
          options={availableOptions.tones}
          disabled={loading || isStreaming}
        />
      </div>

      <div style={{ marginTop: "15px", marginBottom: "10px" }}>
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "44px",
            paddingRight: "44px",
            height: "36px",
            backgroundColor: useStreaming
              ? "rgba(59, 130, 246, 0.25)"
              : "rgba(71, 85, 105, 0.2)",
            borderRadius: "18px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            border: useStreaming
              ? "1px solid rgba(59, 130, 246, 0.4)"
              : "1px solid rgba(148, 163, 184, 0.25)",
            boxShadow: useStreaming
              ? "0 0 20px rgba(59, 130, 246, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)"
              : "inset 0 1px 2px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)",
            cursor: isStreaming ? "not-allowed" : "pointer",
            opacity: isStreaming ? 0.5 : 1,
            userSelect: "none",
          }}
          onClick={() => {
            if (!loading && !isStreaming) {
              setUseStreaming(!useStreaming);
            }
          }}
        >
          {/* Sliding toggle ball */}
          <div
            style={{
              position: "absolute",
              left: useStreaming ? "calc(100% - 34px)" : "6px",
              top: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              backgroundColor: useStreaming ? "#3b82f6" : "#64748b",
              borderRadius: "50%",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: useStreaming
                ? "0 2px 8px rgba(59, 130, 246, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.3)"
                : "0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
              background: useStreaming
                ? "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"
                : "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
              pointerEvents: "none",
            }}
          >
            <span style={{ fontSize: "16px", lineHeight: 1, color: "white" }}>
              {useStreaming ? "✓" : ""}
            </span>
          </div>

          {/* Text in center */}
          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: useStreaming ? "#e0f2fe" : "#64748b",
              textShadow: useStreaming
                ? "0 0 10px rgba(224, 242, 254, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)"
                : "none",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: "none",
            }}
          >
            Streaming
          </span>
        </div>
      </div>

      <div className="actions-section" style={{ display: "flex", gap: "10px" }}>
        <Button onClick={handleSummarize} loading={loading || isStreaming}>
          {useStreaming ? "Summarize (Streaming)" : "Summarize"}
        </Button>
        <Button onClick={clearAll} loading={loading || isStreaming} variant="secondary">
          Clear
        </Button>
      </div>

      <SummaryResult summary={summary} loading={loading} isStreaming={isStreaming} />
      <StatsDisplay tokensUsed={tokensUsed} cost={cost} />
      <ErrorMessage message={error} />
    </div>
  );
}

export default App;
