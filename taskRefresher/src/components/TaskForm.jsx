export default function TaskForm({ text, setText, handleSubmit, pending }) {
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="New Task..."
      />
      <button disabled={pending}>Add</button>
    </form>
  );
}
