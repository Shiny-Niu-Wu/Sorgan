let video;

let poseNet;

//when imbalanced, balancedState = -1
//when balanced but not paradise state, balancedState = 0
//when in paradies state, balancedState = 1;
let balancedState = -1;

let relationCol = {
  pos: {r: 255, g: 0, b: 0},
  neg: {r: 0, g: 0, b: 255}
};

function funcPos(){
  stroke(relationCol.pos.r, relationCol.pos.g, relationCol.pos.b);
}
function funcNeg(){
  stroke(relationCol.neg.r, relationCol.neg.g, relationCol.neg.b);
}
let posOrNeg = [funcPos, funcNeg];

// let col = {
//   phy: ["#e78561", "#e7eb30", "#e739c4"],
//   dig: ["#1976c4", "#19d59b", "#192a37"]
// };

//let selectedCol = Math.random(2);

//let headImg;

function preload() {
  head = loadImage('images/physical_scan_head.png');
  headBalanced = loadImage('images/physical_scan_head_balanced.png');
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

  if (balancedState == 1) {
    background(255, 0, 0);
  } else {
    background(0);
  }
  //background(0, 0, 0, 0);

  imageMode(CENTER);
  if (balancedState == -1) {
    // headImg = createElement('img');
    // headImg.src(head);
    // headImg.position(windowWidth/2, windowHeight/2, 300, 500);
    image(head, windowWidth/2, windowHeight/2, 300, 500);
  } else {
    image(headBalanced, windowWidth/2, windowHeight/2, 300, 500);
  }


  let phySelf = {x: windowWidth/2, y: windowHeight/2-200};
  let virSelf = {x: windowWidth/2+120, y: windowHeight/2};
  let others = {x: windowWidth/2-120, y: windowHeight/2};

  //relation link between physical self and virtual self
  funcNeg();
  strokeWeight(6);
  line(phySelf.x, phySelf.y, virSelf.x, virSelf.y);
  //relation link between physical self and others
  funcNeg();
  strokeWeight(6);
  line(phySelf.x, phySelf.y, others.x, others.y);
  //relation link between virtual self and others
  funcNeg();
  strokeWeight(6);
  line(others.x, others.y, virSelf.x, virSelf.y);

  let r = windowWidth/6;
  noStroke();
  //virtual self circle
  fill(255);
  ellipseMode(CENTER);
  ellipse(virSelf.x, virSelf.y, r);
            fill(0);
            textFont("PT Sans Narrow");
            textAlign(CENTER, CENTER);
            text("virtual \nself", virSelf.x, virSelf.y);
  //physical self circle
  fill(2,93,170);
  ellipseMode(CENTER);
  ellipse(phySelf.x, phySelf.y, r);
            fill(0);
            textFont("PT Sans Narrow");
            textAlign(CENTER, CENTER);
            text("physical \nself", phySelf.x, phySelf.y);
  //others circle
  fill(4,93,113);
  ellipseMode(CENTER);
  ellipse(others.x, others.y, r);
            fill(0);
            textFont("PT Sans Narrow");
            textAlign(CENTER, CENTER);
            text("others", others.x, others.y);



  frameRate(0.25);
}

function getPoses(poses) {
  //console.log(poses);

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

  //drawDigital();

  //drawPhysical();

  //new individualCircle(random(100), random(100));
  drawIndividual();

  frameRate(random(50)/25);

  //noLoop();
}

