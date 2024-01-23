import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function CreateRoom() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "Evan",
      capacity: 6,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    const res = await fetch("http://localhost:8081/room/create", {
      method: "POST",
      body: JSON.stringify({
        username: formData.username,
        capacity: formData.capacity,
      }),
    });
    const data = await res.json();

    navigate(`/room/${data.roomId}`);
  });

  return (
    <div>
      <p>Create Room</p>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input type="text" {...register("username")} />
        </div>

        <div>
          <label>Players</label>
          <input type="number" {...register("capacity")} />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
