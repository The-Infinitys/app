const audio = document.querySelector("#audio");
const get_audio_url = () => {
  const default_audio =
    "https://develop.the-infinitys.f5.si/article-2024/09/through-infinity/Through-Infinity.mp3";
  const param_audio = URLSearchParams(document.location.search).get("audio");
  return param_audio == null ? default_audio : param_audio;
};
audio.src = get_audio_url();
let already_inited = false;
const containerElement = document.querySelector(".container");
const FFT_SIZE = 64;
function init() {
  if (already_inited) {
    return;
  }
  already_inited = true;
  const boxes = [];
  for (let i = 0; i < FFT_SIZE / 2; i++) {
    // FFT_SIZE / 2 は 64
    const div = document.createElement("div");
    div.classList.add("box");
    containerElement.append(div);
    boxes[i] = div;
  }
  const context = new AudioContext();
  // アナライザーを生成
  const nodeAnalyser = context.createAnalyser();
  // フーリエ変換を行う分割数。2の乗数でなくてはならない
  nodeAnalyser.fftSize = FFT_SIZE;
  // 0～1の範囲でデータの動きの速さ 0だともっとも速く、1に近づくほど遅くなる
  nodeAnalyser.smoothingTimeConstant = 0.5;
  // オーディオの出力先を設定
  nodeAnalyser.connect(context.destination);
  // audio 要素と紐付ける
  const nodeSource = context.createMediaElementSource(audio);
  nodeSource.connect(nodeAnalyser);
  function loop() {
    const freqByteData = new Uint8Array(FFT_SIZE / 2);
    nodeAnalyser.getByteFrequencyData(freqByteData);
    for (let i = 0; i < freqByteData.length; i++) {
      const freqSum = freqByteData[i];
      const scale = freqSum / 256;
      const div = boxes[i];
      div.style.scale = `1 ${scale * 0.99 + 0.01}`;
    }
    requestAnimationFrame(loop);
  }
  loop();
}
audio.addEventListener("play", init);
