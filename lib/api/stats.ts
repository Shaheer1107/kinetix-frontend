import api from "../axios";
import { DashboardStats } from "@/types";

type StatsResponse = {
  success: boolean;
  data: DashboardStats;
};

export const statsApi = {
  getDashboard: async () => {
    const res = await api.get<StatsResponse>("/api/stats");
    return res.data;
  },
};