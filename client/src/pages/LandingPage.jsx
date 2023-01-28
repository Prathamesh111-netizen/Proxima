import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const JoinMeeting = () => {
    navigate("/join");
  };

  const CreateMeeting = () => {
    navigate("/create");
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [provider, setProvider] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum && defaultAccount == null) {
      // set ethers provider
      setProvider(new ethers.providers.Web3Provider(window.ethereum));

      // connect to metamask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setConnButtonText("Wallet Connected");
          setDefaultAccount(result[0]);
          localStorage.setItem('defaultAccount', JSON.stringify(result[0]));
          localStorage.setItem('userBalance', JSON.stringify(result[0]));
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else if (!window.ethereum) {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  useEffect(() => {
    if (defaultAccount) {
      provider.getBalance(defaultAccount).then((balanceResult) => {
        setUserBalance(ethers.utils.formatEther(balanceResult));
      });
    }
  }, [defaultAccount]);

  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="/connectwallet.png" alt="Connect Wallet" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">defaultAccount : {defaultAccount}</h2>
          <h2 className="card-title">userBalance : {userBalance}</h2>
          <h2 className="card-title">{errorMessage}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={connectWalletHandler}>
              {connButtonText}
            </button>
          </div>
        </div>
      </div>
      <button className="btn btn-active landinpagebutton" onClick={JoinMeeting}>
        Join Meeting
      </button>
      <button
        className="btn btn-outline btn-primary landinpagebutton"
        onClick={CreateMeeting}
      >
        Create Meeting
      </button>
    </div>
  );
}
