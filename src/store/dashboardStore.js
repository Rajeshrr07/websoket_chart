import { create } from "zustand";
import { fetchMetrics } from "../services/mockAPI";

export const useDashboardStore = create((set) => ({
  metrics: [],
  isLoading: true,
  error: null,
  fetchMetrics: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await fetchMetrics();
      set({ metrics: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
