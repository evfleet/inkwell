import { useState, useEffect } from "react";

enum View {
  LANDING,
  CREATE,
  JOIN,
  LOBBY,
}

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<View>(View.LANDING);

  useEffect(() => {
    // parse room code and try joining
    const urlString = window.location.search;

    console.log(urlString);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
      return (
        <div>
          <p>Landing</p>
          <button onClick={() => setView(View.CREATE)}>Create</button>
        </div>
      );

    case View.CREATE:
      return (
        <div>
          <p>Create Room</p>
        </div>
      );

    default:
      return (
        <div>
          <p>Something went wrong!</p>
        </div>
      );
  }
}
