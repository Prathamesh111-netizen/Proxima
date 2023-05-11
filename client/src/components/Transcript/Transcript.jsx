import 'regenerator-runtime/runtime';
import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

const Transcript = () => {
  const speechRecognitionSupported = SpeechRecognition.browserSupportsSpeechRecognition();

  const [isSupported, setIsSupported] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState({
    loading: false,
    message: "",
    error: false,
    success: false,
  });
  const textBodyRef = useRef(null);

  const startListening = () => {
    setListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopListening = () => {
    setListening(false);
    SpeechRecognition.stopListening();
  };

  const resetText = () => {
    stopListening();
    resetTranscript();
    textBodyRef.current.innerText = "";
  };

  const handleConversion = async () => {
    if (typeof window !== "undefined") {
      const userText = textBodyRef.current.innerText;
      // console.log(textBodyRef.current.innerText);

      if (!userText) {
        alert("Please speak or write some text.");
        return;
      }

      try {
        setResponse({
          ...response,
          loading: true,
          message: "",
          error: false,
          success: false,
        });
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",
        };

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/transcript`,
          {
            text: textBodyRef.current.innerText,
          },
          config
        );
        setResponse({
          ...response,
          loading: false,
          error: false,
          message:
            "Conversion was successful. Your download will start soon...",
          success: true,
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "yourfile.pdf");
        document.body.appendChild(link);
        link.click();

        console.log(res);
      } catch (error) {
        setResponse({
          ...response,
          loading: false,
          error: true,
          message:
            "An unexpected error occured. Text not converted. Please try again",
          success: false,
        });
      }
    }
  };

  useEffect(() => {
    setIsSupported(speechRecognitionSupported);
  }, []);

  if (!isSupported) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <>
      <section>
        <div className="flex w-fit mx-auto justify-apart my-5">
          <h1 className="text-lg p-4">Meeting transcript</h1>
          <button
            type="button"
            onClick={startListening}
            style={{ "--bgColor": "blue" }}
            className="btn mx-4"
            disabled={listening}
          >
            Start
          </button>
          <button
            type="button"
            onClick={stopListening}
            style={{ "--bgColor": "orange" }}
            disabled={listening === false}
            className="btn mx-4"
          >
            Stop
          </button>
        </div>
        <div
          className="mx-auto text-center"
          contentEditable
          ref={textBodyRef}
          suppressContentEditableWarning={true}
        >
          {transcript}
        </div>
        <div className="mx-auto text-center">
          {response.success && (
            <i className="text-success ">{response.message}</i>
          )}
          {response.error && <i className="text-error ">{response.message}</i>}
        </div>
        <div className="mx-auto text-center">
          <button
            type="button"
            onClick={resetText}
            className="btn mx-4"
            style={{ "--bgColor": "red" }}
          >
            Reset
          </button>
          <button
            type="button"
            style={{ "--bgColor": "green" }}
            className="btn mx-4"
            onClick={handleConversion}
          >
            {response.loading ? "Converting..." : "Convert to pdf"}
          </button>
          <button
            className="btn"
            onClick={() => {
              navigator.clipboard.writeText(textBodyRef.current.innerText);
              alert("Copied to clipboard");
            }}
          >
            Copy to clipboard
          </button>
        </div>
      </section>
    </>
  );
};

export default Transcript;
