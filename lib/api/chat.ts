import api from "../axios";
import { ApiResponse, ChatMessage, ChatSession } from "@/types";

type SendMessageResponse = {
  sessionId: string;
  message: string;
  tokensUsed: number;
};

type HistoryResponse = {
  sessionId: string;
  data: ChatMessage[];
};

type SessionsResponse = {
  total: number;
  data: ChatSession[];
};

export const chatApi = {
  sendMessage: async (
    message: string,
    history: { role: string; content: string }[],
    sessionId?: string
  ) => {
    const res = await api.post<SendMessageResponse>("/api/chat/message", {
      message,
      history,
      sessionId,
    });
    return res.data;
  },

  getSessions: async () => {
    const res = await api.get<SessionsResponse>("/api/chat/sessions");
    return res.data;
  },

  getSessionHistory: async (sessionId: string) => {
    const res = await api.get<HistoryResponse>(`/api/chat/sessions/${sessionId}`);
    return res.data;
  },

  deleteSession: async (sessionId: string) => {
    const res = await api.delete(`/api/chat/sessions/${sessionId}`);
    return res.data;
  },
};