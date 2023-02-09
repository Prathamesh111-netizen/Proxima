import React, { useState, useEffect } from "react";
import Waves from "../components/Waves/waves";
import Navbar from "../components/Navbar";
import DashboardTable from "../components/DashboardTable/DashboardTable";

export default function Dashboard() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [myMeetings, setMyMeetings] = useState([]);
 

  useEffect(() => {
    if (
      localStorage.getItem("defaultAccount") &&
      window.ethereum.selectedAddress
    ) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, []);


  return (
    <div>
      <Waves />
      <Navbar />
      {isLoggedin ? (
        <DashboardTable className="DashboardTableMeetings" />
      ) : (
        <div className="container">You are not logged in</div>
      )}
    </div>
  );
}
