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
	var f = {
		s: c.width - w * rand(.1, .3),		// Start point
		y: c.height * rand(0, 1),		// direction / multiplier
		l: w * rand(.2, .5)		// Length of each point
	};
	
	var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	grad.addColorStop(0, 'rgba(255,255,255,.25)');
	grad.addColorStop(.5, 'rgba(255,255,255,.1)');
	grad.addColorStop(1, 'rgba(255,255,255,.5)');
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.moveTo(f.s, c.height * .5);
	ctx.quadraticCurveTo(
		f.s - f.l * .5, f.y,
		f.s - f.l * 1.35, f.y
	);
	ctx.lineTo(
		f.s - f.l, c.height * .5
	);
	ctx.fill();
	
};
Fish.prototype._draw_scales = function(canvas, target_ctx) {
	var c = document.createElement('canvas'),
		ctx = c.getContext('2d');
	c.width = canvas.width;
	c.height = canvas.height;
	
	var scale_size = 11;
	ctx.strokeStyle = '#000';
	for (var x = 0; x < c.width * 2 / scale_size; x += 1) {
		for (var y = 0; y < c.height / scale_size; y += 1) {
			circle(ctx,
				x * scale_size * .5,
				y * scale_size + scale_size * .5 * (x % 2),
				scale_size * .5 - 1
			);
			glow(ctx, 3, '#000');		
			var opacity = (1 - (Math.abs((y * scale_size) - c.height * .5) / (c.height * .5)) * 1.25);
			opacity *= (1 - Math.abs((x * scale_size * .5) - c.width * .6) / (c.width * .7)) * 1.25;
			ctx.fillStyle = 'rgba(255,255,255,' + opacity + ')';
			ctx.fill();
			
		}
	}

	target_ctx.globalCompositeOperation = 'source-atop';
	target_ctx.drawImage(c, 0, 0, c.width, c.height);
	target_ctx.globalCompositeOperation = 'source-over';
};
Fish.prototype.prepare = function() {
	var c = this.canvas,
		ctx = c.getContext('2d');

	// Compute the body
	
	var b = {		
		fb: c.width * rand(.3, .75),		// Front body bulge X
		rb: c.width * rand(.15, .25),		// Rear body bulge X
		f: c.height * rand(0, 0.35),			// Fat Y
		pt: c.height * rand(0.25, .75),		// Tail point distance
		tc: c.height * rand(0, 0.4),			// Tail cut center size		
		td: c.width * rand(0, .2)			// Tail depth		
	};
		
	// Draw the body shape
	
	
	ctx.fillStyle = '#fff';
	ctx.beginPath();
	ctx.moveTo(c.width, c.height * .5);		// Nose
	ctx.bezierCurveTo(						// Nose -> Top tail point
		b.fb, c.height + b.f,
		b.rb, c.height * .15,
		0, b.pt				// Top tail point
	);
	ctx.bezierCurveTo(						// Top tail point -> Bottom tail point
		b.td, c.height * .5 - b.tc,
		b.td, c.height * .5 + b.tc,
		0, c.height - b.pt				// Bottom tail point
	);
	ctx.bezierCurveTo(						// Bottom tail point -> Nose
		b.rb, c.height - c.height * .15,
		b.fb, -b.f,
		c.width, c.height * .5
	);


	ctx.fill();
	
	

	// Draw the scale texture
	this._draw_scales(c, ctx);
		
	
	// Color/shading overlay!
	
	//var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);


	var grad = [];

	grad[0] = ctx.createRadialGradient(
		0.64 * c.width, 0.45 * c.height, c.width * .1,
		0.5 * c.width, 0.5 * c.height, c.width * .8
	);
	grad[0].addColorStop(0, 'rgba(255,204,0,.7)');
	grad[0].addColorStop(.25, 'rgba(230, 152, 0, .9)');
	grad[0].addColorStop(.8, 'rgba(146,62,0,1)')


	grad[1] = ctx.createRadialGradient(
		0.64 * c.width, 0.7 * c.height, c.width * .1,
		0.5 * c.width, 0.5 * c.height, c.width * .8
	);
	grad[1].addColorStop(.6, 'rgba(129,153,33,.9)');
	grad[1].addColorStop(.45, 'rgba(252,229,127,1)');
	grad[1].addColorStop(.3, 'rgba(232,135,20,.8)');
	grad[1].addColorStop(0, 'rgba(67,106,103,1)');

	grad[2] = ctx.createLinearGradient(
		0, c.height * .45, c.width, c.height
	);
	grad[2].addColorStop(.3, 'rgba(254,186,18,.9)');
	grad[2].addColorStop(.32, 'rgba(0, 0, 0, .7)');
	grad[2].addColorStop(.35, 'rgba(255,255,255,.9)');
	grad[2].addColorStop(.43, 'rgba(255,255,255,.9)');
	grad[2].addColorStop(.45, 'rgba(0,0,0,.7)');
	grad[2].addColorStop(.47, 'rgba(254,186,18,.9)');
	grad[2].addColorStop(.55, 'rgba(254,186,18,.9)');
	grad[2].addColorStop(.57, 'rgba(0, 0, 0, .7)');
	grad[2].addColorStop(.60, 'rgba(255, 255, 255, .9)');
	grad[2].addColorStop(.62, 'rgba(255, 255, 255, .9)');
	grad[2].addColorStop(.64, 'rgba(0, 0, 0, .7)');
	grad[2].addColorStop(.66, 'rgba(254, 186, 18, .9)');
	
	grad[3] = ctx.createRadialGradient(
		0.8 * c.width, c.height, c.width * .1,
		0.8 * c.width, c.height, c.width * .8
	);
	grad[3].addColorStop(0, 'rgba(255,255,255,.9)');
	grad[3].addColorStop(.65, 'rgba(128, 128, 128, .9)');
	grad[3].addColorStop(.7, 'rgba(0,0,0,.7)');
	grad[3].addColorStop(.75, 'rgba(255, 255, 255, .5)');
	grad[3].addColorStop(.8, 'rgba(255, 255, 255, .5)');
	grad[3].addColorStop(.95, 'rgba(128, 128, 128, .8)');
	
	grad[4] = ctx.createRadialGradient(
		0.8 * c.width, .5 * c.height, c.width * .1,
		0.8 * c.width, .5 * c.height, c.width * .6
	);
	grad[4].addColorStop(.3, 'rgba(200,0,0,.9)');
	grad[4].addColorStop(.4, 'rgba(255, 100, 0, .8)');
	grad[4].addColorStop(.75, 'rgba(255, 0, 0,.9)');
	grad[4].addColorStop(1, 'rgba(200, 0, 0, .7)');
	
	var which_grad = ~~rand(0, grad.length);
	
	ctx.globalAlpha = 0.9;
	ctx.globalCompositeOperation = 'source-atop';
	ctx.fillStyle = grad[which_grad];
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.globalAlpha = 1;
	

	// Draw the fins
	ctx.globalCompositeOperation = 'destination-over';
	for (var i = ~~rand(0, 5); i > 0; i--) {
		this._add_fin(c, ctx, c.width - b.rb);
	}
	ctx.globalCompositeOperation = 'source-over';

	
	// Draw the eye
	
	var eye_h = c.height * rand(.04, .15),				// Eye height
		eye_x = c.width * .8,	// Eye X
		eye_s = c.height * rand(.05, .10), 			// Eye size
		pupil_s = eye_s * rand(.5, .8),				// Pupil size
		pupil_o = (eye_s - pupil_s) * rand(.2, .5),	// Pupil offset from center
		pupil_a = rand(0, Math.PI * 2);				// Pupil angle
	
	var eye_grad = ctx.createRadialGradient(
		eye_x, c.height * .5 - eye_h, 0,
		eye_x, c.height * .5 - eye_h, eye_s);
	eye_grad.addColorStop(.7, 'rgba(255,255,255,1)');
	eye_grad.addColorStop(1, 'rgba(255,255,255,.5)');
		
	ctx.fillStyle = eye_grad; //'#ffffff';
	ctx.beginPath();
	ctx.arc(
		eye_x, c.height * .5 - eye_h,
		eye_s, 0, Math.PI * 2,
		false
	);
	
	glow(ctx, 5, 'rgba(0,0,0,.7)');
	ctx.fill();
	glow(ctx, 0, '');
	
	ctx.fillStyle = '#000000';
	ctx.beginPath();
	ctx.arc(
		eye_x + Math.cos(pupil_a) * pupil_o, c.height * .5 - eye_h + Math.sin(pupil_a) * pupil_o,
		pupil_s, 0, Math.PI * 2,
		false
	);
	ctx.fill();
	
};
Fish.prototype.render = function(ctx) {
	var c = this.canvas;

	glow(ctx, 25, 'rgba(255,255,255,0.25)');		// TODO: Find a way to optimize this in the cached sprite
	
	ctx.drawImage(c, this.x, this.y, c.width, c.height);
};


function View(el_id) {
	this.canvas = document.getElementById(el_id);
	this.ctx = this.canvas.getContext('2d');
}

function rand(a, b) {
	return Math.random() * (b - a) + a;
}

function circle(ctx, x, y, r) {
	ctx.beginPath();
	ctx.arc(
		x, y,
		r, 0, Math.PI * 2,
		false
	);
}

// When precomputing, seems to lock transparency so you can't do this in the original sprites =(
function glow(ctx, dist, color) {
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = dist;
	ctx.shadowColor = color;
}

