import React from "react";

export const TextInput = ({ value, onChange, disabled, placeholder }) => {
  const charCount = value.length;

  return (
    <div>
      <textarea
        className="text-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      ></textarea>
      <div style={{
        marginTop: "8px",
        fontSize: "13px",
        color: "#64748b",
        textAlign: "right"
      }}>
        Your text is {charCount} characters
      </div>
    </div>
  );
};
