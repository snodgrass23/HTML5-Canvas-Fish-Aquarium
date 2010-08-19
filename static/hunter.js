// !View

function View(el_id) {
	this.canvas = document.getElementById(el_id);
	this.ctx = this.canvas.getContext('2d');
	
	var canvas = document.getElementById('view');
	canvas.width = window.innerWith || document.documentElement.clientWidth;
	canvas.height = window.innerHeight || document.documentElement.clientHeight;
}
View.prototype.resize = function(w, h) {
	this.canvas.width = w;
	this.canvas.height = h;
};
View.prototype.clear = function() {
	this.canvas.width = this.canvas.width;
}

// !Fish

function Fish(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
    this.s = rand(0, 4);
	
	this.canvas = [];
	
	this._fingerprint();

	for (var i = 0; i < Fish.frames; i++) {
		this.prepare(i);
	}	
	
	Fish.all.push(this);
}
Fish.frames = 20;
Fish.all = [];
Fish.prototype._fingerprint = function() {
	this.fins = [];
	var h_space = 10;
	this.fingerprint = {
		nx: this.w - h_space,							// Nose X
		ny: this.h * .5,					// Nose Y
		fb: this.w * rand(.3, .75),			// Front body bulge X
		rb: this.w * rand(.15, .25),		// Rear body bulge X
		f: this.h * rand(0, 0.35),			// Fat Y
		px: h_space,						// Tail point X
		pt: this.h * rand(0.25, .75),		// Tail point distance
		tc: this.h * rand(0, 0.4),			// Tail cut center size		
		td: this.w * rand(0, .2),			// Tail depth		
		grad: ~~rand(0, 5),
		fins: []
	};
	var fin_space = this.w - this.fingerprint.rb;
	for (var i = ~~rand(0, 5); i > 0; i--) {
		var f = {
			s: this.w - fin_space * rand(.1, .3),		// Start point
			y: this.h * rand(0, 1),		// direction / multiplier
			l: fin_space * rand(.2, .5)		// Length of each point
		}
		this.fingerprint.fins.push(f);
	}
	this.fingerprint.eye = {
		h: this.h * rand(.04, .15),				// Eye height
		x: this.w * .8,	// Eye X
		s: this.h * rand(.05, .10) 			// Eye size
	};
	this.fingerprint.pupil = {
		s: this.fingerprint.eye.s * rand(.5, .8),				// Pupil size
		a: rand(0, Math.PI * 2)				// Pupil angle
	};
	this.fingerprint.pupil.o = (this.fingerprint.eye.s - this.fingerprint.pupil.s) * rand(.2, .5);	// Pupil offset from center
};
Fish.prototype._draw_shape = function(c, ctx, b, frame) {
	var angle = ((Math.PI * 2) / (Fish.frames)) * frame,
		r = this.w * 0.1;
	var top_pt = [b.px + r * Math.cos(angle), b.pt], // + r * Math.sin(angle)],
		bottom_pt = [b.px + r * Math.cos(angle + Math.PI * .5), c.height - b.pt]; // + r * Math.sin(angle * Math.PI)];

	ctx.fillStyle = '#fff';
	ctx.beginPath();
	ctx.moveTo(b.nx, b.ny);					// Nose
	ctx.bezierCurveTo(						// Nose -> Top tail point
		b.fb, c.height + b.f,
		b.rb, c.height * .15,
		top_pt[0], top_pt[1]				// Top tail point
	);
	ctx.bezierCurveTo(						// Top tail point -> Bottom tail point
		b.td, c.height * .5 - b.tc,
		b.td, c.height * .5 + b.tc,
		bottom_pt[0], bottom_pt[1]				// Bottom tail point
	);
	ctx.bezierCurveTo(						// Bottom tail point -> Nose
		b.rb, c.height - c.height * .15,
		b.fb, -b.f,
		b.nx, b.ny
	);
	ctx.fill();
};
Fish.prototype._draw_fins = function(c, ctx, b, frame) {
	var angle = ((Math.PI * 2) / (Fish.frames)) * frame,
		r = this.w * .025;
	var dx = r * Math.cos(angle);
	
	ctx.globalCompositeOperation = 'destination-over';
	for (var i in b.fins) {
		var f = b.fins[i];
		var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
		grad.addColorStop(0, 'rgba(255,255,255,.25)');
		grad.addColorStop(.5, 'rgba(255,255,255,.1)');
		grad.addColorStop(1, 'rgba(255,255,255,.5)');
		ctx.fillStyle = grad;
		ctx.beginPath();
		ctx.moveTo(f.s, c.height * .5);
		ctx.quadraticCurveTo(
			f.s - f.l * .5, f.y,
			f.s - f.l * 1.35 - dx, f.y
		);
		ctx.lineTo(
			f.s - f.l, c.height * .5
		);
		ctx.fill();
	}
	ctx.globalCompositeOperation = 'source-over';
};
Fish.prototype._draw_scales = function(canvas, target_ctx, b) {
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
Fish.prototype._draw_colors = function(c, ctx, b) {
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
	
	ctx.globalAlpha = 0.9;
	ctx.globalCompositeOperation = 'source-atop';
	ctx.fillStyle = grad[b.grad];
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.globalAlpha = 1;
};
Fish.prototype._draw_eye = function(c, ctx, b) {
	var eye_grad = ctx.createRadialGradient(
		b.eye.x, c.height * .5 - b.eye.h, 0,
		b.eye.x, c.height * .5 - b.eye.h, b.eye.s);
	eye_grad.addColorStop(.7, 'rgba(255,255,255,1)');
	eye_grad.addColorStop(1, 'rgba(255,255,255,.5)');
		
	ctx.fillStyle = eye_grad;
	circle(ctx, b.eye.x, c.height * .5 - b.eye.h, b.eye.s);
	glow(ctx, 5, 'rgba(0,0,0,.7)');
	ctx.fill();
	glow(ctx, 0, '');
	
	ctx.fillStyle = '#000000';
	circle(ctx, b.eye.x + Math.cos(b.pupil.a) * b.pupil.o, c.height * .5 - b.eye.h + Math.sin(b.pupil.a) * b.pupil.o, b.pupil.s);
	ctx.fill();
};
Fish.prototype._draw_glow = function(c, ctx, b, frame) {
	ctx.globalCompositeOperation = 'destination-over';
	glow(ctx, 30, 'rgba(255,255,255,0.35)');		
	this._draw_shape(c, ctx, b, frame);
	ctx.globalCompositeOperation = 'source-over';
};
Fish.prototype.prepare = function(frame) {
	this.canvas[frame] = document.createElement('canvas');
	this.canvas[frame].width = this.w;
	this.canvas[frame].height = this.h;
	
	var c = this.canvas[frame],
		ctx = c.getContext('2d'),
		b = this.fingerprint;

	this._draw_shape(c, ctx, b, frame);

	this._draw_scales(c, ctx, b);

	this._draw_colors(c, ctx, b);	

	this._draw_fins(c, ctx, b, frame);

	this._draw_eye(c, ctx, b);
	
	this._draw_glow(c, ctx, b, frame);
		
};

Fish.prototype.render = function(ctx, frame) {
	var c = this.canvas[frame];
    
    if (this.x >= view.canvas.width - c.width - 100) this.x = 0;
    
    if (frame == 2) new Bubbles(this.x + c.width*.8, this.y + c.height*.15, 3, 40)
    
    if (frame % 2 == 0) new Bubbles(this.x, this.y + c.height*.5, 1, 5)
    
    this.y = rand(this.y-1,this.y+1);
	ctx.drawImage(c, this.x += this.s, this.y, c.width, c.height);
};


// !Utilities


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

