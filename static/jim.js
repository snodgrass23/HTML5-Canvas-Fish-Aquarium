function Aquarium(w, h) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
}
Aquarium.prototype.prepare = function () {
	var c = this.canvas,
		ctx = c.getContext('2d');
	
	ctx.strokeStyle = "#666";
    ctx.lineWidth = 10;
    var topLine = ctx.lineWidth/2;
    ctx.beginPath();
    ctx.moveTo(0,topLine); 
    ctx.lineTo(c.width-ctx.lineWidth/2,topLine); 
    ctx.lineTo(c.width-ctx.lineWidth/2,c.height-ctx.lineWidth/2); 
    ctx.lineTo(ctx.lineWidth/2,c.height-ctx.lineWidth/2);
    ctx.lineTo(ctx.lineWidth/2,topLine);
    ctx.stroke();
    
	ctx.globalCompositeOperation = "source-atop";
    
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
    
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 4;
    var border = 75;
    ctx.beginPath();
    ctx.moveTo(border,border); 
    ctx.lineTo((c.width-ctx.lineWidth/2) - border,border); 
    ctx.lineTo((c.width-ctx.lineWidth/2) - border,(c.height-ctx.lineWidth/2) - border); 
    ctx.lineTo(border,(c.height-ctx.lineWidth/2) - border);
    ctx.lineTo(border,border);
    ctx.stroke();
    
	ctx.globalCompositeOperation = "source-atop";
	
	ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);
    
    ctx.globalAlpha = .5;
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    var topLine = ctx.lineWidth/2;
    ctx.beginPath();
    ctx.moveTo(0,topLine); 
    ctx.lineTo(c.width-ctx.lineWidth/2,topLine); 
    ctx.lineTo(c.width-ctx.lineWidth/2,c.height-ctx.lineWidth/2); 
    ctx.lineTo(ctx.lineWidth/2,c.height-ctx.lineWidth/2);
    ctx.lineTo(ctx.lineWidth/2,topLine);
    ctx.stroke();

	
};
Aquarium.prototype.render = function(ctx) {
	var c = this.canvas;
	ctx.drawImage(c, 0, 0, c.width, c.height);
};