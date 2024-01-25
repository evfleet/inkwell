import { create } from "zustand";

type View = "landing" | "create" | "join" | "lobby";

type ViewState = {
  view: View;
  setView: (view: View) => void;
};

export const useViewStore = create<ViewState>((set) => ({
  view: "create",
  setView: (view) => set({ view }),
}));
