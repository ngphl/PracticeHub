import { api } from "./api";

export const listTasks = () => api("/api/tasks");

export const createTask = (title) =>
  api("/api/tasks", { method: "POST", body: JSON.stringify({ title }) });

export const updateTask = (id, payload) =>
  api(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(payload) });

export const deleteTask = (id) => api(`/api/tasks/${id}`, { method: "DELETE" });
