import api from "../axios";
import { ApiResponse, User } from "@/types";

type AuthResponse = {
  token: string;
  user: User;
};

export const authApi = {
  register: async (name: string, email: string, password: string) => {
    const res = await api.post<ApiResponse<AuthResponse>>("/api/auth/register", {
      name,
      email,
      password,
    });
    return res.data;
  },

  login: async (email: string, password: string) => {
    const res = await api.post<ApiResponse<AuthResponse>>("/api/auth/login", {
      email,
      password,
    });
    return res.data;
  },

  getMe: async () => {
    const res = await api.get<ApiResponse<User>>("/api/auth/me");
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/api/auth/logout");
    return res.data;
  },
};