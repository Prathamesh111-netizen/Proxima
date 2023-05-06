import "./Meeting.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHuddleClient } from "@huddle01/huddle01-client";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import LoadingScreen from "../../components/loader";
import MeVideoElem from "../../components/MeetingElements/MeVideoElem";
import PeerVideoAudioElem from "../../components/MeetingElements/PeerVideoAudioElem";
import MeetingTabs from "../../components/MeetingTabs/MeetingTabs";
import Toolbuttons from "../../components/MeetingElements/Toolbuttons";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useHuddle01 } from "@huddle01/react";
import Navbar from "../../components/Navbar";
import { useLobby, useAudio, useVideo, usePeers } from "@huddle01/react/hooks";
import { Video, Audio } from "@huddle01/react/components";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Meeting = () => {
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const { fetchAudioStream, stopAudioStream, error: micError } = useAudio();
  const { fetchVideoStream, stopVideoStream, error: camError } = useVideo();
  const { id: meetingId } = useParams();
  const [loading, setLoading] = useState(true);
  const huddleClient = getHuddleClient(import.meta.env.VITE_HUDDLE_KEY);
  const roomState = useHuddleStore((state) => state.roomState);
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const [isLoggedin, setIsLoggedin] = useState(false);

  // const { initialize, isInitialized } = useHuddle01();
  useEffect(() => {
    initialize(import.meta.env.VITE_HUDDLE_PROJECTID);
    setTimeout(async () => {
      await huddleClient.join(meetingId, {
        address: "0x15900c698ee356E6976e5645394F027F0704c8Eb",
        wallet: "",
        ens: "axit.eth",
      });
      joinLobby(1);
      console.log("ROOM-STATE", roomState);
      setLoading(false);
    }, 3000);
  }, []);

  const { peerIds } = usePeers();

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
  }, []);
  return (
    <>
      {isInitialized && (
        <div className="MeetingPage">
          <div className="MeetingPageFullPage">
            {/* {loading && <LoadingScreen />} */}
            {!loading && (
              <div className="MeetingPageComponent">
                <div>
                  <Box className="MeetingBoxComponent">
                    <Grid container spacing={2}>
                      <Grid xs={8} className="MeetingGridComponent">
                        <Item>
                          <MeetingTabs
                            documentId={meetingId}
                            meetingId={meetingId}
                            className="Meetingtabscomponent"
                          />
                        </Item>
                      </Grid>
                      <Grid xs={4} className="VideoGridComponent">
                        <Item>
                          <MeVideoElem />
                          <br></br>
                          <br></br>
                          <div className="peers-grid">
                            {peersKeys.map((key) => (
                              <PeerVideoAudioElem
                                key={`peerId-${key}`}
                                peerIdAtIndex={key}
                              />
                            ))}
                          </div>
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                  <Toolbuttons meetingId={meetingId} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {!isInitialized && <LoadingScreen />}
    </>
  );
};

export default Meeting;
