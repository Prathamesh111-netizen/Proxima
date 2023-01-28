import React from "react";
import { useNavigate } from "react-router-dom";
import {v4 as uuidv4} from "uuid"

export default function CreateMeeting() {
  const navigate = useNavigate();
  const JoinMeeting = () => {
    navigate(`/meeting/1234`);
    // navigate(`/meeting/${uuidv4()}`);
  };

  return (
    <div>
      <button className="btn btn-accent" onClick={JoinMeeting}>Join Meeting</button>
    </div>
  );
}
