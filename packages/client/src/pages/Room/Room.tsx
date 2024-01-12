import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

export function Room() {
  const { roomId } = useParams();
  const { sendJsonMessage } = useWebSocket("ws://localhost:8081");

  useEffect(() => {
    console.log("mounted room");

    sendJsonMessage({});

    return () => {
      console.log("unmount room");
    };
  });

  return (
    <div>
      <p>Room: {roomId}</p>
    </div>
  );
}
