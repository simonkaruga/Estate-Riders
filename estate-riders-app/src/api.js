// Handles switching between local JSON Server and hosted Render API
const LOCAL_BASE_URL = "http://localhost:3001";
const REMOTE_BASE_URL = "https://your-render-app.onrender.com"; // Replace with your Render link

// Check if local JSON server is running
export async function getBaseURL() {
  try {
    const res = await fetch(`${LOCAL_BASE_URL}/health`);
    if (res.ok) return LOCAL_BASE_URL;
  } catch (_) {}
  // fallback to remote
  return REMOTE_BASE_URL;
}

export async function apiGet(endpoint) {
  const base = await getBaseURL();
  const res = await fetch(`${base}/${endpoint}`);
  if (!res.ok) throw new Error(`GET ${endpoint} failed`);
  return res.json();
}

export async function apiPost(endpoint, data) {
  const base = await getBaseURL();
  const res = await fetch(`${base}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`POST ${endpoint} failed`);
  return res.json();
}

export async function apiPatch(endpoint, id, data) {
  const base = await getBaseURL();
  const res = await fetch(`${base}/${endpoint}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`PATCH ${endpoint} failed`);
  return res.json();
}

export async function apiDelete(endpoint, id) {
  const base = await getBaseURL();
  const res = await fetch(`${base}/${endpoint}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`DELETE ${endpoint} failed`);
  return true;
}
