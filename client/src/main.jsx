import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JoinMeeting from "./pages/JoinMeeting";
import CreateMeeting from "./pages/CreateMeeting";
import Meeting from "./pages/Meeting";
import Landing from "./pages/Landing";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="join" element={<JoinMeeting />} />
      <Route path="create" element={<CreateMeeting />} />
      <Route
        path="meeting/:id"
        element={<Meeting />}
        errorElement={<LandingPage />}
      />
      <Route path="my-meetings" element={<CreateMeeting />} />
      <Route path="landing" element={<Landing />} />
      <Route path="" element={<LandingPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
