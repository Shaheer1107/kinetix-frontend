import api from "../axios";
import { ApiResponse, PaginatedResponse, Plan } from "@/types";

export const plansApi = {
  getAll: async (params?: {
    category?: string;
    level?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const res = await api.get<PaginatedResponse<Plan>>("/api/plans", { params });
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get<ApiResponse<Plan>>(`/api/plans/${id}`);
    return res.data;
  },

  // Admin
  getAllAdmin: async () => {
    const res = await api.get<PaginatedResponse<Plan>>("/api/plans/admin/all");
    return res.data;
  },

  create: async (data: Partial<Plan>) => {
    const res = await api.post<ApiResponse<Plan>>("/api/plans", data);
    return res.data;
  },

  update: async (id: string, data: Partial<Plan>) => {
    const res = await api.put<ApiResponse<Plan>>(`/api/plans/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/api/plans/${id}`);
    return res.data;
  },

  togglePublish: async (id: string) => {
    const res = await api.patch<ApiResponse<Plan>>(`/api/plans/${id}/publish`);
    return res.data;
  },
};