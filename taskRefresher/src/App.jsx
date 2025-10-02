import { useState, useEffect } from "react";
const API = "http://localhost:3000/api/tasks";

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | open | done

  useEffect(() => {
    async function loadTasks() {
      const res = await fetch(API);
      const data = await res.json();
      console.log("Task Loaded");
      setTasks(data);
    }
    loadTasks();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;

    const temp = { id: Date.now(), title, done: 0, optimistic: true };

    setTasks((prev) => [temp, ...prev]);
    setText("");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const saved = await res.json();
      setTasks((prev) => [saved, ...prev.filter((t) => t.id !== temp.id)]);
    } catch {
      // Rollback
      setTasks((prev) => prev.filter((t) => t.id !== temp.id));
    }
  }

  async function toggle(task) {
    const next = task.done ? 0 : 1;
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, done: next } : t))
    );
    try {
      await fetch(`${API}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task.title, done: next }),
      });
    } catch {
      //rollback
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, done: task.done } : t))
      );
    }
  }

  async function removeTask(id) {
    const snapshot = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      const res = await fetch(`${API}/$id`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete Failed");
    } catch {
      setTasks(snapshot);
    }
  }

  const visible =
    filter === "done"
      ? tasks.filter((t) => t.done)
      : filter === "open"
      ? tasks.filter((t) => !t.done)
      : tasks;

  return (
    <main
      style={{ maxWidth: 540, margin: "2rem auto", fontFamily: "system-ui" }}
    >
      <h1>Task Tracker</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="New Task..."
        />
        <button>Add</button>
      </form>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {visible.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: "6px 0",
            }}
          >
            <input
              type="checkbox"
              checked={!!t.done}
              onChange={() => toggle(t)}
            />
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
              {t.title}
            </span>
            <button
              style={{ marginLeft: "auto" }}
              onClick={() => removeTask(t.id)}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
      <div style={{ margin: "1rem 0", display: "flex", gap: 8 }}>
        {["all", "open", "done"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} disabled={filter === f}>
            {f}
          </button>
        ))}
      </div>
    </main>
  );
}
