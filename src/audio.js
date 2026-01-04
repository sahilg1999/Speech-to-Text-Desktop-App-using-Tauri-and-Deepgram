
let obj=null;
function float32ToInt16(float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);

  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let sample = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(
      offset,
      sample < 0 ? sample * 0x8000 : sample * 0x7fff,
      true
    );
  }

  return buffer;
}

export async function startMic(onAudio) {
 let audioContext = new AudioContext({ sampleRate: 16000 });

  await audioContext.audioWorklet.addModule("/audio-processor.js");

  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  let source = audioContext.createMediaStreamSource(stream);

 let  workletNode = new AudioWorkletNode(audioContext, "audio-processor");

  workletNode.port.onmessage = (event) => {
    const pcm16 = float32ToInt16(event.data);
    onAudio(pcm16); // sendAudio from App.jsx
  };

  source.connect(workletNode);
  obj={stream,workletNode,audioContext,source};
}

export function stopMic() {
  obj.workletNode?.port && (obj.workletNode.port.onmessage = null);
  obj.stream?.getTracks().forEach((t) => t.stop());
  obj.audioContext?.close();

  
  obj=null;
}
