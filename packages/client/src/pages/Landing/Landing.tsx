import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  async function handleCreateRoom() {
    const res = await fetch("http://localhost:8081/room/create", {
      method: "POST",
    });
    const data = await res.json();

    navigate(`/room/${data.roomId}`);

    console.log("data", data);
  }

  return (
    <div>
      <p>Landing</p>

      <button onClick={handleCreateRoom}>Create</button>

      <button>Join</button>
    </div>
  );
}
