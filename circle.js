class Circle {
	constructor (x, y) {
		this.x = x;
		this.y = y;
		this.r = 1;
		this.speed = (Math.PI / 10) / 2;
		this.growing = true;
		this.overlapping = false;
	}

	update (circles) {
		if (this.growing && this.edges()) {
			this.growing = false;
		} else if (this.growing) {
			circles.forEach(c => {
				if (this === c) {
					return;
				}
				if (dist(this.x, this.y, c.x, c.y) < this.r + c.r + 2) {
					this.overlapping = true;
					return;
				}
			});
		}
		if (this.growing && !this.overlapping) {
			this.grow();
		}
		this.show();
	}

	edges () {
		return (
			this.x + this.r >= width ||
			this.x - this.r <= 0 ||
			this.y + this.r >= height ||
			this.y - this.r <= 0
		);
	}

	grow () {
		this.r += this.speed;
	}

	show () {
		stroke(255);
		strokeWeight(2);
		noFill();
		ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
	}

}