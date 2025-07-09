import { create } from "zustand";

type AuthState = {
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  login: (userId: string | null) => set({ userId: userId }),
  logout: () => set({ userId: null }),
}));
