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
	
	var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	/*
	grad.addColorStop(0, '#ffcc00');
	grad.addColorStop(.25, '#e69800');
	grad.addColorStop(.8, '#a25923')
	*/
	grad.addColorStop(0, 'rgba(255,255,255,.25)');
	grad.addColorStop(.5, 'rgba(255,255,255,.1)');
	grad.addColorStop(1, 'rgba(255,255,255,.5)');
	ctx.fillStyle = grad;
	//ctx.fillStyle = 'rgba(255, 255, 255, .3)';
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
			var opacity = (1 - (Math.abs((y * scale_size) - c.height * .5) / (c.height * .5)) * 1.15);
			opacity *= (1 - Math.abs((x * scale_size * .5) - c.width * .6) / (c.width * .7) * 1.15);
			ctx.fillStyle = 'rgba(255,255,255,' + opacity + ')';
			console.log('fillstyle = ' + ctx.fillStyle);
			ctx.fill();
			
		}
	}
	
	//ctx.fillStyle = 'rgba(255, 0, 0, 1)';
	//ctx.fillRect(0, 0, c.width, c.height);

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
		
	// Draw the body

	var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	/*
	grad.addColorStop(0, '#ffcc00');
	grad.addColorStop(.25, '#e69800');
	grad.addColorStop(.8, '#a25923')
	*/
	grad.addColorStop(0, '#fff');
	grad.addColorStop(.25, '#bbb');
	grad.addColorStop(.8, '#333');
	
	
	ctx.fillStyle = grad;
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
	
	

	// Draw the scales
	this._draw_scales(c, ctx);
		
	
	// Draw the fins
	ctx.globalCompositeOperation = 'destination-over';
	for (var i = ~~rand(0, 5); i > 0; i--) {
		this._add_fin(c, ctx, c.width - b.rb);
	}
	ctx.globalCompositeOperation = 'source-over';
	
	
	// Draw the eye
	
	var eye_h = c.height * rand(0, .15),				// Eye height
		eye_s = c.height * rand(.05, .10), 			// Eye size
		pupil_s = eye_s * rand(.2, .8),				// Pupil size
		pupil_o = (eye_s - pupil_s) * rand(.2, .5),	// Pupil offset from center
		pupil_a = rand(0, Math.PI * 2);				// Pupil angle
	
	ctx.fillStyle = '#ffffff';
	ctx.beginPath();
	ctx.arc(
		c.width * .8, c.height * .5 - eye_h,
		eye_s, 0, Math.PI * 2,
		false
	);
	
	glow(ctx, 3, 'rgba(0,0,0,0.25)');		
	ctx.fill();
	glow(ctx, 0, '');
	
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

	glow(ctx, 15, 'rgba(255,255,255,0.15)');
	
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

var view = new View('view');
var sea = new Sea(view.canvas.width, view.canvas.height);

sea.prepare();
sea.render(view.ctx);

for (var x = 0; x < 5; x++) {
	for (var y = 0; y < 3; y++) {
		var fish = new Fish(50 + 200 * x, 50 + 150 * y, 100, 100);
		fish.prepare();
		fish.render(view.ctx);
	}
}
