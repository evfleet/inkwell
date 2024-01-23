import { Link } from "react-router-dom";

export function Landing() {
  return (
    <div>
      <p>Landing</p>

      <Link to="/room/join">Join</Link>
      <Link to="/room/create">Create</Link>
    </div>
  );
}
