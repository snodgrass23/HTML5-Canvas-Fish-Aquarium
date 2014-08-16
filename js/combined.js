function O(){
    var c = document.createElement('canvas');
    ctx = c.getContext('2d');
    O.gcop = (ctx.globalCompositeOperation)?true:false;
    O.clg = ma(ctx, 'createLinearGradient');
	O.crg = ma(ctx, 'createRadialGradient');
}
function g(ctx, d, c) {
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = d;
	ctx.shadowColor = c;
}

function gcs(grad,p,r,g,b,a) {
	grad.addColorStop(p, 'rgba('+r+','+g+','+b+','+a+')');
}

function ma(o,n) {
    var fn = o ? o[n] : null;
    if (typeof fn == 'undefined') return function () {}
    return function () {return fn.apply(o, arguments)}
}
function Aq(w, h) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
}
Aq.prototype.pr = function () {
	var c = this.canvas,
		ctx = c.getContext('2d');
    
    var frameThickness = 15;
	var cw = c.width;
	var ch = c.height;
    
    // Rocks on bottom of tank
    for (var i = 0; i < cw*10; i++) {
        var xPos = r(10, cw-10); 
        var yPos = r(ch-r(65,72),ch-10); 
        var size = r(2,4);
        
        var grad = ctx.createRadialGradient(
            xPos, yPos, 0,
            xPos, yPos, size);
        var rc1 = "rgba("+~~r(90, 110)+","+~~r(50, 70)+",00,1)";
        var rc2 = "rgba("+~~r(34, 54)+","+~~r(27, 47)+","+~~r(19, 39)+",1)";
		grad.addColorStop(.4, rc1);
        grad.addColorStop(1, rc2);
            
        ctx.fillStyle = grad;
        circle(ctx, xPos, yPos, size);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#2f251c";
        ctx.stroke();
    }
    
    // stroke for main frame
	ctx.strokeStyle = "#666";
    ctx.lineWidth = frameThickness;
    var topLine = frameThickness/2;
    ctx.beginPath();
    ctx.moveTo(0,topLine); 
    ctx.lineTo(cw-frameThickness/2,topLine); 
    ctx.lineTo(cw-frameThickness/2,ch-frameThickness/2); 
    ctx.lineTo(frameThickness/2,ch-frameThickness/2);
    ctx.lineTo(frameThickness/2,topLine-frameThickness);
    ctx.stroke();
};
Aq.prototype.r = function(ctx) {
	var c = this.canvas;
	ctx.drawImage(c, 0, 0, c.width, c.height);
};

// Water
function Water(f, x, y, h, w) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = vcw;
	this.canvas.height = vch;
    this.f = f;
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
    this.m = 0;
    this.p = x;
	this.pr();
    Water.all.push(this);
}
Water.all = [];
Water.prototype._draw_water = function(c, ctx) {
 	
    ctx.strokeStyle = "#61afef";
    ctx.lineWidth = 3;
    for(var i = this.x; i < c.width; i += this.w) {
        ctx.moveTo(i, this.y);
        ctx.bezierCurveTo(
	    	i + this.w*.2, this.y + this.h,
	    	i + this.w*.8, this.y + this.h,
	    	i + this.w, this.y
	    );
    }
    ctx.lineTo(c.width, c.height);
    ctx.lineTo(0, c.height);
    ctx.lineTo(0, this.y);
    
    ctx.stroke();
    
    var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	grad.addColorStop(0, '#67c1e9');
	grad.addColorStop(.04, '#65c1e9');
	grad.addColorStop(.5, '#7dcbec');
	grad.addColorStop(1, '#2d95ea');
    
    ctx.fillStyle = grad;
    ctx.fill();
}
Water.prototype.pr = function () {  
    var c = this.canvas,
		ctx = c.getContext('2d');
        
    this._draw_water(c, ctx);
};
Water.prototype.r = function(ctx, frame) {
	var c = this.canvas;
    
    if (this.m > this.f) this.m = 0;
    if (this.m > this.f / 2) this.p = this.m - ((this.m - this.f / 2) * 2) + this.x;
    else this.p = this.m + this.x;
    this.m++;
    
    ctx.drawImage(c, this.p, 0, c.width, c.height);
};

