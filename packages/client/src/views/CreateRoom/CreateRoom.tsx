import { ChangeEvent } from "react";
import { useShallow } from "zustand/react/shallow";

import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";

export function CreateRoom() {
  const [username, setUsername] = useUserStore(
    useShallow((state) => [state.username, state.setUsername])
  );

  const setView = useViewStore((state) => state.setView);

  function handleCreate() {
    setView("lobby");
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
      <button onClick={() => setView("landing")}>Back</button>
    </div>
  );
}
