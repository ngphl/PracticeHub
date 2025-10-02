export default function FilterBar({ setFilter, filter }) {
  return (
    <div style={{ margin: "1rem 0", display: "flex", gap: 8 }}>
      {["all", "open", "done"].map((f) => (
        <button key={f} onClick={() => setFilter(f)} disabled={filter === f}>
          {f}
        </button>
      ))}
    </div>
  );
}
