import React from "react";
import Navbar from "../../components/Navbar";
import Webcam from "react-webcam";
import Waves from "../../components/Waves/waves";

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
          Enable Mic
        </button>
      )}
    </Webcam>
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.meetingId.value);
    window.location.href = `/meeting/${e.target.meetingId.value}`;
  };
  const [isLoggedin, setIsLoggedin] = React.useState(false);

  React.useEffect(() => {
    // console.log(import.meta.env);
    if (
      localStorage.getItem("defaultAccount") &&
      window.ethereum.selectedAddress
    ) {
      setIsLoggedin(true);

      // console.log(sortedMeetings);
    } else {
      setIsLoggedin(false);
    }
  }, []);
  return (
    <>
      <Waves />
      <Navbar />
      {isLoggedin ? (
        <div>
          <div className="flex flex-col items-center justify-center pt-10 pb-10">
            <WebcamCapture />
          </div>
          {/**Lobby page for meetings React tailwind */}
          <form id="form" type="submit" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center m-3 ">
              <input
                type="text"
                placeholder=" Enter Meeting ID "
                className="bg-white border border-lg border-purple-600"
                name="meetingId"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-1/2">
              <button
                className="px-4 py-2 text-white bg-purple-600 rounded-lg"
                type="submit"
              >
                Start Meeting
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="container">You are not logged in</div>
      )}
    </>
  );
}
