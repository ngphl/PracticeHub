export const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-box" role="alert" aria-live="assertive">
      <span style={{ fontSize: '20px', marginRight: '8px' }}>⚠️</span>
      <strong>Error: {message}</strong>
    </div>
  );
};