//B
function B(x, y, s, d) {
    this.canvas = document.createElement('canvas');
	this.canvas.width = vcw;
	this.canvas.height = vch;
    this.x = x;
    this.y = y;
    this.s = r(s*.9, s*1.1);
    this.pr();
    B.all.push(this);
}
B.all = [];
B.prototype._db = function(c, ctx) {
	ctx.globalAlpha = .15;
    var offset = this.s+5;
    circle(ctx, offset, offset, this.s);
    ctx.fillStyle = "#FFF";
	ctx.fill();
    ctx.strokeStyle = "#77c1ff";
    ctx.globalAlpha = .3;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#FFF";
    ctx.globalAlpha = .15;
    ctx.fillRect(offset*0.7,
                 offset*0.7,
                 this.s*.4,
                 this.s*.4);
    
}
B.prototype.pr = function () {
    var c = this.canvas,
		ctx = c.getContext('2d');
        
    this._db(c, ctx);
}
B.prototype.r = function(ctx) {
    var c = this.canvas;
    
	if(this.y < 25) {
		this.y = ~~r(vch-20,vch);
		this.x = ~~r(vcw-80,vcw-90);
	} else {
		this.y = ~~r(this.y-2,this.y-5);
		this.x = ~~r(this.x-1,this.x+2);
	}
    ctx.drawImage(c, this.x , this.y);
}
// !View

function View(el_id) {
	this.canvas = document.getElementById(el_id);
	this.ctx = this.canvas.getContext('2d');
	
	var canvas = document.getElementById('view');
}

View.prototype.clear = function() {
	this.canvas.width = this.canvas.width;
}

// !Fish

