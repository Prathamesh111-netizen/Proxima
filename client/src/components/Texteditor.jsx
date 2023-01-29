import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import axios from "axios";

export default function TextEditor(props) {
  const { meetingId } = props;
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  useEffect(() => {
    const s = io(import.meta.env.VITE_BACKEND_SERVER);
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.emit("join-room", meetingId);
    socket.emit("get-document", meetingId);
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
  }, [socket, quill, meetingId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    // change on onclick event
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, import.meta.env.VITE_SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      modules: {
        syntax: true, // Include syntax module
        toolbar: [["code-block"]], // Include button in toolbar
      },
      theme: "snow",
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  const compileCode = async () => {
    const code = quill.getText(0, quill.getLength());
    console.log(code);
    const body = {
      code: code
    }
    await axios.post(import.meta.env.VITE_COMPILER_PATH, body).then(res=>console.log(res));
  };

  return (
    <>
      <div className="container" ref={wrapperRef} />
      <button className="btn btn-secondary" onClick={compileCode}>
        Compile
      </button>
    </>
  );
}
