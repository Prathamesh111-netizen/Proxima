import React from "react";
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import { useEffect, useRef, useCallback } from "react";

const ShareScreen = ({ peerId }) => {
  const shareScreenRef = useRef(null);
  const isSharePaused = useHuddleStore(
    (state) => state.peers[peerId].isSharePaused
  );
  const peerShareScreen = useHuddleStore(
    useCallback((state) => state.peers[peerId]?.consumers?.share, [
      peerId,
    ])
  )?.track;

  const getStream = (_track) => {
    const stream = new MediaStream();
    stream.addTrack(_track);
    console.log({ ...stream });
    return stream;
  };
  useEffect(() => {
    if (peerShareScreen && shareScreenRef.current) {
      shareScreenRef.current.srcObject = getStream(peerShareScreen);
    }
    console.log("share screen ref - " + shareScreenRef.current);
  }, [peerShareScreen]);

  return <div>
    { isSharePaused && <video
        ref={shareScreenRef}
        muted
        autoPlay
        style={{ width: "100%" }}
        className="bg-base-300"
      />}
  </div>;
};

export default ShareScreen;
