import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function JoinRoom() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    navigate(`/room/${data.id}`);
  });

  return (
    <div>
      <p>Join Room</p>

      <form onSubmit={onSubmit}>
        <div>
          <label>Game ID</label>
          <input type="text" {...register("id")} />
        </div>

        <div>
          <label>Password</label>
          <input type="text" {...register("password")} />
        </div>

        <button type="submit">Join</button>
      </form>
    </div>
  );
}
