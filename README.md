## Whispr Clone Desktop App using Tauri Framework and Deepgram API

This project is a speech to text tool which helps in translating audio into text using deepgram API and Tauri Framework. It is quite useful tool for detailed explaination to audio streaming Apps and saves a lot of time and effort and thus increases efficiency.


## Architecture and Approach
Microphone --> FrontEnd(Captures audio ) PCM audio chunks --> Deepgram API(Speech to Text) --> Tauri (paste text)

I first started working on building startMic function which will capture audio. This audio needs to be encoded to numbers which will be stored in 16 bit long integer. When we capture audio there will be noise so more chances of getting error to optimise that I have taken integers in range -1 to 1 and stored in single array. Now audio needs to be send in chunks instead of huge size as it will take lot of time to process and secondly it will help in analyzing voice breakage and stop connection if it is greater than 300ms.Make connection with deepgram api using api key and build socket for efficient communication and ensure proper checkpoints like whether data is coming or whether mic is open but connection not established.Lastly comes the frontend framework so I used reactjs to perform functionality of start/stop button , styling and display API response. 
## Acknowledgements

 - [Transciption tool](https://deepgram.com/free-transcription)
 - [Speech to text conversion architecture](https://www.google.com/search?q=building+speech+to+text+model+explain+the+structure&sca_esv=4d92ce857de34db6&ei=RDJMadW8N7ShseMPxNTgkQ0&ved=0ahUKEwjV7q_Q7taRAxW0UGwGHUQqONIQ4dUDCBE&uact=5&oq=building+speech+to+text+model+explain+the+structure&gs_lp=Egxnd3Mtd2l6LXNlcnAaAhgCIjNidWlsZGluZyBzcGVlY2ggdG8gdGV4dCBtb2RlbCBleHBsYWluIHRoZSBzdHJ1Y3R1cmUyBRAhGKABSOr2AVD6CFiO9QFwBXgBkAEAmAHUAaABr0GqAQYwLjU1LjK4AQPIAQD4AQGYAj6gAs1EqAIUwgIXEAAYgAQYkQIYtAIY5wYYigUY6gLYAQHCAiAQABiABBi0AhjUAxjlAhjnBhi3AxiKBRjqAhiKA9gBAcICEBAAGAMYtAIY6gIYjwHYAQLCAgsQABiABBiRAhiKBcICCBAAGIAEGLEDwgIOEC4YgAQYsQMY0QMYxwHCAgsQABiABBixAxiDAcICDhAAGIAEGLEDGIMBGIoFwgIFEAAYgATCAgUQLhiABMICFBAuGIAEGLEDGNEDGIMBGMcBGIoFwgIOEC4YgAQYsQMYgwEYigXCAgoQABiABBhDGIoFwgIKEC4YgAQYQxiKBcICCBAuGIAEGLEDwgIQEC4YgAQY0QMYQxjHARiKBcICHxAuGIAEGNEDGEMYxwEYigUYlwUY3AQY3gQY4ATYAQLCAgsQABiABBixAxjJA8ICCxAAGIAEGJIDGIoFwgIVEAAYgAQYpgMY-AUYqAMYChgLGIsDwgIJEAAYgAQYChgLwgIPEC4YgAQY0QMYxwEYChgLwgIMEAAYgAQYChgLGIsDwgIHEAAYgAQYDcICChAAGIAEGIsDGA3CAgYQABgNGB7CAggQABgFGA0YHsICBhAAGBYYHsICCBAAGAgYDRgewgIFEAAY7wXCAggQABiABBiiBMICCxAAGIAEGIYDGIoFwgIIEAAYogQYiQXCAgYQABgIGB7CAgUQIRifBcICBBAhGBXCAgcQIRigARgKmAMS8QUxNmyttd3mMroGBAgBGAe6BgYIAhABGAqSBwY1LjU1LjKgB53NArIHBjAuNTUuMrgHpUTCBwkwLjI2LjM0LjLIB_YBgAgA&sclient=gws-wiz-serp)
 - [How to write a Good readme](https://www.hatica.io/blog/best-practices-for-github-readme/)


## Requirements
Installation of node.js

Installation of rust as Tauri framework runs on rust language

Installation of Visual Studio for Building Desktop Application
## Installation

Install my-project with npm

```bash
 npm create tauri-app@latest voice-to-text-app
 cd voice-to-text-app
 npm install @tauri-apps/plugin-clipboard
 npm install @tauri-apps/plugin-global-shortcut
 npm install
 npm run tauri dev
```
    
## Deployment

To deploy this project run

```bash
  npm run tauri dev
```


## Code Blocks
main.rs file:

use tauri::Manager;

fn main() {

  tauri::Builder::default()

    .plugin(tauri_plugin_clipboard_manager::init())
    .plugin(tauri_plugin_global_shortcut::Builder::new().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri app");
}



audio.js file:

function float32ToInt16(float32Array) {

  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);

  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {

    let sample = Math.max(-1, Math.min(1, float32Array[i]));



export async function startMic(onAudio) {

 let audioContext = new AudioContext({
 sampleRate: 16000 });

  await audioContext.audioWorklet.addModule("/audio-processor.js");
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });


export function stopMic() {
  obj.workletNode?.port && (obj.workletNode.port.onmessage = null);
  obj.stream?.getTracks().forEach((t) => t.stop());
  obj.audioContext?.close();



class AudioProcessor extends AudioWorkletProcessor {
  process(inputs) {

    const input = inputs[0];
    if (input.length > 0) {
      this.port.postMessage(input[0]);


deepgram.js file:
export function connectDeepgram(apiKey, onTranscript, onOpen) {
  socket = new WebSocket(

    "wss://api.deepgram.com/v1/listen" +
      "?model=nova-2" +
      "&punctuate=true" +
      "&smart_format=true" +
      "&endpointing=300" +
      "&encoding=linear16" +
      "&sample_rate=16000",
    ["token", apiKey]
  );

   socket.onopen = () => {

    isReady = true;
    onOpen?.();
   
  };

  socket.onmessage = (event) => {
    
    const data = JSON.parse(event.data);

App.jsx file:

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


## Screenshots

[App Screenshot](https://drive.google.com/file/d/1iliX8LelhJ8OfPycS1-IhNg_ybHjzV8Q/view?usp=sharing)


## Lessons Learned

During Building this project I learned how to encode audio to numbers using PCM Encoder and how to stream audio in chunks and sent it to API for response.What is PCM Encoder.What is Deepgram API. What is Tauri framework used for?


