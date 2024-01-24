import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useShallow } from "zustand/react/shallow";

import { View } from "@/types";
import { useUserStore } from "@/stores/user";

type CreateRoomProps = {
  setView: Dispatch<SetStateAction<View>>;
};

export function CreateRoom({ setView }: CreateRoomProps) {
  const [username, setUsername] = useUserStore(
    useShallow((state) => [state.username, state.setUsername])
  );

  function handleCreate() {
    setView(View.LOBBY);
  }

  function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
    setUsername(evt.target.value);
  }

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
      <button onClick={() => setView(View.LANDING)}>Back</button>
    </div>
  );
}
