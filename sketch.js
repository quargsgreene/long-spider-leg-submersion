// Undefined lyrics fill-in-the-blank game.
let sound1;
let sound2;
let mic;
let img;
const step = 20;
const angle = 110;
let currentAngle = 2;
let x;
let y;

let lString = 'A';
const numberOfLoops = 6;
const lRules = [];
lRules[0] = ['A', '-BF+AA+FB-'];
lRules[1] = ['B', '-AF-B-AFBA+'];

let whereInString = 0;

function preload() {
  sound1 = loadSound('Don\'t Touch.mp3');
  sound2 = loadSound('Don\'t Touch Synths.mp3');
  img = loadImage('bg1.jpg');
}

function setup() {
  const col = color(79, 206, 114, 100);
  const col2 = color(228, 245, 232);
  const col3 = color(157, 252, 182);
  const col4 = color(91, 2, 173);
  const col5 = color(255, 139, 64);

  createCanvas(windowWidth, windowHeight);
  background(img);

  mic = new p5.AudioIn();

  // First user task
  const userInput1 = createInput();
  userInput1.position(width / 4, height / 3);
  userInput1.style('background-color', col4);
  userInput1.style('color', col3);
  userInput1.id('prompt-1');

  const userMessage1 = createElement('p', '');
  userMessage1.position(userInput1.x + width / 8, userInput1.y - height / 10);
  userMessage1.style('color', col5);

  const checkUserAnswer1 = createButton('cHeCk');
  checkUserAnswer1.position(width / 4, (5 * height) / 12);
  checkUserAnswer1.style('background-color', col);
  checkUserAnswer1.style('color', col2);
  checkUserAnswer1.mousePressed(() => {
    if ((/studio/i).test(userInput1.value()) === true) {
      userMessage1.html('Correct!');
    } else {
      userMessage1.html('Nope :\)');
    }
  });

  // Second user task

  const userInput2 = createInput();
  userInput2.position(width / 2, (2 * height) / 3);
  userInput2.style('background-color', col5);
  userInput2.style('color', col3);
  userInput2.id('prompt-2');

  const userMessage2 = createP('');
  userMessage2.position(userInput2.x + width / 4, userInput2.y - height / 15);
  userMessage2.style('color', col4);

  const checkUserAnswer2 = createButton('ChEcK');
  checkUserAnswer2.position(width / 2, (3 * height) / 4);
  checkUserAnswer2.style('background-color', col);
  checkUserAnswer2.style('color', col2);

  const lyrics1 = createP('It was just another sad day at the');
  lyrics1.position(userInput1.x - width / 10, (userInput1.y - 2 * height) / 10);
  lyrics1.style('font-family', 'helvetica');
  lyrics1.style('color', 'rgb(60, 1, 115)');
  lyrics1.style('font-size', '2em');

  const lyrics2 = createP('working to uphold the status quo, get on the');

  lyrics2.position(userInput2.x - width / 10, userInput2.y - height / 6);
  lyrics2.style('font-family', 'helvetica');
  lyrics2.style('color', col5);
  lyrics2.style('font-size', '1em');

  checkUserAnswer2.mousePressed(() => {
    if ((/radio/i).test(userInput2.value()) === true) {
      userMessage2.html('Those are the right letters!');
    } else {
      userMessage2.html('Less than satisfactory work there!');
    }
  });

  // Audio hints
  const hint1 = createButton('Play first hint ;/');
  hint1.position((4 * width) / 5, height / 8);
  hint1.mousePressed(() => {
    playSound(sound1);
  });

  const hint2 = createButton('Play second hint :0');
  hint2.position((78 * width) / 100, height / 3);
  hint2.mousePressed(() => {
    playSound(sound2);
  });
  // paraphrased quotes from my own writing
  const sentences = createP('My dream of 11 years finally came true. I cannot father children.');
  sentences.position(width / 10, (4 * height) / 5);
  sentences.style('font-family', 'Courier');
  sentences.style('color', 'rgb(23, 0, 43)');
  sentences.style('font-size', '1.5em');

  // invisible alert
  const invisibleAlertBtn = createButton('Treasure');
  invisibleAlertBtn.position((3 * width) / 4, height / 12);
  invisibleAlertBtn.class('invisible');
  invisibleAlertBtn.mousePressed(() => {
    alert('I congratulated her. It was our 150th conversation.\ I keep statistics on my friends. ');
  });

  // underwear arranger

  const underwearInput = createInput();
  underwearInput.position(width / 10, (2 * height) / 3);
  underwearInput.style('background-color', 'rgb(120, 255, 120)');
  underwearInput.style('color', 'grey');
  underwearInput.id('prompt-3');

  const quantityPrompt = createP('How many underwear do you have?');
  quantityPrompt.position(underwearInput.x, underwearInput.y - 50);

  const userMessage3 = createP('');
  userMessage3.position((3 * width) / 4, height / 2);

  const displayUnderwearArrangements = createButton('Find something out about your underwear!');
  displayUnderwearArrangements.position(underwearInput.x, underwearInput.y + 50);
  displayUnderwearArrangements.style('background-color', 'rgba(0,0,0,0.3)');
  displayUnderwearArrangements.style('color', col2);
  displayUnderwearArrangements.id('underwear');

  displayUnderwearArrangements.mousePressed(() => {
    const underwearInt = parseInt(underwearInput.value(), 10);
    if (isNaN(underwearInt) || underwearInt < 0) {
      const err = new Error('Please give the non-Euclidean ventricle machine a non-negative integer quantity of underwear. Don\'t worry! I won\'t hit you with a spatula.');
      userMessage3.html(err);
    } else if (underwearInt === 0) {
      userMessage3.html('There is only one way to wear your underwear. Have fun!');
    } else {
      userMessage3.html(`You can line up your underwear on top of a refrigerator in ${factorial(underwearInt)} ways! Have at it ;)`);
    }

    function factorial(num) {
      if (num === 0) {
        return 1;
      }
      return num * factorial(num - 1);
    }
  });

  // Starting up Lindenmayer
  stroke(255, 217, 0, 100);
  x = width / 3;
  y = height - 100;

  for (let i = 0; i < numberOfLoops; i++) {
    lString = lindenmayer(lString);
  }
}

