import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

import styles from "./Room.module.css";
import { Canvas } from "./components/Canvas";
import { Chat } from "./components/Chat";
import { Lobby } from "./components/Lobby";
import { Invite } from "./components/Invite";
import { Settings } from "./components/Settings";

export function Room() {
  const { roomId } = useParams();
  const { sendJsonMessage } = useWebSocket("ws://localhost:8081");

  useEffect(() => {
    sendJsonMessage({
      type: "join",
      params: {
        roomId,
      },
    });

    return () => {
      sendJsonMessage({
        type: "leave",
        params: {
          roomId,
        },
      });
    };
  }, [roomId, sendJsonMessage]);

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
