import { listTasks } from "../services/tasks";

export async function tasksLoader() {
  try {
    const tasks = await listTasks();
    return tasks;
  } catch (e) {
    throw new Response("Failed to load tasks", { status: 500 });
  }
}
