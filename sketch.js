//Undefined lyrics fill-in-the-blank game.

let x, y;
let current_angle = 2;
let step = 20;
let angle = 110;
let music_excerpt_1;
let music_excerpt_2;
let mic,img;

let the_string = 'A';
let number_of_loops = 6;
let the_rules = [];
the_rules[0] = ['A', '-BF+AA+FB-'];
the_rules[1] = ['B', '-AF-B-AFBA+'];

let where_in_string = 0;

function preload() {
  music_excerpt_1 = loadSound('04082021.wav');
  music_excerpt_2 = loadSound('040820212.wav');
  img = loadImage('bg1.jpg');
}



function setup() {

  let col = color(79, 206, 114, 100);
  let col2 = color(228, 245, 232);
  let col3 = color(157, 252, 182);
  let col4 = color(91, 2, 173);
  let col5 = color(255, 139, 64);

  let canvas = createCanvas(windowWidth, windowHeight);
  background(img);

  mic = new p5.AudioIn();

  //First user task

  let blank_1 = createInput();
  blank_1.position(width / 4, height / 3);
  blank_1.style('background-color', col4);
  blank_1.style('color', col3);
  blank_1.style('font-family', 'Monaco');

  let user_message_1 = createElement('p', '');
  user_message_1.position(blank_1.x + width / 8, blank_1.y - height / 10);
  user_message_1.style('font-family', 'Monaco');
  user_message_1.style('color', col5);

  let check_1 = createButton('cHeCk');
  check_1.position(width / 4, 5 * height / 12);
  check_1.style('background-color', col);
  check_1.style('color', col2);
  check_1.style('font-family', 'Monaco');
  check_1.mousePressed(function() {

    if ((/predictable/i).test(blank_1.value()) === true) {
      user_message_1.html('Correct!');
    } else {
      user_message_1.html('Nope :\)');
    }

  });

  //Second user task

  let blank_2 = createInput();
  blank_2.position(width / 2, 2 * height / 3);
  blank_2.style('background-color', col5);
  blank_2.style('color', col3);
  blank_2.style('font-family', 'Monaco');

  let user_message_2 = createP('');
  user_message_2.position(blank_2.x + width / 4, blank_2.y - height / 15);
  user_message_2.style('color', col4);
  user_message_2.style('font-family', 'Monaco');

  let check_2 = createButton('ChEcK');
  check_2.position(width / 2, 3 * height / 4);
  check_2.style('background-color', col);
  check_2.style('color', col2);
  check_2.style('font-family', 'Monaco');

  let lyrics_1 = createP('It\'s inevitable that most of us are on a');
  lyrics_1.position(blank_1.x - width / 10, blank_1.y - 2 * height / 10);
  lyrics_1.style('font-family', 'helvetica');
  lyrics_1.style('color', 'rgb(60, 1, 115)');
  lyrics_1.style('font-size', '2em');

  let lyrics_2 = createP('line of meaningless assembly trying to');

  lyrics_2.position(blank_2.x - width / 10, blank_2.y - height / 6);
  lyrics_2.style('font-family', 'helvetica');
  lyrics_2.style('color', col5);
  lyrics_2.style('font-size', '1em');


  check_2.mousePressed(function() {

    if ((/breed/i).test(blank_2.value()) === true) {
      user_message_2.html('Those are the right letters!');
    } else {
      user_message_2.html('Less than satisfactory work there!');
    }
  });

  //Audio hints

  let hint_1 = createButton('Play first hint ;/');
  hint_1.position(4 * width / 5, height / 8);
  hint_1.mousePressed(function() {
    playSound(music_excerpt_1);
  });

  let hint_2 = createButton('Play second hint :0');
  hint_2.position(78 * width / 100, height / 3);
  hint_2.mousePressed(function() {
      playSound(music_excerpt_2);
    }

  );
	// book chapter sentences
	let sentences = createP('My dream of 11 years finally came true. I got a vasectomy.');
	sentences.position(width/10,4*height/5);
	sentences.style('font-family','Courier');
	sentences.style('color','rgb(23, 0, 43)');
	sentences.style('font-size','1.5em');
	
	//invisible alert
	
	let invisibleAlertBtn = createButton('Treasure');
	invisibleAlertBtn.position(3*width/4,height/12);
	invisibleAlertBtn.style('background-color','rgba(0,0,0,0)');
	invisibleAlertBtn.style('border','none');
	invisibleAlertBtn.style('color','rgba(0,0,0,0)');
	invisibleAlertBtn.style('width','1px');
	invisibleAlertBtn.style('height','1px');
	invisibleAlertBtn.style('font-size','1px');
	invisibleAlertBtn.mousePressed(function(){
		alert('I congratulated her. It was our 150th conversation. I keep statistics on my friends. ');
	});
	
	//underwear arranger
	
	let underwearInput = createInput();
	underwearInput.position(width/10,2*height/3);
	underwearInput.style('background-color','rgb(120, 255, 120)');
	underwearInput.style('font-family','Monaco');
	underwearInput.style('color','grey');
	
	let quantityPrompt = createP('How many underwear do you have?');
	quantityPrompt.position(underwearInput.x,underwearInput.y-50);
	quantityPrompt.style('font-family','Monaco');
	quantityPrompt.style('color','white');
	
	let user_message_3 = createP('');
  user_message_3.position(3*width/4, height/2);
  user_message_3.style('color', 'white');
  user_message_3.style('font-family', 'Monaco');
	
	let displayUnderwearArrangements = createButton('Find something out about your underwear!');
	displayUnderwearArrangements.position(underwearInput.x,underwearInput.y+50);
	displayUnderwearArrangements.style('background-color', 'rgba(0,0,0,0.3)');
  displayUnderwearArrangements.style('color', col2);
  displayUnderwearArrangements.style('font-family', 'Monaco');
	
	displayUnderwearArrangements.mousePressed(function underwearArrangements (){
		let underwearInt = parseInt(underwearInput.value());
		if(isNaN(underwearInt) || underwearInt<0){
			let err = new Error('Please give the lady starfish machine a non-negative integer quantity of underwear. Don\'t worry. I won\'t hit you with a spatula.');
			user_message_3.html(err);
		}
		
		if(underwearInt===0){
			user_message_3.html('There is only one way to wear your underwear. Have fun going commando!');
		}else{
			user_message_3.html("You can line up your underwear on top of a seesaw in " + factorial(underwearInt) + " ways! Have at it ;)");
		}
		
		function factorial (x){
			if(x===0){
				return 1;
			}else{
				return x*factorial(x-1);
			}
		}

	});
	

  //Starting up Lindenmayer

  stroke(255, 217, 0, 100);
  x = width / 3;
  y = height - 100;


  for (let i = 0; i < number_of_loops; i++) {
    the_string = lindenmayer(the_string);
  }


}