function drawIndividual(){
  balancedState = random(2)-3;

  let phySelf = {x: windowWidth/2, y: windowHeight/2-200};
  let virSelf = {x: windowWidth/2+120, y: windowHeight/2};
  let others = {x: windowWidth/2-120, y: windowHeight/2};

  let dX = virSelf.x - others.x;
  let dY = phySelf.y - others.y;
  let circleX = others.x + random(dX);
  let circleY = others.y + random(dY);

  //relation link to physical self
  random(posOrNeg)();
  strokeWeight(1);
  line(circleX, circleY, phySelf.x, phySelf.y);
  //relation link to virtual self
  random(posOrNeg)();
  strokeWeight(1);
  line(circleX, circleY, virSelf.x, virSelf.y);
  //individual circles
  noStroke();
  fill(random(255), random(255), random(255));
  ellipse(circleX, circleY, 10);

  //relation link between physical self and virtual self
  random(posOrNeg)();
  strokeWeight(6);
  line(phySelf.x, phySelf.y, virSelf.x, virSelf.y);
  //relation link between physical self and others
  random(posOrNeg)();
  strokeWeight(6);
  line(phySelf.x, phySelf.y, others.x, others.y);
  //relation link between virtual self and others
  random(posOrNeg)();
  strokeWeight(6);
  line(others.x, others.y, virSelf.x, virSelf.y);

  let r = windowWidth/6;
  noStroke();
  //virtual self circle
  fill(255);
  ellipseMode(CENTER);
  ellipse(virSelf.x, virSelf.y, r);
            fill(0);
            textFont("PT Sans Narrow");
            textAlign(CENTER, CENTER);
            text("virtual \nself", virSelf.x, virSelf.y);
  //physical self circle
  fill(2,93,170);
  ellipseMode(CENTER);
  ellipse(phySelf.x, phySelf.y, r);
            fill(0);
            textFont("PT Sans Narrow");
            textAlign(CENTER, CENTER);
            text("physical \nself", phySelf.x, phySelf.y);
  //others circle
  fill(4,93,113);
  ellipseMode(CENTER);
  ellipse(others.x, others.y, r);
            fill(0);
            textFont("PT Sans Narrow");
            textAlign(CENTER, CENTER);
            text("others", others.x, others.y);
}

// function drawDigital(){
//   let r = 30;
//
//   let dX = random(-windowWidth/2 + r, windowWidth/2 - r);
//   let dY = random(-windowHeight/2 + r, windowHeight/2 - r);
//   fill(col.dig[1]);
//   stroke(col.dig[1]);
//   line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
//   noStroke();
//   ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);
//
//
//
//   dX = random(-windowWidth/2 + r, windowWidth/2 - r);
//   dY = random(-windowHeight/2 + r, windowHeight/2 - r);
//   fill(col.dig[0]);
//   stroke(col.dig[0]);
//   line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
//   noStroke();
//   ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);
//
//
//
//   dX = random(-windowWidth/2 + r, windowWidth/2 - r);
//   dY = random(-windowHeight/2 + r, windowHeight/2 - r);
//   fill(col.dig[2]);
//   stroke(col.dig[2]);
//   line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
//   noStroke();
//   ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);
// }
//
// function drawPhysical(){
//   let r = 30;
//
//   let dX = random(-windowWidth/2 + r, windowWidth/2 - r);
//   let dY = random(-windowHeight/2 + r, windowHeight/2 - r);
//   fill(col.phy[1]);
//   stroke(col.phy[1]);
//   line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
//   noStroke();
//   ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);
//
//
//
//   dX = random(-windowWidth/2 + r, windowWidth/2 - r);
//   dY = random(-windowHeight/2 + r, windowHeight/2 - r);
//   fill(col.phy[0]);
//   stroke(col.phy[0]);
//   line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
//   noStroke();
//   ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);
//
//
//
//   dX = random(-windowWidth/2 + r, windowWidth/2 - r);
//   dY = random(-windowHeight/2 + r, windowHeight/2 - r);
//   fill(col.phy[2]);
//   stroke(col.phy[2]);
//   line(windowWidth/2, windowHeight/2, windowWidth/2 + dX, windowHeight/2 + dY);
//   noStroke();
//   ellipse(windowWidth/2 + dX, windowHeight/2 + dY, r);
// }

// function deviceTurned(){
//   imageMode(CENTER);
//   image(head, windowWidth/2, windowHeight/2, 300, 500);
// }
