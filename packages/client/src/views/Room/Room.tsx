import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { socket } from "@/config/socket";
import styles from "./Room.module.css";
import { Canvas } from "./components/Canvas";
import { Chat } from "./components/Chat";
import { Lobby } from "./components/Lobby";
import { Invite } from "./components/Invite";
import { Settings } from "./components/Settings";

export function Room() {
  const { roomId } = useParams();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  if (!roomId) {
    return (
      <div>
        <p>You need to pass a roomId</p>
      </div>
    );
  }

  return (
    <div>
      <p>Room: {roomId}</p>
      <p>Connected: {isConnected ? "true" : "false"}</p>
      <div className={styles.container}>
        <Lobby />
        <div>
          <Settings />
          <Canvas />
        </div>

        <Chat />
      </div>

      <Invite code={roomId} />
    </div>
  );
}
