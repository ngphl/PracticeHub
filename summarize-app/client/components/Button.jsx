import React from "react";

export const Button = ({
  onClick,
  disabled = false,
  loading = false,
  children,
  variant = "primary",
}) => {
  const className = variant === "primary" ? "summarize-btn" : "secondary-btn";

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};
