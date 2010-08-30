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

