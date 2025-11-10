export const StatsDisplay = ({ tokensUsed, cost }) => {
  if (!tokensUsed) return null;

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "16px 20px",
        background: "rgba(43, 18, 76, 0.3)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        fontSize: "13px",
        color: "#DFB6B2",
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
      }}
    >
      <div>
        <strong style={{ color: "#DFB6B2" }}>Tokens:</strong> {tokensUsed}
      </div>
      <div>
        <strong style={{ color: "#DFB6B2" }}>Cost:</strong> ${cost}
      </div>
    </div>
  );
};
