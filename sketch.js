<div>Teachable Machine Audio Model - p5.js and ml5.js</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
<script type="text/javascript">
  // Global variable to store the classifier
let classifier;
let resultP;

// Label
let label = 'listening...';

// Sound Classification Model
let soundModel = 'https://teachablemachine.withgoogle.com/models/VCKI6-w9j/';

// Timestamping
let timestamp1 = Date.now();
let today = new Date();
let timestamp2 = today.valueOf();

function preload() {
  // Load the model that registers only at probability of 0.95
  let options = { probailityThreshold: 0.9 };
  classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
  createCanvas(340, 340);
  resultP = createP('waiting...');
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(0);
  // Draw the label in the canvas
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  console.log(results[0]);
  label = results[0].label;
  resultP.html(`${results[0].label} : ${results[0].confidence}`);
  createDiv('Time: ' + today);
  createDiv('Sound Event: ' + results[0].label);
  createDiv('Confidence: ' + nf(results[0].confidence, 0, 2));
  
            

  
}
</script>