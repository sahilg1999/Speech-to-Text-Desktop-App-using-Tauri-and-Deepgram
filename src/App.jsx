import { useState, useEffect, useRef } from "react";
import { startMic, stopMic } from "./audio";
import { connectDeepgram, sendAudio, closeDeepgram } from "./deepgram";
import "./App.css";

let listen, writeText;
const isTauri = !!window.__TAURI__;

if (isTauri) {
  ({ listen } = await import("@tauri-apps/api/event"));
  ({ writeText } = await import("@tauri-apps/plugin-clipboard-manager"));
}

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY;

function App() {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const startingRef = useRef(false);

  async function startRec() {
    if (startingRef.current) return;
    startingRef.current = true;

    connectDeepgram(
      DEEPGRAM_API_KEY,
      (t, isFinal) => {
        if (isFinal) {
          setText((prev) => prev + " " + t);
        }
      },
      async () => {
        await startMic(sendAudio);
        setRecording(true);
        startingRef.current = false;
      }
    );
  }

  async function stopRec() {
    stopMic();
    closeDeepgram();
    setRecording(false);

    if (isTauri && writeText) {
      await writeText(text);
    } else {
      await navigator.clipboard.writeText(text);
    }
  }

  useEffect(() => {
    if (!isTauri || !listen) return;

    let unlisten;

    listen("toggle-recording", () => {
      recording ? stopRec() : startRec();
    }).then((fn) => (unlisten = fn));

    return () => {
      unlisten?.();
    };
  }, [recording]);

  return (
    <div className="parentContainer">
      <h2 className="Heading">Voice To Text App</h2>

      <div onClick={recording ? stopRec : startRec} className="btnShape">
        <span className="btnTxt">{recording ? "Stop" : "Start"}</span>
      </div>

      <textarea
        value={text}
        className="txtArea"
        readOnly
        rows={8}
        style={{ width: "100%", marginTop: 10 }}
        placeholder="Speech will appear here..."
      />
    </div>
  );
}

export default App;
