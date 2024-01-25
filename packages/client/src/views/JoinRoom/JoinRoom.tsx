import { ChangeEvent } from "react";
import { useShallow } from "zustand/react/shallow";

import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";

export function JoinRoom() {
  const [username, setUsername] = useUserStore(
    useShallow((state) => [state.username, state.setUsername])
  );

  const setView = useViewStore((state) => state.setView);

  function handleJoin() {
    setView("lobby");
  }

  function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
    setUsername(evt.target.value);
  }

  return (
    <div>
      <p>Join Room</p>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleNameChange}
      />
      <input type="text" name="code" />
      <button onClick={handleJoin}>Join</button>
      <button onClick={() => setView("landing")}>Back</button>
    </div>
  );
}
