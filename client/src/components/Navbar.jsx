//Navbar
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { AvatarGenerator } from "random-avatar-generator";

const Navbar = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const JoinMeeting = () => {
    navigate("/join");
  };

  const CreateMeeting = () => {
    navigate("/create");
  };

  // const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  // const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [provider, setProvider] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const connectWalletHandler = (isClicked) => {
    if (
      window.ethereum != null &&
      window.ethereum.isMetaMask === true &&
      window.ethereum.isConnected() === true
    ) {
      // set ethers provider
      setProvider(new ethers.providers.Web3Provider(window.ethereum));

      // connect to metamask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log(result);
          // setConnButtonText("Wallet Connected");
          if (isClicked) {
            toast.success("Wallet Connected");
          }
          setIsLoggedin(true);
          setDefaultAccount(result[0]);
          const generator = new AvatarGenerator();
          localStorage.setItem("defaultAccount", JSON.stringify(result[0]));
          localStorage.setItem("userBalance", JSON.stringify(result[0]));
          setAvatar(generator.generateRandomAvatar());
        })
        .catch((error) => {
          // setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask and enable it on this tab");
      toast.error(
        "Please install MetaMask browser extension and enable it on this tab to interact "
      );
      // setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const logout = () => {
    toast("Logged Out");
    localStorage.removeItem("defaultAccount");
    localStorage.removeItem("userBalance");
    setDefaultAccount(null);
    setUserBalance(null);
    setIsLoggedin(false);
    setConnButtonText("Connect Wallet");
    // window.location.reload();
  };


  useEffect(() => {
    const defaultAccount = JSON.parse(localStorage.getItem("defaultAccount"));
    if (defaultAccount && window.ethereum.selectedAddress === defaultAccount) {
      connectWalletHandler();
      setDefaultAccount(defaultAccount);
      setIsLoggedin(true);

      const generator = new AvatarGenerator();
      setAvatar(generator.generateRandomAvatar("" + defaultAccount));
    } else {
      setIsLoggedin(false);
    }
  }, []);

  return (
    <div className="w-11/12 md:mr-10 md:ml-10 ml-5 mt-5 rounded-xl navbar ">
      <div className="flex-1">
        <a className=" normal-case text-xl" href="/">
          Proxima
        </a>
      </div>
      <div className="flex-none">
        {!isLoggedin && (
          <div className="dropdown dropdown-end flex gap-3">
            <button
              className="justify-between"
              onClick={() => connectWalletHandler(true)}
            >
              Connect Now
            </button>
          </div>
        )}

        {isLoggedin && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={avatar} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/dashboard" className="justify-between">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/scheduled-meetings" className="justify-between">
                  Scheduled Meetings
                </a>
              </li>
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// // Path: client\src\components\Register.jsx
// //Register
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const history = useHistory();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/register", {
//         email,
//         password,
//         name,
//       });
//       console.log(res.data);
//       history.push("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

// // Path: client\src\components\Login.jsx
// //Login
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const history = useHistory();
//   const [
