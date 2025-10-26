import React from "react";

export const StatsDisplay = ({ tokensUsed, cost }) => {
  if (!tokensUsed) return null;

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "4px",
        fontSize: "12px",
        color: "#666",
        display: "flex",
        gap: "20px",
      }}
    >
      <div>
        <strong>Tokens:</strong> {tokensUsed}
      </div>
      <div>
        <strong>Cost:</strong> ${cost}
      </div>
    </div>
  );
};
