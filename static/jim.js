function Aquarium(w, h) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
}
Aquarium.prototype.prepare = function () {
	var c = this.canvas,
		ctx = c.getContext('2d');
	
    // stroke for main frame
	ctx.strokeStyle = "#666";
    ctx.lineWidth = 10;
    var topLine = ctx.lineWidth/2;
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
    
	ctx.globalCompositeOperation = "source-atop";
	
	ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);
    
    ctx.globalAlpha = .5;
    
    // shadow on outside of frame
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    var topLine = ctx.lineWidth;
    ctx.beginPath();
    ctx.moveTo(0,topLine); 
    ctx.lineTo(c.width-ctx.lineWidth,topLine); 
    ctx.lineTo(c.width-ctx.lineWidth,c.height-ctx.lineWidth/2); 
    ctx.lineTo(ctx.lineWidth,c.height-ctx.lineWidth/2);
    ctx.lineTo(ctx.lineWidth,topLine);
    ctx.stroke();
    
    // highlight on inside of frame
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    var offset = 10;
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

function Water(w, h) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
}
Water.prototype.prepare = function () {
	var c = this.canvas,
		ctx = c.getContext('2d');
	
    ctx.strokeStyle = "#7787f4";
    ctx.lineWidth = 3;
    var waveWidth = 75;
    var waterHeight = 50;
    for(var i = 0; i < c.width; i += waveWidth) {
        ctx.moveTo(i, waterHeight);
        ctx.bezierCurveTo(
	    	i + 20, waterHeight + 15,
	    	i + waveWidth - 20, waterHeight + 30,
	    	i + waveWidth, waterHeight
	    );
    }
    ctx.lineTo(c.width, c.height);
    ctx.lineTo(0, c.height);
    ctx.lineTo(0, waterHeight);
    
    ctx.stroke();
    
    var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	grad.addColorStop(0, '#78c9eb');
	grad.addColorStop(.04, '#78c9eb');
	grad.addColorStop(.5, '#b5e1f4');
	grad.addColorStop(1, '#46b5e3');
    
    ctx.fillStyle = grad;
    ctx.fill();
    
};
Water.prototype.render = function(ctx) {
	var c = this.canvas;
	ctx.drawImage(c, 0, 0, c.width, c.height);
};