function Fish(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
    this.s = r(0, 3);
	this.d = 1;
    this.vertDir = 0;
    this.stopped = 0;
	this.canvas = [];
	
	this._fingerprint();

	for (var i = 0; i < Fish.f; i++) {
		this.pr(i);
	}
    this.pr(Fish.f);
	
	Fish.all.push(this);
}
Fish.f = 20;
Fish.all = [];
Fish.prototype._fingerprint = function() {
	this.fins = [];
	var h_space = 10;
	this.fingerprint = {
		nx: this.w - h_space,							// Nose X
		ny: this.h * .5,					// Nose Y
		fb: this.w * r(.3, .75),			// Front body bulge X
		rb: this.w * r(.15, .25),		// Rear body bulge X
		f: this.h * r(0, 0.35),			// Fat Y
		px: h_space,						// Tail point X
		pt: this.h * r(0.25, .75),		// Tail point distance
		tc: this.h * r(0, 0.4),			// Tail cut center size		
		td: this.w * r(0, .2),			// Tail depth		
		grad: ~~r(0, 5),
		fins: []
	};
	var fin_space = this.w - this.fingerprint.rb;
	for (var i = ~~r(0, 5); i > 0; i--) {
		var f = {
			s: this.w - fin_space * r(.1, .3),		// Start point
			y: this.h * r(0, 1),		// direction / multiplier
			l: fin_space * r(.2, .5)		// Length of each point
		}
		this.fingerprint.fins.push(f);
	}
	this.fingerprint.eye = {
		h: this.h * r(.04, .15),				// Eye height
		x: this.w * .8,	// Eye X
		s: this.h * r(.05, .10) 			// Eye size
	};
	this.fingerprint.pupil = {
		s: this.fingerprint.eye.s * r(.5, .8),				// Pupil size
		a: r(0, Math.PI * 2)				// Pupil angle
	};
	this.fingerprint.pupil.o = (this.fingerprint.eye.s - this.fingerprint.pupil.s) * r(.2, .5);	// Pupil offset from center
};
Fish.prototype._draw_shape = function(c, ctx, b, frame) {
	var angle = ((Math.PI * 2) / (Fish.f)) * frame,
		r = this.w * 0.1;
	var top_pt = [b.px + r * Math.cos(angle), b.pt], // + r * Math.sin(angle)],
		bottom_pt = [b.px + r * Math.cos(angle + Math.PI * .5), c.height - b.pt]; // + r * Math.sin(angle * Math.PI)];

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
	var grad = this._build_gradients(c, ctx, b);
	if (O.gcop) ctx.fillStyle = "#FFF";
	else ctx.fillStyle = grad[b.grad];
	ctx.fill();
};
Fish.prototype._draw_profile = function(c, ctx, b, frame) {
	var angle = ((Math.PI * 2) / (Fish.f)) * frame,
		r = this.w * 0.1;
    var top_pt = [b.px + r * Math.cos(angle), b.pt], // + r * Math.sin(angle)],
		bottom_pt = [b.px + r * Math.cos(angle + Math.PI * .5), c.height - b.pt]; // + r * Math.sin(angle * Math.PI)];
    ctx.save();
    ctx.translate(c.width* .15,0);
    ctx.scale(.2,1);
    circle(ctx, c.width*.5, c.height * .5, this.h*.3);
	var grad = this._build_gradients(c, ctx, b);
    ctx.restore();
	ctx.fillStyle = grad[b.grad];
	ctx.fill();
    
};
Fish.prototype._draw_fins = function(c, ctx, b, frame) {
	var angle = ((Math.PI * 2) / (Fish.f)) * frame,
		r = this.w * .025;
	var dx = r * Math.cos(angle);
	
	ctx.globalCompositeOperation = 'destination-over';
	for (var i in b.fins) {
		var f = b.fins[i];
		var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
		grad.addColorStop(0, 'rgba(255,255,255,.35)');
		grad.addColorStop(.5, 'rgba(255,255,255,.2)');
		grad.addColorStop(1, 'rgba(255,255,255,.6)');
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
	
	var scale_size = this.h/10;
	ctx.strokeStyle = '#000';
	for (var x = 0; x < c.width * 2 / scale_size; x += 1) {
		for (var y = 0; y < c.height / scale_size; y += 1) {
			circle(ctx,
				x * scale_size * .5,
				y * scale_size + scale_size * .5 * (x % 2),
				scale_size * .5 - 1
			);
			g(ctx, 3, '#000');		
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
	var grad = this._build_gradients(c, ctx, b);
	
	ctx.globalAlpha = 0.9;
	ctx.globalCompositeOperation = 'source-atop';
	ctx.fillStyle = grad[b.grad];
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.globalAlpha = 1;
};
Fish.prototype._build_gradients = function(c, ctx, b) {
	var cw = c.width;
	var ch = c.height;
	var grad = [];

	grad[0] = O.crg(
		0.64 * cw, 0.45 * ch, cw * .1,
		0.5 * cw, 0.5 * ch, cw * .8
	);
	gcs(grad[0],0,255,204,0,.7)
	gcs(grad[0],.25,230, 152, 0, .9)
	gcs(grad[0],.8,146,62,0,1)

	grad[1] = O.crg(
		0.64 * cw, 0.7 * ch, cw * .1,
		0.5 * cw, 0.5 * ch, cw * .8
	);
	gcs(grad[1],.6,129,153,33,.9);
	gcs(grad[1],.45,252,229,127,1);
	gcs(grad[1],.3,232,135,20,.8);
	gcs(grad[1],0,67,106,103,1);

	grad[2] = O.clg(
		0, ch * .45, cw, ch
	);
	gcs(grad[2],.3,254,186,18,.9)
	gcs(grad[2],.32,0,0,0,.7);
	gcs(grad[2],.35,255,255,255,.9);
	gcs(grad[2],.43,255,255,255,.9);
	gcs(grad[2],.45,0,0,0,.7);
	gcs(grad[2],.47,254,186,18,.9);
	gcs(grad[2],.55,254,186,18,.9);
	gcs(grad[2],.57,0,0,0,.7);
	gcs(grad[2],.60,255,255,255,.9);
	gcs(grad[2],.62,255,255,255,.9);
	gcs(grad[2],.64,0,0,0,.7);
	gcs(grad[2],.66,254,186,18,.9);
	
	grad[3] = O.crg(
		0.8 * cw, ch, cw * .1,
		0.8 * cw, ch, cw * .8
	);
	gcs(grad[3],0,255,255,255,.9);
	gcs(grad[3],.65,128,128,128,.9);
	gcs(grad[3],.7,0,0,0,.7);
	gcs(grad[3],.75,255,255,255,.5);
	gcs(grad[3],.8,255,255,255,.5);
	gcs(grad[3],.95,128,128,128,.8);
	
	grad[4] = O.crg(
		0.8 * cw, .5 * ch, cw * .1,
		0.8 * cw, .5 * ch, cw * .6
	);
	gcs(grad[4],.3,200,0,0,.9);
	gcs(grad[4],.4,255,100,0,.8);
	gcs(grad[4],.75,255, 0,0,.9);
	gcs(grad[4],1,200,0,0,.7);
	return grad;
}
Fish.prototype._de = function(c, ctx, b, offset) {
	var grad = O.crg(
		b.eye.x, c.height * .5 - b.eye.h, 0,
		b.eye.x, c.height * .5 - b.eye.h, b.eye.s);
	gcs(grad,.7,255,255,255,1);
	gcs(grad,1,255,255,255,.5);
		
	ctx.fillStyle = grad;
	circle(ctx, b.eye.x-offset, c.height * .5 - b.eye.h, b.eye.s);
	g(ctx, 5, 'rgba(0,0,0,.7)');
	ctx.fill();
	g(ctx, 0, '');
	
	ctx.fillStyle = '#000';
	circle(ctx, b.eye.x + Math.cos(b.pupil.a) * b.pupil.o-offset, c.height * .5 - b.eye.h + Math.sin(b.pupil.a) * b.pupil.o, b.pupil.s);
	ctx.fill();
};
Fish.prototype._draw_glow = function(c, ctx, b, frame) {
	ctx.globalCompositeOperation = 'destination-over';
	g(ctx, 30, 'rgba(255,255,255,0.35)');		
	this._draw_shape(c, ctx, b, frame);
	ctx.globalCompositeOperation = 'source-over';
};
Fish.prototype.pr = function(frame) {
    this.canvas[frame] = document.createElement('canvas');
	this.canvas[frame].width = this.w;
	this.canvas[frame].height = this.h;
	
	var c = this.canvas[frame],
		ctx = c.getContext('2d'),
		b = this.fingerprint;
    if (frame == Fish.f) {
        this._draw_profile(c, ctx, b, frame);
        this._de(c, ctx, b,c.width/2);
        this._de(c, ctx, b,b.eye.s*2+c.width/2);
    } else {
        this._draw_shape(c, ctx, b, frame);
        if (O.gcop) this._draw_scales(c, ctx, b);
        if (O.gcop) this._draw_colors(c, ctx, b);	
        if (O.gcop) this._draw_glow(c, ctx, b, frame);
        if (O.gcop) this._draw_fins(c, ctx, b, frame);
        this._de(c, ctx, b,0);
    }
};

Fish.prototype.r = function(ctx, frame) {
    var c = this.canvas[frame];
    if (this.x >= vcw - c.width - 5 && this.stopped == 0) {
		this.d = (this.d == 1) ? 0 : 1;
        this.x = 0;
        this.stopped = 1;
    }
    
    if (this.stopped > 3 && r(-2, 1) > 0) {
        this.stopped = 0;
        c = this.canvas[frame];
    } else if (this.stopped > 0){
        this.stopped++;
        c = this.canvas[Fish.f];
    }
    
    if (frame == 2) {
        if (this.y > 50 && this.y < vch - 175) this.vertDir = r(-1,1);
        else if (this.y < 50) this.vertDir = 2;
        else this.vertDir = -2;
        if (r(-1, 1) > 0) this.s = r(this.s-1, this.s+1);
        if (r(-1, 15) < 0) {
            this.d = (this.d == 1) ? 0 : 1;
            this.x = vcw - this.x - c.width;
            this.stopped = 1
        }
    }
    
    if (this.s < 1) this.s = 1
    if (this.s > 5) this.s = 3
    if (frame < Fish.f && this.stopped == 0) this.x += this.s;
    
    if (frame < Fish.f) this.y += this.vertDir;
    ctx.save();
    
    
    if (!this.d) {
        ctx.translate(vcw,1);
        ctx.scale(-1,1);
    }
    
    ctx.drawImage(c, this.x, this.y);
    ctx.restore();
};
function r(a, b) {
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

var frame = 0;
var ofr = 0;
var ast = 0;
var addFish = 1;
function main() {
	view.clear();
    for (var i in Water.all) Water.all[i].r(view.ctx);
    
    for (var i in B.all) B.all[i].r(view.ctx);
    
    frame = (frame + 1) % Fish.f;
    
    for (var i in Fish.all) {
        if(ast > 0) Fish.all[i].r(view.ctx, Fish.f);
        else Fish.all[i].r(view.ctx, frame);
    }
    
    aq.r(view.ctx);
    if (ast > 0) ast++
    if (ast > 100) ast = 0
    if (ofr == 100) ofr = 0;
    else ofr++;
    
    if (addFish > 0) {
        for (var i = 0; i < addFish; i++)newFish();
        addFish = 0;
    }
}

view = new View('view');			
var o,view,aq,vch,vcw;
o = new O();
vch = view.canvas.height;
vcw = view.canvas.width;
aq = new Aq(vcw,vch);
aq.pr();

// frames, x offset, y offset, wave height, wave length
new Water(50, -13, 30, 15, 55);
new Water(45, -13, 32, 10, 50);

for (var i = vch; i > 0 ; i-=Math.floor(r(10,35))) {
	new B(r(vcw-80,vcw-90), i, 8);	
}

document.getElementById("view").addEventListener("click", requestFish, false);

setInterval(main, 1000 / 40);

function requestFish() {
    ast = 1;
    addFish++;
}

function newFish() {
    var l = r(60, 200);
    new Fish(r(50,vcw*.7),
             r(75,vch-150),
             l,
             r(l*.6, l*.9));
}