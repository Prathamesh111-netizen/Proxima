//Landing Page
import React from "react";
import { Link } from "react-router-dom";
import demoGif from "../../assets/code.gif";
import Navbar from "../../components/Navbar";
import "./LandingPage.scss";
import feature1 from "../images/feature-icon-01.svg";
import feature2 from "../images/feature-icon-02.svg";
import feature3 from "../images/feature-icon-03.svg";
import feature4 from "../images/feature-icon-04.svg";
import feature5 from "../images/feature-icon-05.svg";
import feature6 from "../images/feature-icon-06.svg";
import Waves from "../../components/Waves/waves";

// import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  //   const { user } = useAuth();

  return (
    <>
      <Waves />
      <Navbar />
      <div className="lg:h-full grid grid-cols-1 lg:grid-cols-2">
        <div className="slogan ml-5 lg:mt-24">
          <h1 className="text-3xl">Code without worrying about privacy</h1>
          {/* <hr /> */}
          <h1 className="text-3xl">Meet without worrying about privacy</h1>
          {/* <hr /> */}
          <h1 className="text-3xl">
            Collaborate without worrying about privacy
          </h1>
          <h2 className="mt-4 subtitle">
            <hr />
            <p className="">
              Say hello to One click decentralised Live Code Collaboration
            </p>
          </h2>
          <div className="lg:mt-12">
            <a
              href="/create"
              className="text-xl bg-purple-600 inline-block text-center rounded m-1 p-5 ml-10"
            >
              Create A Meeting
            </a>
            <a
              href="/lobby"
              className="text-xl bg-purple-600 inline-block text-center rounded m-1 p-5 ml-10"
            >
              Join a Meeting
            </a>
          </div>
        </div>
        <div className="gif">
          <img src={demoGif} alt="gif" />
        </div>
      </div>
      <div className="Container-landing">
        <div className="features-inner section-inner has-bottom-divider">
          <div className="features-wrap">
            <div className="feature text-center is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <img src={feature1} alt="mirotalksfu-screen" />
                </div>
                <h4 className="feature-title text-sky-600 mt-24">
                  Screen Sharing
                </h4>
                <p className="text-sm mb-0">
                  Share your screen, application window, present your documents,
                  slides and more.
                </p>
              </div>
            </div>
            <div className="feature text-center is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <img src={feature2} alt="mirotalksfu-webcam" />
                </div>
                <h4 className="feature-title text-sky-600 mt-24">
                  WebCam Streaming
                </h4>
                <p className="text-sm mb-0">
                  Having the webcam on, allows participants to make a deeper
                  connection with you. Up to 4k resolution.
                </p>
              </div>
            </div>
            <div className="feature text-center is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <img src={feature3} alt="mirotalksfu-audio" />
                </div>
                <h4 className="feature-title text-sky-600 mt-24">
                  Audio Streaming
                </h4>
                <p className="text-sm mb-0">
                  Echo cancellation and noise suppression that make your audio
                  crystal clear.
                </p>
              </div>
            </div>
            <div className="feature text-center is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <img src={feature4} alt="mirotalksfu-chat" />
                </div>
                <h4 className="feature-title text-sky-600 mt-24">Chat</h4>
                <p className="text-sm mb-0">
                  Chat with others in meeting with integrated emoji picker to
                  show your feeling.
                </p>
              </div>
            </div>
            <div className="feature text-center is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <img src={feature5} alt="mirotalksfu-recording" />
                </div>
                <h4 className="feature-title text-sky-600 mt-24">
                  Recording meeting
                </h4>
                <p className="text-sm mb-0">
                  Record your Screen, Video, and Audio on Your browser Blob.
                  Save it for using it in the future or to share with others.
                </p>
              </div>
            </div>
            <div className="feature text-center is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <img src={feature6} alt="mirotalksfu-whiteboard" />
                </div>
                <h4 className="feature-title text-sky-600 mt-24">
                  Collaborative Whiteboard
                </h4>
                <p className="text-sm mb-0">
                  Advanced interactive whiteboard to draw and explain your
                  concepts to the other participants in the meeting.
                </p>
              </div>
            </div>
            <div className="feature text-center is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <img src={feature1} alt="mirotalksfu-filesharing" />
                </div>
                <h4 className="feature-title text-sky-600 mt-24">
                  File Sharing
                </h4>
                <p className="text-sm mb-0">
                  Share any types of files with all participants in the meeting.
                </p>
              </div>
            </div>
            <div className="feature text-center is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <img src={feature2} alt="mirotalksfu-privacy" />
                </div>
                <h4 className="feature-title text-sky-600 mt-24">
                  Total privacy
                </h4>
                <p className="text-sm mb-0">
                  Data stays between you and your participants. MiroTalk SFU
                  doesn't collect or share personal information.
                </p>
              </div>
            </div>
            <div className="feature text-center is-revealing">
              <div className="feature-inner">
                <div className="feature-icon">
                  <img src={feature3} alt="mirotalksfu-security" />
                </div>
                <h4 className="feature-title text-sky-600 mt-24">
                  Maximum security
                </h4>
                <p className="text-sm mb-0">
                  Thanks to WebRTC, all the media streams are encrypted using
                  Secure Real-time Transport Protocol (SRTP).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
