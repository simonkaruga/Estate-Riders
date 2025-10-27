// Handles switching between local JSON Server and hosted Render API
const LOCAL_BASE_URL = "http://localhost:3001/api";
const REMOTE_BASE_URL = "https://estate-riders-1.onrender.com/api"; //  Render URL

// Dynamically detect if local JSON server is running
export async function getBaseURL() {
  try {
    // JSON Server always exposes /users, so we can test that
    const res = await fetch(`${LOCAL_BASE_URL}/users`, { method: "GET" });
    if (res.ok) {
      console.log("Using local JSON Server:", LOCAL_BASE_URL);
      return LOCAL_BASE_URL;
    }
  } catch (err) {
    console.warn("Local JSON Server not reachable. Switching to remote API.");
  }
  console.log("Using remote API:", REMOTE_BASE_URL);
  return REMOTE_BASE_URL;
}

// Generic API helpers
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
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST ${endpoint} failed`);
  return res.json();
}

export async function apiPatch(endpoint, id, data) {
  const base = await getBaseURL();
  const res = await fetch(`${base}/${endpoint}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
