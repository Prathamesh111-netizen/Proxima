import React, { useState, useEffect } from "react";
import Waves from "../../components/Waves/waves";
import Navbar from "../../components/Navbar";
import DashboardTable from "./DashboardTable/DashboardTable";

export default function Dashboard() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [myMeetings, setMyMeetings] = useState({
    meetings: [
      {
        id: 1,
        name: "Meeting 1",
        date: "2021-09-03",
        time: "12:00",
        duration: "1 hour",
        isConcluded: false,
      },
      {
        id: 2,
        name: "Meeting 2",
        date: "2021-09-02",
        time: "13:00",
        duration: "1 hour",
        isConcluded: true,
      },
      {
        id: 3,
        name: "Meeting 3",
        date: "2021-09-03",
        time: "11:00",
        duration: "1 hour",
        isConcluded: false,
      },
    ],
  });
 

  useEffect(() => {
    if (
      localStorage.getItem("defaultAccount") &&
      window.ethereum.selectedAddress
    ) {
      setIsLoggedin(true);
      const sortedMeetings = myMeetings;
      sortedMeetings.meetings.sort((a, b) => {
        if (a.date === b.date) {
          return a.time - b.time; //Not working
        }
        return new Date(a.date) - new Date(b.date);
      });
      // console.log(sortedMeetings);
      setMyMeetings(sortedMeetings);
    } else {
      setIsLoggedin(false);
    }
  }, []);


  return (
    <div>
      <Waves />
      <Navbar />
      {isLoggedin ? (
        <DashboardTable myMeetings={myMeetings} className="DashboardTableMeetings" />
      ) : (
        <div className="container">You are not logged in</div>
      )}
    </div>
  );
}
