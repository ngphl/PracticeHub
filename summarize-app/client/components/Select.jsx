import React from "react";

export const Select = ({ label, value, onChange, options, disabled }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label
        style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "8px",
          fontSize: "14px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
