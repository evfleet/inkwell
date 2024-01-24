import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useShallow } from "zustand/react/shallow";

import { View } from "@/types";
import { useUserStore } from "@/stores/user";

type JoinRoomProps = {
  setView: Dispatch<SetStateAction<View>>;
};

export function JoinRoom({ setView }: JoinRoomProps) {
  const [username, setUsername] = useUserStore(
    useShallow((state) => [state.username, state.setUsername])
  );

  function handleJoin() {
    setView(View.LOBBY);
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
      <button onClick={() => setView(View.LANDING)}>Back</button>
    </div>
  );
}
