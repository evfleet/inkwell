import { ChangeEvent, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { socket } from "@/config/socket";
import { useRoomStore } from "@/stores/room";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";

export function CreateRoom() {
  const setRoomId = useRoomStore((state) => state.setRoomId);
  const setView = useViewStore((state) => state.setView);
  const [username, setUsername] = useUserStore(
    useShallow((state) => [state.username, state.setUsername])
  );

  function handleCreate() {
    socket.connect();
    socket.emit("room:create", {
      payload: {
        username,
      },
    });
  }

  function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
    setUsername(evt.target.value);
  }

  useEffect(() => {
    socket.on("room:create_success", (msg) => {
      setRoomId(msg.payload.roomId);
      setView("lobby");
    });

    socket.on("room:create_fail", () => {
      console.log("something went wrong");
    });
  }, [setRoomId, setView]);

  return (
    <div>
      <p>Create</p>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleNameChange}
      />
      <button onClick={handleCreate}>Create</button>
      <button onClick={() => setView("landing")}>Back</button>
    </div>
  );
}
