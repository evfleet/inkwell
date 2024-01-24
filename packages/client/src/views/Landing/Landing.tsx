import { Dispatch, SetStateAction } from "react";

import { View } from "@/types";

type LandingProps = {
  setView: Dispatch<SetStateAction<View>>;
};

export function Landing({ setView }: LandingProps) {
  return (
    <div>
      <h1>Inkwell</h1>
      <button onClick={() => setView(View.CREATE)}>Create</button>
      <button onClick={() => setView(View.JOIN)}>Join</button>
    </div>
  );
}
