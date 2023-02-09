import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

//TODO Fetch Files for Meeting Id props.meetingId
const Files = (props) => {
  const [files, setFiles] = React.useState([]);

  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log(e.target.fileInput.files[0].name);
    var formdata = new FormData();
    formdata.append("file", e.target.fileInput.files[0]);

    axios
      .post(
        `${import.meta.env.VITE_EXPRESS_SERVER}/file/${props.meetingId}`,
        formdata
      )
      .then((response) => {
        console.log(response);
        axios
          .get(`${import.meta.env.VITE_EXPRESS_SERVER}/file/${props.meetingId}`)
          .then((result) => {
            console.log(result.data.files);
            setFiles(result.data.files);
          })
          .catch((error) => console.log("error", error));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Uploading File");
      });
  };

  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_EXPRESS_SERVER}/file/${props.meetingId}`)
      .then((result) => {
        console.log(result.data.files);
        setFiles(result.data.files);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      {/* <div className="text-lg">Files</div> */}
      <div className="flex flex-col gap-2">
        {files.map((file, index) => (
          <div key={file._id} className="">
            <div className="flex gap-5">
              {file.title}
              <a
                href={"https://gateway.lighthouse.storage/ipfs/" + file.Hash}
                download
                className="btn btn-sm bg-purple-600"
                target = "_blank"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      </div>
      {!props.isDashboard && (
        <form
          className="pt-10"
          action=""
          method="post"
          id="form"
          onSubmit={handleFileUpload}
        >
          <input type="file" className="" name="fileInput" />
          <button className="btn bg-purple-600" type="submit">
            Upload
          </button>
        </form>
      )}
    </div>
  );
};

export default Files;
