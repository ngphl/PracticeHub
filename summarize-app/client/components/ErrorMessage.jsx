import React from "react";

export const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-box">
      <strong>Error:{message}</strong>
    </div>
  );
};
