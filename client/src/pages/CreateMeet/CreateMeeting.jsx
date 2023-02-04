import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar.jsx";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Schedule Meeting Page in React tailwind and daisy
import Waves from "../../components/Waves/waves";

export default function CreateMeeting() {
  const navigate = useNavigate();
  const submit = () => {
    console.log("Meeting Scheduled");
    toast.success("Meeting Scheduled Successfully");
    // navigate("/dashboard");
  };

  useEffect(() => {
    const defaultAccount = JSON.parse(localStorage.getItem("defaultAccount"));
    if (defaultAccount) {
      setIsLoggedin(true);
      setHostWalletAddress(defaultAccount)
    }
  }, []);

  return (
    <div>
      <Waves />
      <NavBar />
      <div className="bg-gray-50 flex flex-col sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">
            Schedule a Meeting
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Meeting Title
              </label>
              <input
                type="text"
                className="border bg-white rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Date & Time
              </label>
              <input
                type="datetime-local"
                className="border bg-purple-400 text-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Meeting Code
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                placeholder={uuidv4()}
                required
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Enter Host Wallet Address *
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                placeholder="Enter Host Wallet Address"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Description
              </label>
              <input
                type="text"
                className="border bg-white rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
            </div>
            <div className="flex w-full items-center justify-center bg-gray-100 gap-2">
              <div className="flex items-center justify-center py-4 bg-gray-100 rounded-b-lg">
                <button
                  className="bg-purple-600 text-white px-4 py-3 rounded-xl font-medium text-sm"
                  onClick={submit}
                >
                  Schedule
                </button>
              </div>
              <div className="flex items-center justify-center py-4 bg-gray-100 rounded-b-lg">
                <button
                  className="bg-purple-600 text-white px-4 py-3 rounded-xl font-medium text-sm"
                  onClick={() => {
                    submit;
                  }}
                  disabled={isLoggedin ? false : true}
                >
                  Start An instant Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 items-center mt-6">
          <a
            href="#"
            className="text-xs font-semibold text-gray-500 hover:text-blue-700"
          >
            Back to Dashboard
          </a>

          <a
            href="#"
            className="text-xs font-semibold text-gray-500 hover:text-blue-700"
          >
            Back to Home
          </a>

          <a
            href="#"
            className="text-xs font-semibold text-gray-500 hover:text-blue-700"
          >
            Back to Login
          </a>

          <a
            href="#"
            className="text-xs font-semibold text-gray-500 hover:text-blue-700"
          >
            Back to Register
          </a>

          <a
            href="#"
            className="text-xs font-semibold text-gray-500 hover:text-blue-700"
          >
            Back to Profile
          </a>

          <a
            href="#"
            className="text-xs font-semibold text-gray-500 hover:text-blue-700"
          >
            Back to Settings
          </a>
        </div>
      </div>
    </div>
  );
}

// export default function CreateMeeting() {
//   const navigate = useNavigate();

//   return <div></div>;
// }
