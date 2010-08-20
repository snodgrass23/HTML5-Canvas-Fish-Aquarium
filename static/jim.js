function Aquarium(w, h) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
}
Aquarium.prototype.prepare = function () {
	var c = this.canvas,
		ctx = c.getContext('2d');
    
    var frameThickness = 15;
    
    // Rocks on bottom of tank
    for (var i = 0; i < c.width*10; i++) {
        var xPos = rand(0, c.width); 
        var yPos = rand(c.height-80, c.height-10); 
        var size = rand(2, 4);
        
        var grad = ctx.createRadialGradient(
            xPos, yPos, 0,
            xPos, yPos, size);
        grad.addColorStop(.4, 'rgba(64,29,00,.9)');
        grad.addColorStop(1, 'rgba(44,25,29,.9)');
		//grad.addColorStop(.4, 'rgba('+rand(40, 100)+','+rand(20, 90)+','+rand(10, 20)+',1)');
        //grad.addColorStop(1, 'rgba('+rand(30, 90)+','+rand(10, 40)+','+rand(15, 50)+',1)');
		//grad.addColorStop(1, '#2c251d');
        //grad.addColorStop(.4, '#643c00');
            
        ctx.fillStyle = grad;
        circle(ctx, xPos, yPos, size);
        //glow(ctx, 5, 'rgba(0,0,0,.7)');
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
    ctx.lineTo(c.width-ctx.lineWidth/2,topLine); 
    ctx.lineTo(c.width-ctx.lineWidth/2,c.height-ctx.lineWidth/2); 
    ctx.lineTo(ctx.lineWidth/2,c.height-ctx.lineWidth/2);
    ctx.lineTo(ctx.lineWidth/2,topLine-ctx.lineWidth);
    ctx.stroke();
    
	ctx.globalCompositeOperation = "source-atop";
    
    // shading for main frame
	var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	grad.addColorStop(0, 'rgba(255,255,255,.0)');
	grad.addColorStop(.2, 'rgba(255,255,255,.2)');
	grad.addColorStop(.3, 'rgba(255,255,255,.75)');
	grad.addColorStop(.4, 'rgba(255,255,255,.3)');
	grad.addColorStop(1, 'rgba(255,255,255,0)');
	
	ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);
    
    ctx.globalCompositeOperation = "destination-over";
    
    ctx.globalAlpha = .3;
    
    // dimensions of 3d tank
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 4;
    var border = 75;
    ctx.beginPath();
    
    //  back of 3d tank
    ctx.moveTo(border,border - 20); 
    ctx.lineTo((c.width-ctx.lineWidth/2) - border,border - 20); 
    ctx.lineTo((c.width-ctx.lineWidth/2) - border,(c.height-ctx.lineWidth/2) - border); 
    ctx.lineTo(border,(c.height-ctx.lineWidth/2) - border);
    ctx.lineTo(border,border-ctx.lineWidth/2 - 20);
    
    // diagonals of 3d tank
    //top left corners
    ctx.moveTo(border,border - 20);
    ctx.lineTo(0,0);
    //top right corners
    ctx.moveTo((c.width-ctx.lineWidth/2) - border,border - 20);
    ctx.lineTo(c.width,0);
    //bottom right corners
    ctx.moveTo((c.width-ctx.lineWidth/2) - border,(c.height-ctx.lineWidth/2) - border);
    ctx.lineTo(c.width,c.height);
    //bottom left corners
    ctx.moveTo(border,(c.height-ctx.lineWidth/2) - border);
    ctx.lineTo(0,c.height);
    ctx.stroke();
    
    // diagonal highlights of 3d tank
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 1;
    ctx.beginPath();
    //  back of 3d tank
    ctx.moveTo(border,border - 20); 
    ctx.lineTo((c.width-ctx.lineWidth) - border,border - 20); 
    ctx.lineTo((c.width-ctx.lineWidth) - border,(c.height-ctx.lineWidth/2) - border); 
    ctx.lineTo(border,(c.height-ctx.lineWidth) - border);
    ctx.lineTo(border,border-ctx.lineWidth - 20);
    //top left corners
    ctx.moveTo(border,border - 20);
    ctx.lineTo(0,0);
    //top right corners
    ctx.moveTo((c.width-ctx.lineWidth/2) - border,border - 20);
    ctx.lineTo(c.width,0);
    //bottom right corners
    ctx.moveTo((c.width-ctx.lineWidth/2) - border,(c.height-ctx.lineWidth/2) - border);
    ctx.lineTo(c.width,c.height);
    //bottom left corners
    ctx.moveTo(border,(c.height-ctx.lineWidth/2) - border);
    ctx.lineTo(0,c.height);
    ctx.stroke();
    
	ctx.globalCompositeOperation = "source-atop";
	
	ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);
    
    ctx.globalAlpha = .4;
    
    // shadow on outside of frame
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    var topLine = ctx.lineWidth/2;
    ctx.beginPath();
    ctx.moveTo(0,topLine); 
    ctx.lineTo(c.width-ctx.lineWidth/2,topLine); 
    ctx.lineTo(c.width-ctx.lineWidth/2,c.height-ctx.lineWidth/2); 
    ctx.lineTo(ctx.lineWidth/2,c.height-ctx.lineWidth/2);
    ctx.lineTo(ctx.lineWidth/2,topLine);
    ctx.stroke();
    
    // highlight on inside of frame
    ctx.strokeStyle = "#DDD";
    ctx.lineWidth = 2;
    var offset = frameThickness;
    ctx.beginPath();
    ctx.moveTo(offset,offset); 
    ctx.lineTo(c.width - offset,offset); 
    ctx.lineTo(c.width - offset,c.height - offset); 
    ctx.lineTo(offset, c.height - offset);
    ctx.lineTo(offset,offset-ctx.lineWidth/2);
    ctx.stroke();
	
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
    this.s = rand(s-1, s+1);
    this.l = 0;
    this.d = d;
    this.prepare();
    Bubbles.all.push(this);
}
Bubbles.all = [];
Bubbles.prototype._draw_bubble = function(c, ctx) {
    var grad = ctx.createRadialGradient(
		this.s+5, this.s+5, this.s-2,
		this.s+5, this.s+5, this.s+2);
	grad.addColorStop(.2, 'rgba(255,255,255,.0)');
	grad.addColorStop(.3, 'rgba(255,255,255,.1)');
	grad.addColorStop(.7, 'rgba(255,255,255,.3)');
	grad.addColorStop(1, 'rgba(255,255,255,.9)');
		
	ctx.fillStyle = grad;
	circle(ctx, this.s+5, this.s+5, this.s);
	//glow(ctx, 5, 'rgba(0,0,0,.7)');
	ctx.fill();
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 1;
    ctx.stroke();
	glow(ctx, 0, "#FFF");
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
    ctx.drawImage(c, rand(this.x-1,this.x+1) , this.y, c.width, c.height);
}









