import { useState } from "react";

import styles from "./Lobby.module.css";
import { useRoomStore } from "@/stores/room";
import { Canvas } from "./components/Canvas";
import { Chat } from "./components/Chat";
import { Invite } from "./components/Invite";
import { Players } from "./components/Players";
import { Settings } from "./components/Settings";

export function Lobby() {
  const [isPlaying, setIsPlaying] = useState(false);
  const roomId = useRoomStore((state) => state.id);

  function handleStart() {
    setIsPlaying(true);
  }

  return (
    <div className={styles.wrapper}>
      <p>Lobby: {roomId}</p>

      <div className={styles.container}>
        <Players />
        {isPlaying ? <Canvas className={styles.canvas} /> : <Settings />}
        <Chat />
      </div>

      <button onClick={handleStart}>Start</button>
      <Invite roomId={roomId} />
    </div>
  );
}
