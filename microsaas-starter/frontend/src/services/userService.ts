import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProfile = async () => (await API.get("/api/users/profile")).data;
export const updateProfile = async (data: { username?: string; email?: string }) =>
  (await API.put("/api/users/profile", data)).data;
