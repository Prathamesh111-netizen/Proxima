import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/loader";
import Texteditor from "../components/Texteditor";
import { getHuddleClient } from "@huddle01/huddle01-client";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import MeVideoElem from "../components/MeVideoElem";
import PeerVideoAudioElem from "../components/PeerVideoAudioElem";

const Meeting = () => {
  const { id: meetingId } = useParams();
  const [loading, setLoading] = useState(true);
  const huddleClient = getHuddleClient(import.meta.env.VITE_HUDDLE_KEY);
  const roomState = useHuddleStore((state) => state.roomState);
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));

  useEffect(() => {
    setTimeout(async () => {
      console.log(import.meta.env.VITE_HUDDLE_KEY);
      try {
        await huddleClient.join("dev", {
          address: "0x15900c698ee356E6976e5645394F027F0704c8Eb",
          wallet: "",
          ens: "axit.eth",
        });

        console.log("joined");
      } catch (error) {
        console.log({ error });
      }
      setLoading(false);
    }, 3000);
  }, []);

  const [defaultAccount, setdefaultAccount] = useState(null);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("defaultAccount"));
    if (result) {
      setdefaultAccount(result);
    }
  }, []);
  console.log(roomState);

  const JoinRoom = async () => {
    try {
      await huddleClient.join("dev", {
        address: "0x15900c698ee356E6976e5645394F027F0704c8Eb",
        wallet: "",
        ens: "axit.eth",
      });

      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && <Texteditor documentId="123" meetingId={meetingId} />}
      <button onClick={JoinRoom}>Join Room</button>
      <button onClick={() => huddleClient.enableWebcam()}>Enable Webcam</button>
      <button onClick={() => huddleClient.disableWebcam()}>
        Disable Webcam
      </button>
      <MeVideoElem />
      <div className="peers-grid">
        {peersKeys.map((key) => (
          <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} />
        ))}
      </div>
    </>
  );
};

export default Meeting;
