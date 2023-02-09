import "./WhiteBoardContainer.scss";
import React from "react";
import Board from "./Board";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";

class Container extends React.Component {
  constructor(props) {
    super(props);
    console.log("Props", props);

    this.state = {
      color: "#ffffff",
      size: "5",
    };
  }

  changeColor(params) {
    this.setState({
      color: params.target.value,
    });
  }

  changeSize(params) {
    this.setState({
      size: params.target.value,
    });
  }

  render() {
    return (
      <>
        <div className="whiteboardcontainer">
          <div className="container">
            <div className="tools-section">
              <div className="color-picker-container">
                Select Brush Color : &nbsp;
                <input
                  type="color"
                  value={this.state.color}
                  onChange={this.changeColor.bind(this)}
                />
              </div>

              <div className="color-picker-container" >
                Select Brush Size : &nbsp;
                <select
                  value={this.state.size}
                  onChange={this.changeSize.bind(this)}
                  className="brushsize-container"
                >
                  <option > 5 </option>
                  <option> 10 </option>
                  <option> 15 </option>
                  <option> 20 </option>
                  <option> 25 </option>
                  <option> 30 </option>
                </select>
              </div>
            </div>

            <div class="board-container">
              <Board
                color={this.state.color}
                size={this.state.size}
                documentId={this.props.documentId}
                meetingId={this.props.meetingId}
              ></Board>
            </div>
          </div>
        </div>

        
      </>
    );
  }
}

export default Container;
