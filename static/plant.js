function Plant() {
	this.canvas = document.createElement('canvas');
	this.canvas.width = view.canvas.width;
	this.canvas.height = view.canvas.height;
	this.x = Utility.rand(15,475);
	this.y = Utility.rand(30,150);
	this.prepare();
    Plant.all.push(this);
}
Plant.all = [];
Plant.prototype._draw_plant = function(c, ctx) {
		 
    var stemThickness = 5;
            
	ctx.strokeStyle = "#0A520A";
    ctx.lineWidth = stemThickness ;
    ctx.beginPath();
	bottom = Math.floor(Utility.rand(view.canvas.height-20,view.canvas.height));
	xpos =	this.x;
	top = this.y;
    ctx.moveTo(xpos,top); 
    ctx.lineTo(xpos,bottom); 
    ctx.stroke();
    
	ctx.globalCompositeOperation = "source-atop";
}

Plant.prototype.prepare = function () {  
    var c = this.canvas,
		ctx = c.getContext('2d');     
    this._draw_plant(c, ctx);
}

Plant.prototype.render = function(ctx) {
	var c = this.canvas;
	ctx.drawImage(c, this.x, this.y);
}
