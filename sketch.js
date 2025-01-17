let sliderRate;
let sliderDrywet;
let isLoaded = false;
let song;

let amp;
function setup() {
  createCanvas(windowWidth, windowHeight / 2);

  soundFile = createFileInput(handleFile);
  soundFile.size(windowWidth, 50);
  sliderRate = createSlider(0.1, 1, 0.8, 0.05);
  sliderRate.size(windowWidth / 3, windowHeight / 50);
  sliderDrywet = createSlider(0, 0.75, 0.4, 0.05);
  sliderDrywet.size(windowWidth / 3, windowHeight / 50);
  reverb = new p5.Reverb();
  amp = new p5.Amplitude();
}

function handleFile(file) {
  if (song) {
    song.dispose();
  }
  if (file.type == "audio") {
    song = loadSound(file, audioLoaded);
  }
}

function audioLoaded() {
  isLoaded = true;
  song.disconnect();
  reverb.process(song, 5, 4);
  song.loop();
}

function draw() {
  background(255, 10);
  strokeWeight(3);
  if (isLoaded) {
    song.rate(sliderRate.value());
    reverb.drywet(sliderDrywet.value());
  }
  let val = amp.getLevel();
  val = map(val, 0, 1, windowWidth/5, windowWidth/3);
  ellipse(windowWidth / 2, windowHeight / 4, val, val);
}
