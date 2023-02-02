import React from "react";
import Navbar from "../../components/Navbar";
import Webcam from "react-webcam";
import Waves from "../../components/Waves/waves"

export default function Lobby() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const WebcamCapture = () => (
    <Webcam
      audio={true}
      height={200}
      screenshotFormat="image/jpeg"
      width={500}
      videoConstraints={videoConstraints}
    >
      {({ enableMic }) => (
        <button
          onClick={() => {
            // console.log(imageSrc);
          }}
        >
          enableMic
        </button>
      )}
    </Webcam>
  );
  return (
    <>
    <Waves/>
      <Navbar />
      <div>
        <div className="flex flex-col items-center justify-center pt-10 pb-10">
          <WebcamCapture />
        </div>
        {/**Lobby page for meetings React tailwind */}
        <div className="flex flex-col items-center justify-center h-max">
          <div className="flex flex-col items-center bg-purple-300 justify-center w-4/5 h-1/2 bg-white rounded-lg shadow-xl">
            <div className="flex flex-col items-center justify-center w-full h-1/2">
              <h1 className="text-2xl font-bold">Meeting Title</h1>
              <p className="text-black">Meeting ID: 1234567890</p>
            </div>

            <div className="flex flex-col items-center justify-center w-1/2">
              <h1 className="text-xl font-bold">Host</h1>
              <p className="text-black">Hosts Name</p>
            </div>
            <div className="flex flex-col items-center justify-center w-1/2">
              <h1 className="text-xl font-bold">Participants</h1>
              <p className="text-black">Participant Name</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-1/2">
              <button className="px-4 py-2 text-white bg-purple-600 rounded-lg">
                Start Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
