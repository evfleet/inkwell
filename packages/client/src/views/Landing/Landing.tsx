import { useViewStore } from "@/stores/view";

export function Landing() {
  const setView = useViewStore((state) => state.setView);

  return (
    <div>
      <h1>Inkwell</h1>
      <button onClick={() => setView("create")}>Create</button>
      <button onClick={() => setView("join")}>Join</button>
    </div>
  );
}
