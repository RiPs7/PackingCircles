let circles = [];
let spots = [];
let img;
let picked = 0;

function preload () {
	if (random(1) < 0.5) {
  		img = loadImage("i_love_you.png");
  		picked = 1;
  	} else {
  		img = loadImage("i_love_you_2.jpg");
  		picked = 2;
  	}
}

function setup() {
  createCanvas(img.width, img.height);
  console.log(img.width, img.height)

  for (let i = 0; i < width; i++) {
  	for (let j = 0; j < height; j++) {
	  let px = img.get(i, j)
	  if (picked == 1) {
      	if (brightness(px) > 255 / 3) {
  		  spots.push({x: i, y: j});
  		}
  	  } else {
  	  	if (brightness(px) == 0) {
  		  spots.push({x: i, y: j});
  		}
  	  }
  	}
  }
}

function draw() {
	background(0);

	let totalCircles = 10;
	let countCircles = 0;
	let totalAttempts = 100;
	let countAttempts = 0;
	while (countCircles < totalCircles && countAttempts < totalAttempts) {
		let circle = newCircle();
		if (circle !== null) {
			circles.push(circle);
			countCircles++;
		}
		countAttempts++;
	}

	circles.forEach(c => {
		c.update(circles);
	});

	if (countAttempts == totalAttempts) {
		noLoop();
		console.debug('Finished');
	}
}

function newCircle () {
	let spot = random(spots);
	let x = spot.x;
	let y = spot.y;
	let valid = true;
	circles.forEach(c => {
		if (dist(x, y, c.x, c.y) < c.r) {
			valid = false;
			return;
		}
	});
	return valid ? new Circle(x, y) : null;
}
