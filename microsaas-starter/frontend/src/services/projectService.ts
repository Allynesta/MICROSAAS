import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProjects = async () => (await API.get("/api/projects")).data;
export const createProject = async (data: { title: string; description: string }) =>
  (await API.post("/api/projects", data)).data;
export const updateProject = async (id: string, data: { title: string; description: string }) =>
  (await API.put(`/api/projects/${id}`, data)).data;
export const deleteProject = async (id: string) =>
  (await API.delete(`/api/projects/${id}`)).data;