function draw() {
  // Some visual embellishment of the user tasks

  const col = color(0, 100);
  push();
  const rot = map(mouseY, 0, height, 0, 5);
  textSize(18);
  fill(232, 93, 0);
  rotate(-rot);
  stroke(col);
  text('It was just another sad day at the', width / 4, height / 4);
  pop();

  push();
  const size = map(mouseX, 0, width, 12, 14);
  textSize(size);
  textFont('Courier');
  const from = color(132, 0, 255);
  const to = color(79, 206, 114);
  const between = lerpColor(from, to, sin(millis() / 1000));
  fill(between);
  stroke(col);
  text('working to uphold the status quo, get on the', width / 2, height / 2);
  pop();

  // Draw Lindenmayer

  drawLSystem(lString[whereInString]);
  whereInString++;
  if (whereInString > lString.length - 1) {
    whereInString = 0;
  }
}

function lindenmayer(str) {
  let outputString = '';

  for (let i = 0; i < str.length; i++) {
    let ismatch = 0;
    for (let j = 0; j < lRules.length; j++) {
      if (str[i] === lRules[j][0]) {
        outputString += lRules[j][1];
        ismatch = 1;
        break;
      }
    }
    if (ismatch === 0) {
      outputString += str[i];
    }
  }
  return outputString;
}

function drawLSystem(constantOrVariable) {
  if (constantOrVariable === 'F') {
    const x1 = x + step * cos(radians(currentAngle));
    const y1 = y + step * sin(radians(currentAngle));
    line(x, y, x1, y1);

    x = x1;
    y = y1;
  } else if (constantOrVariable === '+') {
    currentAngle += angle;
  } else if (constantOrVariable === '-') {
    currentAngle -= angle;
  }

  const micLevel = mic.getLevel();

  const amp = 100 + micLevel;

  const from = color(232, 93, 0, amp);
  const to = color(46, 18, 0, amp);
  const between = lerpColor(from, to, micLevel / 2);

  let radius = 0;
  radius += 150 * micLevel;
  radius += 150 * micLevel;
  radius += 150 * micLevel;
  radius /= 3;

  fill(between);
  polygon(x, y, 20, radius / 2, radius);
}

function mousePressed() {
  userStartAudio();
}

function playSound(audio) {
  audio.play();
}

function polygon(xRadius, yRadius, numberOfSides, size1, size2) {
  const micLevel = mic.getLevel();
  const sides = map(micLevel, 0, 1, 0, numberOfSides);
  const polygonAngle = (2 * PI) / numberOfSides + sides + random(0.1);
  beginShape();
  for (let i = 0; i < numberOfSides; i += polygonAngle) {
    vertex(xRadius + size1 * cos(i), yRadius + size2 * sin(i));
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(img);
}
