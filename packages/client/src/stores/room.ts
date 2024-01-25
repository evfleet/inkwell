import { create } from "zustand";

type RoomState = {
  id: string;
  setRoomId: (id: string) => void;
};

export const useRoomStore = create<RoomState>((set) => ({
  id: "",
  setRoomId: (id) => set({ id }),
}));
