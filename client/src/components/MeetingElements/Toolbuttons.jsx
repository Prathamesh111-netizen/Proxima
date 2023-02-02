import "./Toolbuttons.scss";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { getHuddleClient } from "@huddle01/huddle01-client";
import { useHuddleStore } from "@huddle01/huddle01-client/store";

export default function Toolbuttons() {
  const roomState = useHuddleStore((state) => state.roomState);
  const [camStatus, setCamStatus] = useState(false);
  const [micStatus, setMicstatus] = useState(false);
  const [screenShareStatus, setScreenShareStatus] = useState(false);
  const [chatStatus, setChatStatus] = useState(false);

  useEffect(() => {
    console.log(roomState, "inside toolbox");
  }, []);

  const huddleClient = getHuddleClient(import.meta.env.VITE_HUDDLE_KEY);
  const toggleCam = () => {
    if (camStatus) {
      huddleClient.disableWebcam();
      setCamStatus(false);
    } else {
      huddleClient.enableWebcam();
      setCamStatus(true);
    }
  };

  const toggleMic = () => {
    if (micStatus) {
      huddleClient.muteMic();
      setMicstatus(false);
    } else {
      huddleClient.enableMic();
      setMicstatus(true);
    }
  };

  const toggleScreenShare = () => {
    if (screenShareStatus) {
      //   huddleClient.stopScreenShare();
      setScreenShareStatus(false);
    } else {
      //   huddleClient.startScreenShare();
      setScreenShareStatus(true);
    }
  };

  const toggleChat = () => {
    if (chatStatus) {
      // huddleClient.disableChat();
      setChatStatus(false);
    } else {
      // huddleClient.enableChat();
      setChatStatus(true);
    }
  };

  return (
    <div className="Toolbuttons">
      <div className="ToolbuttonsMaincomponent">
        {camStatus ? (
          <IconButton
            aria-label="Turn off Camera"
            size="small"
            onClick={toggleCam}
            sx={{ color: "white" }}
            className="IconButtonsComponent"
          >
            <VideocamIcon />

          </IconButton>
        ) : (
            <IconButton
            aria-label="Turn on Camera"
            size="small"
            onClick={toggleCam}
            sx={{ color: "white" }}
            className="IconButtonsComponent"
            >
            <VideocamOffIcon />
          </IconButton>
        )}
        {micStatus ? (
          <IconButton
            aria-label="Turn off Mic"
            size="small"
            onClick={toggleMic}
            sx={{ color: "white" }}
            className="IconButtonsComponent"
          >
              <MicIcon />
          </IconButton>
        ) : (
            <IconButton
            aria-label="Turn on Mic"
            size="small"
            onClick={toggleMic}
            sx={{ color: "white" }}
            className="IconButtonsComponent"
            >
            <MicOffIcon />
          </IconButton>
        )}
        <IconButton
          aria-label={
            screenShareStatus ? "Stop Screen Share" : "Share your Screen"
          }
          className="IconButtonsComponent"
          size="small"
          onClick={toggleScreenShare}
          sx={{ color: "white" }}
        >
          <ScreenShareIcon />
        </IconButton>
        <IconButton
          aria-label={chatStatus ? "Hide Chat" : "Show Chat"}
          size="small"
          onClick={toggleChat}
          sx={{ color: "white" }}
          className="IconButtonsComponent"
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
}
