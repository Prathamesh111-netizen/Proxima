import "./Board.scss";
import React from "react";
import io from "socket.io-client";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";

class Board extends React.Component {
  timeout;
  socket = io.connect(import.meta.env.VITE_BACKEND_SERVER);

  ctx;
  isDrawing = false;

  constructor(props) {
    super(props);
    this.socket.emit("join-room", this.props.meetingId);
    this.socket.emit("get-canvas", this.props.meetingId);
    this.socket.once("load-canvas", function (data) {
      var root = this;
      var interval = setInterval(function () {
        if (root.isDrawing) return;
        root.isDrawing = true;
        clearInterval(interval);
        var canvas = document.querySelector("#board");
        var ctx = canvas.getContext("2d");
        var image = new Image();
        image.onload = function () {
          ctx.drawImage(image, 0, 0);
          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });
    this.socket.on("canvas-data", function (data) {
      var root = this;
      var interval = setInterval(function () {
        if (root.isDrawing) return;
        root.isDrawing = true;
        clearInterval(interval);
        var image = new Image();
        var canvas = document.querySelector("#board");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);
          root.isDrawing = false;
        };
        image.src = data;
      }, 200);
    });
  }

  componentDidMount() {
    this.drawOnCanvas();
  }

  componentWillReceiveProps(newProps) {
    this.ctx.strokeStyle = newProps.color;
    this.ctx.lineWidth = newProps.size;
  }

  drawOnCanvas() {
    var canvas = document.querySelector("#board");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = this.props.size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = this.props.color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    var root = this;
    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (root.timeout != undefined) clearTimeout(root.timeout);
      root.timeout = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("image/png");
        root.socket.emit("canvas-data", base64ImageData);
        // root.socket.emit("canvas-data", base64ImageData);
      }, 1000);
    };
  }

  saveBoardonLighthouse() {
    var canvas = document.querySelector("#board");
    var base64ImageData = canvas.toDataURL("image/png");

    this.socket.emit("canvas-data", base64ImageData);
    axios
      .post(
        `${import.meta.env.VITE_EXPRESS_SERVER}/file/${this.props.meetingId}`,
        { whiteboard : base64ImageData, type : "whiteboard"}
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Uploading File");
      });
  }

  render() {
    return (
      <>
        <div className="boardcomponent">
          <div class="sketch" id="sketch">
            <canvas className="board" id="board"></canvas>
          </div>
        </div>
        <div className="container flex gap-10">
          <Button
            variant="contained"
            endIcon={<UploadFileIcon />}
            sx={{ mt: 1 }}
            onClick={() => this.saveBoardonLighthouse()}
          >
            Save Whiteboard to Lighthouse
          </Button>
        </div>
      </>
    );
  }
}

export default Board;
