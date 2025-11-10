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
      {loading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{ animation: 'spin 1s linear infinite' }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="48"
              strokeDashoffset="12"
              opacity="0.25"
            />
            <path
              d="M12 2 A 10 10 0 0 1 22 12"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          Processing...
        </span>
      ) : children}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};
