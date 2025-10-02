export default function TaskItem({ t, toggle, removeTask }) {
  return (
    <li
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        padding: "6px 0",
      }}
    >
      <input type="checkbox" checked={!!t.done} onChange={() => toggle(t)} />
      <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
        {t.title}
      </span>
      <button
        type="button"
        style={{ marginLeft: "auto" }}
        onClick={() => removeTask(t.id)}
      >
        🗑
      </button>
    </li>
  );
}
