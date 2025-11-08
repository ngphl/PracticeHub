import React from "react";

export const StatsDisplay = ({ tokensUsed, cost }) => {
  if (!tokensUsed) return null;

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "16px 20px",
        background: "rgba(20, 27, 58, 0.4)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        fontSize: "13px",
        color: "#94a3b8",
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      <div>
        <strong style={{ color: "#60a5fa" }}>Tokens:</strong> {tokensUsed}
      </div>
      <div>
        <strong style={{ color: "#60a5fa" }}>Cost:</strong> ${cost}
      </div>
    </div>
  );
};
