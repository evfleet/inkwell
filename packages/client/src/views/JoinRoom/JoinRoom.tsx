import { ChangeEvent, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { socket } from "@/config/socket";
import { useRoomStore } from "@/stores/room";
import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";

export function JoinRoom() {
  const [code, setCode] = useState<string>("");
  const setRoomId = useRoomStore((state) => state.setRoomId);
  const setView = useViewStore((state) => state.setView);
  const [username, setUsername] = useUserStore(
    useShallow((state) => [state.username, state.setUsername])
  );

  function handleJoin() {
    socket.connect();
    socket.emit("room:join", {
      payload: {
        code,
        username,
      },
    });
  }

  function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
    setUsername(evt.target.value);
  }

  function handleCodeChange(evt: ChangeEvent<HTMLInputElement>) {
    setCode(evt.target.value);
  }

  useEffect(() => {
    socket.on("room:join_success", (msg) => {
      setRoomId(msg.payload.roomId);
      setView("lobby");
    });

    socket.on("room:join_fail", () => {});
  }, []);

  return (
    <div>
      <p>Join Room</p>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleNameChange}
      />
      <input type="text" name="code" value={code} onChange={handleCodeChange} />
      <button onClick={handleJoin}>Join</button>
      <button onClick={() => setView("landing")}>Back</button>
    </div>
  );
}
