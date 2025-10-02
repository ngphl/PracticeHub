import { useState, useEffect } from "react";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/tasks";

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | open | done

  useEffect(() => {
    listTasks().then(setTasks).catch(console.error);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    try {
      const newTask = await createTask(text);
      setTasks((prev) => [newTask, ...prev]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  }

  async function toggle(task) {
    const updated = await updateTask(task.id, {
      title: task.title,
      done: task.done ? 0 : 1,
    });
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function removeTask(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
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
