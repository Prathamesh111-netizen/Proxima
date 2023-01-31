import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage";
import Dashboard from "./pages/Dashboard";
import JoinMeeting from "./pages/Join/JoinMeeting";
import CreateMeeting from "./pages/CreateMeeting";
import Meeting from "./pages/Meeting";

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
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="" element={<LandingPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
