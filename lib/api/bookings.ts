import api from "../axios";
import { ApiResponse, Booking, PaginatedResponse } from "@/types";

export const bookingsApi = {
  getMine: async (params?: { status?: string; page?: number }) => {
    const res = await api.get<PaginatedResponse<Booking>>("/api/bookings/my", { params });
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get<ApiResponse<Booking>>(`/api/bookings/${id}`);
    return res.data;
  },

  checkout: async (planId: string) => {
    const res = await api.post<{ success: boolean; sessionUrl: string }>(
      "/api/bookings/checkout",
      { planId }
    );
    return res.data;
  },

  cancel: async (id: string) => {
    const res = await api.patch<ApiResponse<Booking>>(`/api/bookings/${id}/cancel`);
    return res.data;
  },

  // Admin
  getAll: async (params?: { status?: string; page?: number }) => {
    const res = await api.get<PaginatedResponse<Booking>>("/api/bookings", { params });
    return res.data;
  },
};