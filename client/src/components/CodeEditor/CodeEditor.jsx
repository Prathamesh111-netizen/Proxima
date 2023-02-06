import { useCallback, useEffect, useState } from "react";
import React from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./CodeEditor.scss";
import { io } from "socket.io-client";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
//import SendIcon from "@mui/icons-material/Send";
//import SaveAltIcon from "@mui/icons-material/SaveAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CodeEditor(props) {
  const { meetingId } = props;
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [stdin, setStdIn] = useState();
  const [stdout, setStdOut] = useState();
  const [selectedLang, setSelectedlang] = useState("cpp17");
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

  const stdinref = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      modules: {
        syntax: true, // Include syntax module
        toolbar: false, // Include button in toolbar
      },
      theme: "snow",
    });
    // q.disable();
    q.setText("");
    setStdIn(q);
  }, []);

  const stdoutref = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      modules: {
        syntax: true, // Include syntax module
        toolbar: false, // Include button in toolbar
      },
      theme: "snow",
    });
    q.disable();
    q.setText("");
    setStdOut(q);
  }, []);

  const compileCode = async () => {
    const code = quill.getText(0, quill.getLength());
    const input = stdin.getText(0, stdin.getLength());
    console.log(code);
    console.log(input);
    const body = {
      code: code,
      input: input,
    };
    await axios.post(import.meta.env.VITE_COMPILER_PATH, body).then((res) => {
      const { data } = res;
      console.log(data);
      stdout.setText(data.output);

      // emit
    });
  };

  const handleSave = async () => {
    const code = quill.getText(0, quill.getLength());
    axios
      .post(
        `${import.meta.env.VITE_EXPRESS_SERVER}/file/uploadcode/${
          props.meetingId
        }`,
        {
          type: "code",
          code: code,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Uploading File");
      });
  };

  const langOnClick = (lang) => {
    setSelectedlang(lang);
  };

  return (
    <>
      <div className="TextEditorcontainer" ref={wrapperRef} />
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <Item sx={{ textAlign: "left" }}>Stdin</Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ textAlign: "left" }}>Stdout</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <div ref={stdinref} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <div ref={stdoutref} />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div className="container flex">
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn m-1">
            {selectedLang}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={()=>langOnClick("cpp17")}>CPP17</button>
            </li>
            <li>
              <button onClick={()=>langOnClick("pyth3")}>PYTH 3</button>
            </li>
            <li>
              <button onClick={()=>langOnClick("c")}>C</button>
            </li>
            <li>
              <button onClick={()=>langOnClick("java")}>JAVA</button>
            </li>
            <li>
              <button onClick={()=>langOnClick("js")}>JS</button>
            </li>
            <li>
              <button onClick={()=>langOnClick("sql")}>SQL</button>
            </li>
          </ul>
        </div>
        <div className="container flex gap-10">
          <Button
            variant="contained"
            endIcon={<PlayArrowIcon />}
            sx={{ mt: 1 }}
            onClick={compileCode}
          >
            Compile and run
          </Button>

          <Button
            variant="contained"
            endIcon={<UploadFileIcon />}
            sx={{ mt: 1 }}
            onClick={handleSave}
          >
            Save Code to Lighthouse
          </Button>
        </div>
      </div>
    </>
  );
}
