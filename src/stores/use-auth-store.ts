import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      login: (userId: string | null) => set({ userId: userId }),
      logout: () => set({ userId: null }),
    }),
    {
      name: "user-id-store", // localStorage key 이름
    },
  ),
);

export default useAuthStore;
