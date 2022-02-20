let video;

let poseNet;

let col = {
  phy: ["#e78561", "#e7eb30", "#e739c4"],
  dig: ["#1976c4", "#19d59b", "#192a37"]
};

//let selectedCol = Math.random(2);

function preload() {
  head = loadImage('images/physical_scan_head.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  //capture webcam
  //should be able to choose other cameras when connected to computer
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);

  //to avoid double image
  video.hide();

  //loading ml5
  poseNet = ml5.poseNet(video, modelReady);

  // Listen to new 'pose' events
  poseNet.on('pose', getPoses);

  //multi-player
  //poseNet.detectionType = 'multiple';

  //drawPhysical();

  background(0);
  imageMode(CENTER);
  image(head, windowWidth/2, windowHeight/2, 300, 500);
  //image(head, 250, 250, 300, 500);

  //this needs to be randomized
  frameRate(0.25);
}

function getPoses(poses) {
  console.log(poses);

  //poses is an array
  if (poses.length > 0) {
    let eyeL = poses[0].pose.keypoints[1].score;
    let eyeR = poses[0].pose.keypoints[2].score;
  }
}

//define modelReady and call that function
function modelReady() {
  console.log('model ready');
}

function draw() {

  //mirror the webcam capture
  // translate(width,0);
  // scale(-1, 1);
  // image(video, 0, 0, windowWidth, windowHeight);

  drawDigital();

  drawPhysical();

  frameRate(random(50)/100);

  //noLoop();


}

function drawDigital(){
  let r = 30;

  let dX = random(-windowWidth/2 + r, windowWidth/2 - r);
  let dY = random(-windowHeight/2 + r, windowHeight/2 - r);
  fill(col.dig[1]);
  stroke(col.dig[1]);
  line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
  noStroke();
  ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);



  dX = random(-windowWidth/2 + r, windowWidth/2 - r);
  dY = random(-windowHeight/2 + r, windowHeight/2 - r);
  fill(col.dig[0]);
  stroke(col.dig[0]);
  line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
  noStroke();
  ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);



  dX = random(-windowWidth/2 + r, windowWidth/2 - r);
  dY = random(-windowHeight/2 + r, windowHeight/2 - r);
  fill(col.dig[2]);
  stroke(col.dig[2]);
  line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
  noStroke();
  ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);


  //loop();
}

function drawPhysical(){
  let r = 30;

  let dX = random(-windowWidth/2 + r, windowWidth/2 - r);
  let dY = random(-windowHeight/2 + r, windowHeight/2 - r);
  fill(col.phy[1]);
  stroke(col.phy[1]);
  line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
  noStroke();
  ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);



  dX = random(-windowWidth/2 + r, windowWidth/2 - r);
  dY = random(-windowHeight/2 + r, windowHeight/2 - r);
  fill(col.phy[0]);
  stroke(col.phy[0]);
  line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
  noStroke();
  ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);



  dX = random(-windowWidth/2 + r, windowWidth/2 - r);
  dY = random(-windowHeight/2 + r, windowHeight/2 - r);
  fill(col.phy[2]);
  stroke(col.phy[2]);
  line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
  noStroke();
  ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);
}

function deviceTurned(){
  imageMode(CENTER);
  image(head, windowWidth/2, windowHeight/2, 300, 500);
}

  //TO DO:
  //count number of ellipses
  //to affect head tiltness and sorgan tiltness
  //make the line cursive
  //create a spearate randomized framecount for physical (make believe)
  //detect all face points to instantiate physical balls
  //detect phone rotation and remap balls
