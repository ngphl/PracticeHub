import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const SummaryResult = ({ summary, loading, isStreaming }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) {
    return <p className="loading" role="status" aria-live="polite">⏳ Processing your text...</p>;
  }

  if (!summary) return null;
  return (
    <div className="result-box" role="region" aria-label="Summary result">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h3 style={{ margin: 0 }}>
          Summary:{" "}
          {isStreaming && (
            <span style={{ fontSize: "12px", color: "#736558" }}>
              (streaming...)
            </span>
          )}
        </h3>
        <button
          onClick={handleCopy}
          className={`copy-button ${copied ? 'copied' : ''}`}
          aria-label={copied ? "Summary copied to clipboard" : "Copy summary to clipboard"}
          style={{
            padding: "8px 16px",
            fontSize: "12px",
            backgroundColor: copied ? "#A69B8D" : "rgba(166, 155, 141, 0.5)",
            color: copied ? "#2C2C2C" : "#40572F",
            border: "1px solid rgba(115, 101, 88, 0.3)",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s",
            fontWeight: "500",
          }}
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
      <style>{`
        .copy-button:not(.copied):hover {
          background-color: rgba(166, 155, 141, 0.7) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};
