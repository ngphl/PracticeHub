import React, { useState } from "react";
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
    return <p className="loading">⏳ Processing your text...</p>;
  }

  if (!summary) return null;
  return (
    <div className="result-box">
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
            <span style={{ fontSize: "12px", color: "#a0aec0" }}>
              (streaming...)
            </span>
          )}
        </h3>
        <button
          onClick={handleCopy}
          style={{
            padding: "6px 12px",
            fontSize: "12px",
            backgroundColor: copied ? "#4CAF50" : "#4a5568",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!copied) e.target.style.backgroundColor = "#2d3748";
          }}
          onMouseLeave={(e) => {
            if (!copied) e.target.style.backgroundColor = "#4a5568";
          }}
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
    </div>
  );
};
