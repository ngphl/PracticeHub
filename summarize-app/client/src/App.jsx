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
      <p style={{ color: "#A69B8D", fontSize: "14px", opacity: 0.85 }}>
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
        <button
          role="switch"
          aria-checked={useStreaming}
          aria-label="Toggle streaming mode for real-time summarization"
          disabled={loading || isStreaming}
          onClick={() => {
            if (!loading && !isStreaming) {
              setUseStreaming(!useStreaming);
            }
          }}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "44px",
            paddingRight: "44px",
            height: "36px",
            backgroundColor: useStreaming
              ? "rgba(166, 155, 141, 0.3)"
              : "rgba(115, 101, 88, 0.15)",
            borderRadius: "18px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            border: useStreaming
              ? "1px solid rgba(166, 155, 141, 0.5)"
              : "1px solid rgba(115, 101, 88, 0.2)",
            boxShadow: useStreaming
              ? "0 0 20px rgba(166, 155, 141, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.3)"
              : "inset 0 1px 2px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)",
            cursor: isStreaming ? "not-allowed" : "pointer",
            opacity: isStreaming ? 0.5 : 1,
            userSelect: "none",
            outline: "none",
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
              backgroundColor: useStreaming ? "#A69B8D" : "#736558",
              borderRadius: "50%",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: useStreaming
                ? "0 2px 8px rgba(166, 155, 141, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.4)"
                : "0 2px 4px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
              background: useStreaming
                ? "linear-gradient(135deg, #D9D2CC 0%, #A69B8D 100%)"
                : "linear-gradient(135deg, #8C7F70 0%, #736558 100%)",
              pointerEvents: "none",
            }}
          >
            <span style={{ fontSize: "16px", lineHeight: 1, color: "#2C2C2C" }}>
              {useStreaming ? "✓" : ""}
            </span>
          </div>

          {/* Text in center */}
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: useStreaming ? "#F2EEEB" : "#8C7F70",
              textShadow: useStreaming
                ? "0 0 12px rgba(242, 238, 235, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)"
                : "0 1px 2px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: "none",
            }}
          >
            Streaming
          </span>
        </button>
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
