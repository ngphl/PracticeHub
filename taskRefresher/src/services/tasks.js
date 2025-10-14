import { api } from "./api";

/**
 *
 * @description
 * * Get list of tasks
 */
export const listTasks = () => api("/api/tasks");

/**
 *
 * @param {string} title
 * @description
 * * Create new task with title
 */
export const createTask = (title) =>
  api("/api/tasks", { method: "POST", body: JSON.stringify({ title }) });

/**
 *
 * @param {integer} id
 * @param {{title: string, done: boolean}} payload  - New Task data
 * @description
 * * Update new data using payload
 */
export const updateTask = (id, payload) =>
  api(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(payload) });

/**
 *
 * @param {integer} id
 * @description
 * * Delete task at id
 */
export const deleteTask = (id) => api(`/api/tasks/${id}`, { method: "DELETE" });
