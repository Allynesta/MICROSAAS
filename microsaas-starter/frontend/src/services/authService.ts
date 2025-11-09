import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

export const registerUser = async (username: string, email: string, password: string) => {
  const res = await axios.post(`${API_URL}/register`, { username, email, password });
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};
