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
      <div>Your text is {charCount} characters</div>
    </div>
  );
};
