import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface Blog {
  _id?: string;
  title: string;
  content: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchUserBlogs = async () => {
  const res = await API.get("/api/blogs");
  return res.data;
};



export const getBlogs = async () => {
  const res = await API.get("/api/blogs");
  return res.data;
};

export const getBlogById = async (id: string) => {
  const res = await API.get(`/api/blogs/${id}`);
  return res.data;
};

export const createBlog = async (data: Blog) => {
  const res = await API.post("/api/blogs", data);
  return res.data;
};

export const updateBlog = async (id: string, data: Blog) => {
  const res = await API.put(`/api/blogs/${id}`, data);
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await API.delete(`/api/blogs/${id}`);
  return res.data;
};