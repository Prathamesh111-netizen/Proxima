//Landing page for a Meetings web app in daisy ui tailwind css

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const JoinMeeting = () => {
    navigate("/join");
  };

  const CreateMeeting = () => {
    navigate("/create");
  };

  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="/connectwallet.png" alt="Connect Wallet" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Welcome to Meetings</h2>
          <p className="card-subtitle">
            A decentralized video conferencing app
          </p>
          <p className="card-text">
            Meetings is a decentralized video conferencing app built on
            Ethereum. It is a peer-to-peer video conferencing app where users
            can create meetings for free and invite other users to join.
          </p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={JoinMeeting}>
              Join Meeting
            </button>
            <button className="btn btn-primary" onClick={CreateMeeting}>
              Create Meeting
            </button>
          </div>
        </div>
      </div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="/connectwallet.png" alt="Connect Wallet" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">How to use Meetings</h2>
          <p className="card-subtitle">
            A decentralized video conferencing app
          </p>
          <p className="card-text">
            Meetings is a decentralized video conferencing app built on
            Ethereum. It is a peer-to-peer video conferencing app where users
            can create meetings for free and invite other users to join.
          </p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={JoinMeeting}>
              Join Meeting
            </button>
            <button className="btn btn-primary" onClick={CreateMeeting}>
              Create Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
