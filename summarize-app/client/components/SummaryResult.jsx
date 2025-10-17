import React from "react";

export const SummaryResult = ({ summary, loading }) => {
  if (loading) {
    return <p className="loading">⏳ Processing your text...</p>;
  }

  if (!summary) return null;
  return (
    <div className="result-box">
      <h3>Summary:</h3>
      <p>{summary}</p>
    </div>
  );
};
