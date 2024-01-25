import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  hydrated: boolean;
  username: string;
  setUsername: (name: string) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      hydrated: false,
      username: "",
      setUsername: (username) => set({ username }),
    }),
    {
      name: "username",
      partialize: (state) => ({ username: state.username }),
      onRehydrateStorage: (state) => {
        state.hydrated = true;
      },
    }
  )
);
