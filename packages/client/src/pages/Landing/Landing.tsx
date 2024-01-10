import useWebSocket, { ReadyState } from "react-use-websocket";

export function Landing() {
  const { readyState, sendJsonMessage } = useWebSocket("ws://localhost:8081");

  const handleClickSendMessage = () => {
    sendJsonMessage("ping");
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <p>Landing</p>
      <span>The WebSocket is currently {connectionStatus}</span>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Ping'
      </button>
    </div>
  );
}
