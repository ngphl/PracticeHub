import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const SummaryResult = ({ summary, loading }) => {
  if (loading) {
    return <p className="loading">⏳ Processing your text...</p>;
  }

  if (!summary) return null;
  return (
    <div className="result-box">
      <h3>Summary:</h3>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
    </div>
  );
};
