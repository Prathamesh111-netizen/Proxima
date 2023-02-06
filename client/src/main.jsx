import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import JoinMeeting from "./pages/Join/JoinMeeting.jsx";
import CreateMeeting from "./pages/CreateMeet/CreateMeeting.jsx";
import Meeting from "./pages/MeetingPage/Meeting";
import Lobby from "./pages/Lobby/Lobby";
import SchedueledMeetings from "./pages/scheduledMeetings/scheduledMeetings.jsx"
import { ToastContainer } from "react-toastify";

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
      <Route path="scheduled-meetings" element={<SchedueledMeetings />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="lobby" element={<Lobby />} />
      <Route path="" element={<LandingPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>
);
