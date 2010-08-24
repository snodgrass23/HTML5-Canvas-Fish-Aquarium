function Aquarium(w, h) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
}
Aquarium.prototype.prepare = function () {
	var c = this.canvas,
		ctx = c.getContext('2d');
    
    var frameThickness = 15;
	var cw = c.width;
	var ch = c.height;
    
    // Rocks on bottom of tank
    for (var i = 0; i < cw*10; i++) {
        var xPos = rand(0, cw); 
        var yPos = rand(ch-80,ch-10); 
        var size = rand(2,4);
        
        var grad = ctx.createRadialGradient(
            xPos, yPos, 0,
            xPos, yPos, size);
        var rc1 = "rgba("+Math.ceil(rand(90, 110))+","+Math.ceil(rand(50, 70))+",00,1)";
        var rc2 = "rgba("+Math.ceil(rand(34, 54))+","+Math.ceil(rand(27, 47))+","+Math.ceil(rand(19, 39))+",1)";
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
    
	ctx.globalCompositeOperation = "source-atop";
    
    // shading for main frame
	ctx.save();
	ctx.rotate(Math.PI*10/180);
	ctx.scale(2, 1)
	var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	gcs(grad,0,255,255,255,.0);
	gcs(grad,.2,255,255,255,.2);
	gcs(grad,.3,255,255,255,.85);
	gcs(grad,.4,255,255,255,.3);
	gcs(grad,1,255,255,255,0);
	ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);
	ctx.restore();
};
Aquarium.prototype.render = function(ctx) {
	var c = this.canvas;
	ctx.drawImage(c, 0, 0, c.width, c.height);
};

// Water
function Water(f, x, y, h, w) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = view.canvas.width;
	this.canvas.height = view.canvas.height;
    this.f = f;
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
    this.m = 0;
    this.p = x;
	this.prepare();
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
    ctx.globalCompositeOperation = "destination-over";
}
Water.prototype.prepare = function () {  
    var c = this.canvas,
		ctx = c.getContext('2d');
        
    this._draw_water(c, ctx);
};
Water.prototype.render = function(ctx, frame) {
	var c = this.canvas;
    
    if (this.m > this.f) this.m = 0;
    if (this.m > this.f / 2) this.p = this.m - ((this.m - this.f / 2) * 2) + this.x;
    else this.p = this.m + this.x;
    this.m++;
    
    ctx.drawImage(c, this.p, 0, c.width, c.height);
};

//Bubbles
function Bubbles(x, y, s, d) {
    this.canvas = document.createElement('canvas');
	this.canvas.width = view.canvas.width;
	this.canvas.height = view.canvas.height;
    this.x = x;
    this.y = y;
    this.s = rand(s*.7, s*1.5);
    this.l = 0;
    this.d = rand(d*.8,d*1.2);
    this.prepare();
    Bubbles.all.push(this);
}
Bubbles.all = [];
Bubbles.prototype._draw_bubble = function(c, ctx) {
	ctx.globalAlpha = .4;
    circle(ctx, this.s+5, this.s+5, this.s);
    ctx.fillStyle = "#FFF";
	ctx.fill();
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;
    ctx.stroke();
	glow(ctx, 1, "#FFF");
    
}
Bubbles.prototype.prepare = function () {
    var c = this.canvas,
		ctx = c.getContext('2d');
        
    this._draw_bubble(c, ctx);
}
Bubbles.prototype.render = function(ctx) {
    var c = this.canvas;
    this.l++;
    this.y = rand(this.y-1,this.y-3);
    this.x = rand(this.x-1,this.x+1);
    ctx.drawImage(c, this.x , this.y);
}
