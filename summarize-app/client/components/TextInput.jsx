export const TextInput = ({ value, onChange, disabled, placeholder, maxLength = 10000 }) => {
  const charCount = value.length;
  const percentUsed = (charCount / maxLength) * 100;

  let warningColor = "#A69B8D";
  let warningText = "";
  let fontWeight = "500";

  if (percentUsed >= 90) {
    warningColor = "#ef4444";
    warningText = ` (${maxLength - charCount} remaining)`;
    fontWeight = "600";
  } else if (percentUsed >= 75) {
    warningColor = "#f59e0b";
    warningText = ` (${maxLength - charCount} remaining)`;
    fontWeight = "600";
  }

  return (
    <div>
      <textarea
        className="text-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        aria-label="Text to summarize"
        aria-describedby="char-count"
      ></textarea>
      <div
        id="char-count"
        style={{
          marginTop: "8px",
          fontSize: "13px",
          color: warningColor,
          textAlign: "right",
          fontWeight: fontWeight,
          transition: "color 0.3s ease, font-weight 0.3s ease"
        }}
      >
        Your text is {charCount} characters{warningText}
      </div>
    </div>
  );
};
