import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

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

  return (
    <div>
      <p>Room: {roomId}</p>
    </div>
  );
}
