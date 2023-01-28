import React from "react";
import { useNavigate } from "react-router-dom";

export default function CreateMeeting() {
  const navigate = useNavigate();
  const JoinMeeting = () => {
    navigate("/meeting/1");
  };

  return (
    <div>
      <button className="btn btn-accent" onClick={JoinMeeting}>Create a new Meeting & Join</button>
    </div>
  );
}
