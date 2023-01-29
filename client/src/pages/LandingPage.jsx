//Landing Page
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  //   const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Landing Page</h1>
        <nav>
          <Link to="/join">Join Meeting</Link>
          <Link to="/create">Create Meeting</Link>

          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        </nav>
      </div>
    </>
  );
};

export default LandingPage;
