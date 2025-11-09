// frontend/src/services/adminService.ts
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export const fetchUsers = async () => (await API.get("/api/admin/users")).data;
export const changeRole = async (id: string, role: string) => (await API.put(`/api/admin/users/${id}/role`, { role })).data;
export const toggleBan = async (id: string) => (await API.put(`/api/admin/users/${id}/ban`)).data;
export const fetchStats = async () => (await API.get("/api/admin/stats")).data;
export const fetchAnnouncements = async () => (await API.get("/api/admin/announcements")).data;
export const createAnnouncement = async (payload: { title: string; body: string }) => (await API.post("/api/admin/announcements", payload)).data;
export const fetchLogs = async (params?: Record<string, unknown>) => (await API.get("/api/admin/logs", { params })).data;
