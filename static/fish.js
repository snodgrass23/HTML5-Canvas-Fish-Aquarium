function Sea(w, h) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
}
Sea.prototype.prepare = function () {
	var c = this.canvas,
		ctx = c.getContext('2d');
	
	var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	grad.addColorStop(0, '#6bc5ea');
	grad.addColorStop(0.1, '#1d7699');
	grad.addColorStop(0.5, '#0a3752');
	grad.addColorStop(1, '#072438');
	
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, c.width, c.height);
};
Sea.prototype.render = function(ctx) {
	var c = this.canvas;
	ctx.drawImage(c, 0, 0, c.width, c.height);
};


function Fish(x, y, w, h) {
	this.x = x;
	this.y = y;
	
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
}
Fish.prototype._add_fin = function(c, ctx, w) {
	console.log("_add_fin");
	var f = {
		s: c.width - w * rand(.1, .3),		// Start point
		y: c.height * rand(0, 1),		// direction / multiplier
		l: w * rand(.2, .5)		// Length of each point
	};
	
	for (var k in f) {
		console.log("f(" + k + ") = " + f[k]);
	}
	
	ctx.fillStyle = 'rgba(255, 255, 255, .3)';
	ctx.beginPath();
	ctx.moveTo(f.s, c.height * .5);
	ctx.lineTo(
		f.s - f.l, f.y
	);
	ctx.lineTo(
		f.s - f.l, c.height * .5
	);
	ctx.fill();
	
};
Fish.prototype.prepare = function() {
	var c = this.canvas,
		ctx = c.getContext('2d');

	// Draw the body
	
	var b = {		
		fb: c.width * rand(.3, .75),		// Front body bulge X
		rb: c.width * rand(.2, .25),		// Rear body bulge X
		f: c.height * rand(0, 0.35),			// Fat Y
		pt: c.height * rand(0.4, .8),		// Tail point distance
		tc: c.height * rand(0, 0.4),			// Tail cut center size		
		td: c.width * rand(0, .2)			// Tail depth		
	};
	
	// Draw the fins
	for (var i = ~~rand(0, 5); i > 0; i--) {
		this._add_fin(c, ctx, c.width - b.rb);
	}
	
	var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	grad.addColorStop(0, '#ffcc00');
	grad.addColorStop(.25, '#e69800');
	grad.addColorStop(.8, '#a25923')
	
	
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.moveTo(c.width, c.height * .5);		// Nose
	ctx.bezierCurveTo(						// Nose -> Top tail point
		b.fb, c.height + b.f,
		b.rb, 0,
		0, b.pt
	);
	ctx.bezierCurveTo(						// Top tail point -> Bottom tail point
		b.td, c.height * .5 - b.tc,
		b.td, c.height * .5 + b.tc,
		0, c.height - b.pt
	);
	ctx.bezierCurveTo(						// Bottom tail point -> Nose
		b.rb, c.height,
		b.fb, -b.f,
		c.width, c.height * .5
	);
	ctx.fill();
	
	// Draw the eye
	
	var eye_h = c.height * rand(0, .2),				// Eye height
		eye_s = c.height * rand(.05, .15), 			// Eye size
		pupil_s = eye_s * rand(.2, .9),				// Pupil size
		pupil_o = (eye_s - pupil_s) * rand(.2, .5),	// Pupil offset from center
		pupil_a = rand(0, Math.PI * 2);				// Pupil angle
	
	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	ctx.arc(
		c.width * .8, c.height * .5 - eye_h,
		eye_s, 0, Math.PI * 2,
		false
	);
	ctx.fill();
	
	ctx.fillStyle = '#000000';
	ctx.beginPath();
	ctx.arc(
		c.width * .8 + Math.cos(pupil_a) * pupil_o, c.height * .5 - eye_h + Math.sin(pupil_a) * pupil_o,
		pupil_s, 0, Math.PI * 2,
		false
	);
	ctx.fill();
	
};
Fish.prototype.render = function(ctx) {
	var c = this.canvas;
	console.log("Rendering at " + this.x + ", " + this.y + " dims: " + c.width + "x" + c.height);
	ctx.drawImage(c, this.x, this.y, c.width, c.height);
};


function View(el_id) {
	this.canvas = document.getElementById(el_id);
	this.ctx = this.canvas.getContext('2d');
}

function rand(a, b) {
	return Math.random() * (b - a) + a;
}

var view = new View('view');
var sea = new Sea(800, 480);
var fish = new Fish(100, 100, 100, 100);

sea.prepare();
fish.prepare();

sea.render(view.ctx);
fish.render(view.ctx);