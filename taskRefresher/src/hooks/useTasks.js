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

  /**
   * @description
   * * Load Tasks at Re-render
   */
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

  /**
   *
   * @param {event} e
   * @description
   * * Handle Submit event for new task
   */
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

  /**
   *
   * @param {integer} id - Task ID
   * @param {{title: string, done: boolean}} updateInfo - updateInfo - New Task data
   * @description
   * * Handle when a task is edited
   */
  async function editTask(id, payload) {
    const updated = await updateTask(id, {
      title: payload.title,
      done: payload.done ? 1 : 0,
    });
    if (!updated) return;
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  /**
   *
   * @param {integer} id - Task ID
   * @description
   * * Handle task removal
   */
  async function removeTask(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  /**
   * @description
   * * Used for filtering Done/Open tasks
   */
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
