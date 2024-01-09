import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Landing } from "./pages/Landing";
import { CreateRoom } from "./pages/CreateRoom";
import { Room } from "./pages/Room";
import { Results } from "./pages/Results";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/room/create",
    element: <CreateRoom />,
  },
  {
    path: "/room/:roomId",
    element: <Room />,
  },
  {
    path: "/room/:roomId/results",
    element: <Results />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
