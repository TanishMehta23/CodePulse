const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Ensure no trailing slash so ${API_BASE_URL}/api/... works cleanly
const API_BASE_URL = rawUrl.replace(/\/+$/, "");

export default API_BASE_URL;

