import "./DashboardTable.scss";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const DashboardTable = () => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const handleOpenModal1 = () => setOpenModal1(true);
  const handleCloseModal1 = () => setOpenModal1(false);
  const handleOpenModal2 = () => setOpenModal2(true);
  const handleCloseModal2 = () => setOpenModal2(false);

  const [hostWalletAddress, setHostWalletAddress] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [myMeetings, setMyMeetings] = useState([]);

  useEffect(() => {
    const defaultAccount = JSON.parse(localStorage.getItem("defaultAccount"));
    if (defaultAccount) {
      setIsLoggedin(true);
      setHostWalletAddress(defaultAccount);
      fetch(`${import.meta.env.VITE_EXPRESS_SERVER}/meeting/${defaultAccount}`)
        .then((response) => response.json())
        .then((data) => {
          setMyMeetings(data.meetings);
          console.log(data.meetings);
        });
    }
  }, []);

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
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myMeetings.length > 0 &&
                    myMeetings.map((meeting) => (
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
                          {meeting.meetingId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a
                            href={`http://localhost:5173/meeting/${meeting.meetingId}`}
                            target="_blank"
                          >
                            Join Meeting
                          </a>
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
