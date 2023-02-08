import "./DashboardTable.scss";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Files from "../Files/Files";
import axios from "axios";

const DashboardTable = () => {
  const [myMeetings, setMyMeetings] = useState([]);
  const handleClose = () => setOpen(false);
  const [files, setFiles] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [hostWalletAddress, setHostWalletAddress] = useState("");

  useEffect(() => {
    const defaultAccount = JSON.parse(localStorage.getItem("defaultAccount"));
    if (defaultAccount) {
      setHostWalletAddress(defaultAccount);
    }

    axios
      .get(`${import.meta.env.VITE_EXPRESS_SERVER}/meeting/${defaultAccount}`)
      .then((result) => {
        console.log(result.data.meetings);
        setMyMeetings(result.data.meetings);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleOpen = (meetingId) => {
    setOpen(true);
    console.log(meetingId);
    axios
      .get(`${import.meta.env.VITE_EXPRESS_SERVER}/file/${meetingId}`)
      .then((result) => {
        console.log(result.data.files);
        setFiles(result.data.files);
      })
      .catch((error) => console.log("error", error));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="container">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Meeting Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      StartTime
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      EndTime
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Meeting Code
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Text Transcript
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Video Recording
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Files
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myMeetings.map((meeting) => (
                    <tr key={meeting.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {meeting.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {meeting.startTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {meeting.endTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a
                          href={`${import.meta.env.VITE_FRONTEND_URL}/meeting/${
                            meeting.meetingId
                          }`}
                        >
                          {meeting.meetingId}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <a href="https://gateway.lighthouse.storage/ipfs/QmZsepQLX3q5huAS42iMSLRmuGfg3z9mi5B5j7VmQVP957" target = "_blank">View Transcript</a>
                        </button>
                       
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            console.log("Viewing Recording");
                          }}
                        >
                          < a href ="https://gateway.lighthouse.storage/ipfs/QmVQpFw6a7fmy1FjJQSkDA4hgbU8ncYssRci1SGsJ3zWed" target = "_blank">
                          View Recording
                          </a>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleOpen(meeting.meetingId)}
                        >
                          View Files
                        </button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <div className="flex flex-col gap-2 items-end">
                              {files.map((file, index) => (
                                <div key={file._id} className="">
                                  <div className="flex gap-5">
                                    <div>{file.title}</div>
                                    <a
                                      href={
                                        "https://gateway.lighthouse.storage/ipfs/" +
                                        file.Hash
                                      }
                                      download
                                      className="btn btn-sm bg-purple-600"
                                      target="_blank"
                                    >
                                      Visit
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Box>
                        </Modal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
