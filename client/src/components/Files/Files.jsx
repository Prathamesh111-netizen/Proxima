import React from "react";
import { toast } from "react-toastify";

//TODO Fetch Files for Meeting Id props.meetingId
const Files = (props) => {
  const [files, setFiles] = React.useState([]);
  const [fileLinks, setFileLinks] = React.useState([]);
  const handleFileUpload = (e) => {
    e.preventDefault();
    console.log(e.target.fileInput.files[0].name);
    var formdata = new FormData();
    formdata.append("file", e.target.fileInput.files[0]);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${import.meta.env.VITE_BACKEND_SERVER}/api/upload-file`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setFiles([...files, e.target.fileInput.files[0]]);
        toast.success("File Uploaded Successfully");
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `${import.meta.env.VITE_BACKEND_SERVER}/api/get-file-links`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setFileLinks(JSON.parse(result).links);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <div className="text-lg">Files</div>
      <div className="flex flex-col gap-2">
        {files.map((file, index) => (
          <div key={file.id} className="">
            <div className="flex gap-5">
              {file.name}
              <a
                href={fileLinks[index]}
                download
                className="btn btn-sm bg-purple-600"
              >
                Download
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
