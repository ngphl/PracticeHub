import { useState, useEffect } from "react";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasks";

export function useTasks() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | open | done
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await listTasks();
        setTasks(data);
        console.log(data);
      } catch (err) {
        setError("Failed to load tasks");
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSubmit(e) {
    const title = text.trim();
    setPending(true);
    if (!title) return;
    try {
      const newTask = await createTask(text);
      setTasks((prev) => [newTask, ...prev]);
      setText("");
    } catch (err) {
      console.error(err);
    } finally {
      setPending(false);
    }
  }

  async function editTask(id, updateInfo) {
    const updated = await updateTask(id, {
      title: updateInfo.title,
      done: updateInfo.done ? 1 : 0,
    });
    if (!updated) return;
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

  return {
    tasks,
    text,
    filter,
    loading,
    error,
    pending,
    visible,
    setTasks,
    setText,
    setFilter,
    handleSubmit,
    editTask,
    removeTask,
  };
}
