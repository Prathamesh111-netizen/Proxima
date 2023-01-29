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
      <div className="">
        <div className="slogan">
          {/*h1 with large font size  and h3 with small font size*/}
          <h1 className="text-4xl">Code without worrying about privacy</h1>
          <h1 className="text-4xl">Meet without worrying about privacy</h1>
          <h1 className="text-4xl">
            Collaborate without worrying about privacy
          </h1>
          <h3 className="subtitle">
            Say hello to One click token generated Live Code Collaboration
          </h3>
          <a
            href="/create"
            className="text-xl bg-purple-600 inline-block text-center rounded m-1 p-5 sm:w-2/5 md:w-1/5 lg:w-1/5 xl:w-1/5"
          >
            Create A Meeting
          </a>
          <a
            href="/join"
            className="bg-purple-600 inline-block rounded m-1 p-5 w-1/5"
          >
            Join a Meeting
          </a>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
