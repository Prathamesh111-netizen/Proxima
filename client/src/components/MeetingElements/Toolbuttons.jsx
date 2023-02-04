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
import ShareButtonIcon from "@mui/icons-material/Share";
import QRCode from "react-qr-code";
import { getHuddleClient } from "@huddle01/huddle01-client";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import CallEnd from "@mui/icons-material/CallEnd";

const Modalstyle = {
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

export default function Toolbuttons() {
  const roomState = useHuddleStore((state) => state.roomState);
  const [camStatus, setCamStatus] = useState(false);
  const [micStatus, setMicstatus] = useState(false);
  const [screenShareStatus, setScreenShareStatus] = useState(false);
  const [chatStatus, setChatStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={Modalstyle}>
            <QRCode value={`${window.location.href}`} />
          </Box>
        </Modal>
        <IconButton
          aria-label="Share Meeting"
          size="small"
          sx={{ color: "white" }}
          className="IconButtonsComponent"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            handleOpen();
            toast.success("Meeting Link Copied to Clipboard");
          }}
        >
          <ShareButtonIcon />
        </IconButton>
        <IconButton
          aria-label="Share Meeting"
          size="small"
          sx={{ color: "white", backgroundColor: "red" }}
          className="IconButtonsComponent"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <CallEnd />
        </IconButton>
      </div>
    </div>
  );
}
