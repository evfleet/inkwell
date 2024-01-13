import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function CreateRoom() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    const res = await fetch("http://localhost:8081/room/create", {
      method: "POST",
      body: JSON.stringify({
        players: formData.player_count,
      }),
    });
    const data = await res.json();

    navigate(`/room/${data.id}`);
  });

  return (
    <div>
      <p>Create Room</p>
      <form onSubmit={onSubmit}>
        <div>
          <label>Players</label>
          <input type="number" {...register("player_count")} />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
