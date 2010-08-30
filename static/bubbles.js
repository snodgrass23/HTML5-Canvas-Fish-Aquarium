

//Bubbles
function Bubbles(x, y, s, d) {
    this.canvas = document.createElement('canvas');
	this.canvas.width = view.canvas.width;
	this.canvas.height = view.canvas.height;
    this.x = x;
    this.y = y;
    this.s = Utility.rand(s*.9, s*1.1);
    this.prepare();
    Bubbles.all.push(this);
}
Bubbles.all = [];
Bubbles.prototype._draw_bubble = function(c, ctx) {
	ctx.globalAlpha = .15;
    var offset = this.s+5;
    Utility.circle(ctx, offset, offset, this.s);
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
Bubbles.prototype.prepare = function () {
    var c = this.canvas,
		ctx = c.getContext('2d');
        
    this._draw_bubble(c, ctx);
}
Bubbles.prototype.render = function(ctx) {
    var c = this.canvas;
    
	if(this.y < 25) {
		this.y = Math.floor(Utility.rand(view.canvas.height-20,view.canvas.height));
		this.x = Math.floor(Utility.rand(view.canvas.width-80,view.canvas.width-90));
	} else {
		this.y = Math.floor(Utility.rand(this.y-2,this.y-5));
		this.x = Math.floor(Utility.rand(this.x-1,this.x+2));
	}
    ctx.drawImage(c, this.x , this.y);
}
