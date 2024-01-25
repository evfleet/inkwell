import { useRoomStore } from "@/stores/room";

export function Lobby() {
  const roomId = useRoomStore((state) => state.id);

  return (
    <div>
      <p>Lobby: {roomId}</p>
    </div>
  );
}
