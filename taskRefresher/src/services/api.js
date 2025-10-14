const BASE = import.meta.env.VITE_API_URL;

/**
 *
 * @param {string} path - URL - e.g `/api/tasks/${id}`
 * @param {{json}} options - Data - e.g { method: "PUT", body: JSON.stringify(payload) }
 * @description
 * * API function to send request
 */
export async function api(path, options = {}) {
  // Send respond
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  // If respond fail
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
}
