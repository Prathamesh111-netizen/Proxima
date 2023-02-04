import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import Waves from "../components/Waves/waves";
import Navbar from "../components/Navbar";
import DashboardTable from "../components/DashboardTable";

export default function Dashboard() {
  // const navigate = useNavigate();

  // const JoinMeeting = () => {
  //   navigate("/join");
  // };

  // const CreateMeeting = () => {
  //   navigate("/create");
  // };

  // const [errorMessage, setErrorMessage] = useState(null);
  // const [defaultAccount, setDefaultAccount] = useState(null);
  // const [userBalance, setUserBalance] = useState(null);
  // const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  // const [provider, setProvider] = useState(null);
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

  // const connectWalletHandler = () => {
  //   if (window.ethereum && defaultAccount == null) {
  //     // set ethers provider
  //     setProvider(new ethers.providers.Web3Provider(window.ethereum));

  //     // connect to metamask
  //     window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((result) => {
  //         setConnButtonText("Wallet Connected");
  //         setDefaultAccount(result[0]);
  //         localStorage.setItem("defaultAccount", JSON.stringify(result[0]));
  //         localStorage.setItem("userBalance", JSON.stringify(result[0]));
  //       })
  //       .catch((error) => {
  //         setErrorMessage(error.message);
  //       });
  //   } else if (!window.ethereum) {
  //     console.log("Need to install MetaMask");
  //     setErrorMessage("Please install MetaMask browser extension to interact");
  //   }
  // };

  // useEffect(() => {
  //   if (defaultAccount) {
  //     provider.getBalance(defaultAccount).then((balanceResult) => {
  //       setUserBalance(ethers.utils.formatEther(balanceResult));
  //     });
  //   }
  // }, [defaultAccount]);

  useEffect(() => {
    // console.log(import.meta.env);
    if (
      localStorage.getItem("defaultAccount") &&
      window.ethereum.selectedAddress
    ) {
      setIsLoggedin(true);
      const sortedMeetings = myMeetings;
      sortedMeetings.meetings.sort((a, b) => {
        if (a.date === b.date) {
          // console.log(a.time, b.time);
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
        <DashboardTable myMeetings={myMeetings} />
      ) : (
        <div className="container">You are not logged in</div>
      )}
    </div>
  );
}
