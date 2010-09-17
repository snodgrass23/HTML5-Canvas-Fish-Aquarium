function Aquarium(w, h) {
	this.canvas = document.createElement('canvas');
	this.canvas.width = w;
	this.canvas.height = h;
}
Aquarium.prototype.prepare = function () {
	var c = this.canvas,
		ctx = c.getContext('2d');
    
    var frameThickness = 0;
	var cw = c.width;
	var ch = c.height;
    
    // Rocks on bottom of tank
    for (var i = 0; i < cw*10; i++) {
        var xPos = Utility.rand(0, cw); 
        var yPos = Utility.rand(ch-Utility.rand(65,72),ch); 
        var size = Utility.rand(2,4);
        
        var grad = ctx.createRadialGradient(
            xPos, yPos, 0,
            xPos, yPos, size);
        var rc1 = "rgba("+Math.ceil(Utility.rand(90, 110))+","+Math.ceil(Utility.rand(50, 70))+",00,1)";
        var rc2 = "rgba("+Math.ceil(Utility.rand(34, 54))+","+Math.ceil(Utility.rand(27, 47))+","+Math.ceil(Utility.rand(19, 39))+",1)";
		grad.addColorStop(.4, rc1);
        grad.addColorStop(1, rc2);
            
        ctx.fillStyle = grad;
        Utility.circle(ctx, xPos, yPos, size);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#2f251c";
        ctx.stroke();
    }
    
    // stroke for main frame
	//ctx.strokeStyle = "#444";
    //ctx.lineWidth = frameThickness;
    //var topLine = frameThickness/2;
    //ctx.beginPath();
    //ctx.moveTo(0,topLine); 
    //ctx.lineTo(cw-frameThickness/2,topLine); 
    //ctx.lineTo(cw-frameThickness/2,ch-frameThickness/2); 
    //ctx.lineTo(frameThickness/2,ch-frameThickness/2);
    //ctx.lineTo(frameThickness/2,topLine-frameThickness);
    //ctx.shadowOffsetX = 5;  
	//ctx.shadowOffsetY = 5;  
	//ctx.shadowBlur = 7;  
	//ctx.shadowColor = 'rgba(0,0,0,0.5)';
    //ctx.stroke();
    //
    //// stroke for main frame highlight/shadow
    //ctx.shadowOffsetX = 0;  
	//ctx.shadowOffsetY = 0;  
	//ctx.shadowBlur = 0;
	//ctx.strokeStyle = "#BBB";
    //ctx.lineWidth = 1;
    //topLine = frameThickness/2;
    //var offset = topLine * 1.2;
    //ctx.beginPath();
    //ctx.moveTo(topLine+offset,topLine+offset); 
    //ctx.lineTo(cw-topLine-offset,topLine+offset); 
    //ctx.lineTo(cw-topLine-offset,ch-topLine-offset); 
    //ctx.lineTo(topLine+offset,ch-topLine-offset);
    //ctx.lineTo(topLine+offset,topLine+offset);
    //ctx.stroke();
    //
	//ctx.strokeStyle = "#222";
    //ctx.lineWidth = 3;
    //topLine = frameThickness/3;
    //var offset = -topLine;
    //ctx.beginPath();
    //ctx.moveTo(topLine+offset,topLine+offset); 
    //ctx.lineTo(cw-topLine-offset,topLine+offset); 
    //ctx.lineTo(cw-topLine-offset,ch-topLine-offset); 
    //ctx.lineTo(topLine+offset,ch-topLine-offset);
    //ctx.lineTo(topLine+offset,topLine+offset);
    //ctx.stroke();
    
    
	//ctx.globalCompositeOperation = "source-atop";
    // shading for main frame
	//if (ctx.globalCompositeOperation && false) {
	//	ctx.save();
	//	ctx.rotate(Math.PI*10/180);
	//	ctx.scale(2, 1)
	//	var grad = ctx.createLinearGradient(0.5 * c.width, 0, 0.5 * c.width, c.height);
	//	Utility.gcs(grad,0,255,255,255,.0);
	//	Utility.gcs(grad,.2,255,255,255,.2);
	//	Utility.gcs(grad,.3,255,255,255,.85);
	//	Utility.gcs(grad,.4,255,255,255,.3);
	//	Utility.gcs(grad,1,255,255,255,0);
	//	ctx.fillStyle = grad;
	//	ctx.fillRect(0, 0, c.width, c.height);
	//	ctx.restore();
	//}
};
Aquarium.prototype.render = function(ctx) {
	var c = this.canvas;
	ctx.drawImage(c, 0, 0, c.width, c.height);
};

