import React from "react";

export const TextInput = ({ value, onChange, disabled, placeholder }) => {
  return (
    <textarea
      className="text-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    ></textarea>
  );
};