function draw() {

  //Some visual embellishment of the user tasks

  let col = color(0, 100);
  push();
  let rot = map(mouseY, 0, height, 0, 5);
  textSize(18);
  fill(232, 93, 0);
  rotate(-rot);
  stroke(col);
  text("It's inevitable that most of us are on a", width / 4, height / 4);
  pop();


  push();
  let size = map(mouseX, 0, width, 12, 14);
  textSize(size);
  textFont('Courier');
  let from = color(132, 0, 255);
  let to = color(79, 206, 114);
  let between = lerpColor(from, to, sin(millis() / 1000));
  fill(between);
  stroke(col);
  text("line of meaningless assembly trying to", width / 2, height / 2);
  pop();

  //Draw Lindenmayer

  drawIt(the_string[where_in_string]);

  where_in_string++;
  if (where_in_string > the_string.length - 1) {
    where_in_string = 0;
  }


}

function lindenmayer(s) {
  let outputstring = '';

  for (let i = 0; i < s.length; i++) {
    let ismatch = 0;
    for (let j = 0; j < the_rules.length; j++) {
      if (s[i] == the_rules[j][0]) {
        outputstring += the_rules[j][1];
        ismatch = 1;
        break;
      }
    }
    if (ismatch == 0) {
      outputstring += s[i];
    }
  }
  return outputstring;
}

function drawIt(k) {
  if (k == 'F') {
    let x1 = x + step * cos(radians(current_angle));
    let y1 = y + step * sin(radians(current_angle));
    line(x, y, x1, y1);

    x = x1;
    y = y1;
  } else if (k == '+') {
    current_angle += angle;
  } else if (k == '-') {
    current_angle -= angle;
  }

  let micLevel = mic.getLevel();

  let a = 100 + micLevel;

  let from = color(232, 93, 0, a);
  let to = color(46, 18, 0, a);
  let between = lerpColor(from, to, micLevel / 2);


  let radius = 0;
  radius += 150 * micLevel;
  radius += 150 * micLevel;
  radius += 150 * micLevel;
  radius = radius / 3;


  fill(between);
  polygon(x, y, 20, radius / 2, radius);

}

function mousePressed() {
  userStartAudio();
}

function playSound(audio) {
  audio.play();
}

function polygon(x, y, n, size1, size2) {
  let micLevel = mic.getLevel();
  let sides = map(micLevel, 0, 1, 0, n);
  let angle = 2 * PI / n + sides + random(0.1);
  beginShape();
  for (let i = 0; i < n; i += angle) {
    vertex(x + size1 * cos(i), y + size2 * sin(i));
  }
  endShape(CLOSE);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(img);
}