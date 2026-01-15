import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // safe for future auth/cookies
  timeout: 15000,
});

// Nice error messages in console
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Request failed";
    console.error("API error:", msg);
    return Promise.reject(err);
  }
);

// helper to build absolute image URL from "/uploads/.."
export const imgUrl = (p) => {
  if (!p) return "";
  if (p.startsWith("http")) return p;
  return `${API_URL}${p}`;
};
