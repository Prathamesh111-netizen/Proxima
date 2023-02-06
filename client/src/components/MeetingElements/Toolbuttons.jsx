import "./Toolbuttons.scss";
import React, { useState, useRef, useEffect } from "react";
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
import { useReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "@mui/icons-material/FiberManualRecord";
import Fab from "@mui/material/Fab";
import axios from "axios";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";

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

export default function Toolbuttons(props) {
  const roomState = useHuddleStore((state) => state.roomState);
  const [camStatus, setCamStatus] = useState(false);
  const [micStatus, setMicstatus] = useState(false);
  const [screenShareStatus, setScreenShareStatus] = useState(false);
  const [chatStatus, setChatStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

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

  const [recordMeet, setRecordMeet] = useState(false);
  const [recordButtonText, setRecordButtonText] = useState("Record Meeting");
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);

  const toggleRecordMeet = async () => {
    if (recordMeet) {
      setRecordMeet(false);
      setRecordButtonText("Record Meeting");
      // stopRecording();
      recorderRef.current.stopRecording(() => {
        setBlob(recorderRef.current.getBlob());
      });
      console.log(blob);
    invokeSaveAsDialog(blob);
      axios
        .post(`${import.meta.env.VITE_EXPRESS_SERVER}/file/${props.meetingId}`, {
          file: blob,
          type : "meetingRecording"
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRecordMeet(true);
      setRecordButtonText("Stop Recording");
      // startRecording();
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: 1920,
          height: 1080,
          frameRate: 30,
        },
        audio: false,
      });

      setStream(mediaStream);
      recorderRef.current = new RecordRTC(mediaStream, { type: "video" });
      recorderRef.current.startRecording();
    }
    
  };

  return (
    <div className="Toolbuttons flex">
      {recordMeet && (
        <Fab
          style={{
            backgroundColor: "red",
            color: "white",
          }}
          variant="extended"
          size="small"
          aria-label="add"
        >
          <RecordIcon sx={{ mr: 1, color: "white" }} />
          Recording in progress
        </Fab>
      )}
      {/* {blob} */}

      <div className="RecordMeeting flex flex-start">
        <button
          href=""
          className="btn bg-white text-black"
          onClick={toggleRecordMeet}
        >
          {recordButtonText}
        </button>
      </div>
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
        {/* <IconButton
          aria-label={
            screenShareStatus ? "Stop Screen Share" : "Share your Screen"
          }
          className="IconButtonsComponent"
          size="small"
          onClick={toggleScreenShare}
          sx={{ color: "white" }}
        >
          <ScreenShareIcon />
        </IconButton> */}
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
      {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
    </div>
  );
}
