const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(localMediaStream => {
  video.srcObject = localMediaStream;
  video.play();
  })
  .catch(err => {
    console.error(`You have denied webcam access`, err);
  });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;


return setInterval(() => {
  ctx.drawImage(video, 0, 0, width, height);
  let pixels = ctx.getImageData(0, 0, width, height);
  // pixels = redEffect(pixels);
  pixels = rgbSplit(pixels);
  // ctx.globalAlpha = 0.9;
  ctx.putImageData(pixels, 0, 0);
  }, 26);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'image');
  link.innerHTML = `<img src="${data}" alt="How's that?" />`;
  strip.insertBefore(link, strip. firstChild)
  // console.log(data);

}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
  }

  function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}




getVideo();
video.addEventListener('canplay', paintToCanvas);



