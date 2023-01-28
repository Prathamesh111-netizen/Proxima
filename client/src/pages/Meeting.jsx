import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/loader";

const Meeting = () => {
  const { id: meetingId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const [defaultAccount, setdefaultAccount] = useState(null);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("defaultAccount"));
    if (result) {
      setdefaultAccount(result);
    }
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && <div>{"Meeting" + meetingId + " with " + defaultAccount}</div>}
    </>
  );
};

export default Meeting;
