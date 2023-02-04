import React from "react";

//TODO Fetch Files for Meeting Id props.meetingId
const Files = (props) => {
  const [files, setFiles] = React.useState([]);
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

    fetch("http://localhost:3001/api/upload-file", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setFiles([...files, e.target.fileInput.files[0]]);
  };

  return (
    <div>
      <div className="text-lg">Files</div>
      <div className="flex flex-col gap-2">
        {files.map((file) => (
          <div key={file.id} className="">
            <div className="flex gap-5">
              {file.name}
              <button className="btn btn-sm bg-purple-600">Download</button>
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
