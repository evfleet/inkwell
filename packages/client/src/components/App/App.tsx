import { useState, useEffect } from "react";

import { useUserStore } from "@/stores/user";
import { useViewStore } from "@/stores/view";
import { Landing } from "@/views/Landing";
import { CreateRoom } from "@/views/CreateRoom";
import { JoinRoom } from "@/views/JoinRoom";
import { Lobby } from "@/views/Lobby";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const view = useViewStore((state) => state.view);
  const hydrated = useUserStore((state) => state.hydrated);

  useEffect(() => {
    // parse room code and try joining
    const urlString = window.location.search;

    if (urlString) {
      console.log(urlString);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      setIsLoading(false);
    }
  }, [hydrated]);

  if (isLoading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  switch (view) {
    case "landing":
      return <Landing />;

    case "create":
      return <CreateRoom />;

    case "join":
      return <JoinRoom />;

    case "lobby":
      return <Lobby />;

    default:
      return (
        <div>
          <p>Something went wrong!</p>
        </div>
      );
  }
}
