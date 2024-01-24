import { useState, useEffect } from "react";

import { View } from "@/types";
import { Landing } from "@/views/Landing";
import { CreateRoom } from "@/views/CreateRoom";
import { JoinRoom } from "@/views/JoinRoom";
import { Lobby } from "@/views/Lobby";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<View>(View.LANDING);

  useEffect(() => {
    // parse room code and try joining
    const urlString = window.location.search;

    if (urlString) {
      console.log(urlString);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  switch (view) {
    case View.LANDING:
      return <Landing setView={setView} />;

    case View.CREATE:
      return <CreateRoom setView={setView} />;

    case View.JOIN:
      return <JoinRoom setView={setView} />;

    case View.LOBBY:
      return <Lobby />;

    default:
      return (
        <div>
          <p>Something went wrong!</p>
        </div>
      );
  }
}
