let socket = null;
let isReady = false;
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

    const transcript =
      data.channel?.alternatives?.[0]?.transcript;

    if (transcript) {
      onTranscript(transcript, data.is_final);
    }
  };
   socket.onerror = (err) => {
    console.error("Deepgram socket error", err);
  };
   socket.onclose = () => {
    isReady = false;
    socket = null;
  
  };
}
//socket && socket.readyState === WebSocket.OPEN
export function sendAudio(buffer) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return; 
  }
  socket.send(buffer);
}

export function closeDeepgram() {
  if (socket) {
    socket.close();
    socket = null;
    isReady = false;
  }
}
