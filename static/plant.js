function Plant(w, h) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
    this.w= Utility.rand(w*.9, w*1.1);
}
Plant.prototype.prepare = function () {
	var c = this.canvas,
		ctx = c.getContext('2d');
		 
    var stemThickness = 5;
	var cw = c.width;
	var ch = c.height;
    var offset = this.w+5;
    var start = 250;
    var end = 550;
        
    // stroke for main frame
	ctx.strokeStyle = "#0A520A";
    ctx.lineWidth = stemThickness ;
    ctx.beginPath();
    ctx.moveTo(start,250); 
    ctx.lineTo(start,end); 
    ctx.stroke();
    
	ctx.globalCompositeOperation = "source-atop";
};
Plant.prototype.render = function(ctx) {
	var c = this.canvas;
	ctx.drawImage(c, 10, 10, c.width, c.height);
};
