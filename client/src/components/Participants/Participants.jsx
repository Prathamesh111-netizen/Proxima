import React from "react";

export default function Participants(props) {
  const { peerIds } = props;
  return (
    <div>
      {peerIds.map((peerId) => {
        return <p>User-{peerId} </p>;
      })}
    </div>
  );
}
