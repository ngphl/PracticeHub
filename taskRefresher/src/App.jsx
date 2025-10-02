import { useState, useEffect } from "react";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/tasks";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

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
      <TaskForm
        text={text}
        setText={setText}
        handleSubmit={handleSubmit}
      ></TaskForm>
      <TaskList
        lists={visible}
        toggle={toggle}
        removeTask={removeTask}
      ></TaskList>
      <FilterBar setFilter={setFilter} filter={filter}></FilterBar>
    </main>
  );
}
