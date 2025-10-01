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
      setTasks(data);
    }
    loadTasks();
  }, []);

  return (
    <main
      style={{ maxWidth: 540, margin: "2rem auto", fontFamily: "system-ui" }}
    >
      <h1>Task Tracker</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        style={{ display: "flex", gap: 8 }}
      >
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="New Task..."
        />
        <button>Add</button>
      </form>
    </main>
  );
}
