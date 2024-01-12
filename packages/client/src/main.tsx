import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Landing } from "./pages/Landing";
import { Room } from "./pages/Room";
import { JoinRoom } from "./pages/JoinRoom";
import { CreateRoom } from "./pages/CreateRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/room/join",
    element: <JoinRoom />,
  },
  {
    path: "/room/create",
    element: <CreateRoom />,
  },
  {
    path: "/room/:roomId",
    element: <Room />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
