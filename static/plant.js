function Plant() {
	this.canvas = document.createElement('canvas');
	this.canvas.width = view.canvas.width;
	this.canvas.height = view.canvas.height;
	this.x = ~~Utility.rand(25,475);
	this.y = ~~Utility.rand(245,255);
	this.w = ~~Utility.rand(this.x-35,this.x);
	this.prepare();
    Plant.all.push(this);
}
Plant.all = [];
Plant.prototype._draw_plant = function(c, ctx) {
		 
    var stemThickness = 7;
            
	ctx.strokeStyle = "#0A520A";
    ctx.lineWidth = stemThickness ;
    ctx.beginPath();
	var bottom = Math.floor(Utility.rand(view.canvas.height-20,view.canvas.height));
	var xpos = this.x;
	var top = this.y;
	var randx1 = this.w;
	var randx2 = ~~Utility.rand(xpos+35,xpos);
	var curve = top-bottom;
	
	ctx.moveTo(xpos,bottom);
	ctx.bezierCurveTo(randx1,bottom-curve,randx2,top-(curve*2),randx1,top);
	ctx.stroke();
    
	ctx.globalCompositeOperation = "source-atop";
}

Plant.prototype._draw_leaf = function(c,ctx)	{
	
	ctx.lineWidth = 1;
	ctx.beginPath();
		var randx1 = this.w;
		var top = this.y;
	
		var rleafx = randx1+ ~~Utility.rand(50,100);
		var rleafy = top- ~~Utility.rand(40,100);
		var rleafup = randx1+ ~~((rleafx-randx1)/3);
		var rleafback = randx1;
		var rleafcurveup = top;
		var rleafcurveback = top- ~~((top-rleafy)/3);
	

	ctx.moveTo(randx1,top);	
	ctx.quadraticCurveTo(rleafup,rleafcurveup,rleafx,rleafy);
	ctx.quadraticCurveTo(rleafback,rleafcurveback,randx1,top);
	
	//ctx.fillStyle = "#003300";
	//ctx.fill();
	
	ctx.strokeStyle = "#0A520A";
	ctx.stroke();

	//ctx.globalCompositeOperation = "source-atop";
}

Plant.prototype.prepare = function () {  
    var c = this.canvas,
		ctx = c.getContext('2d');     
    this._draw_plant(c, ctx);
    this._draw_leaf(c, ctx);
}

Plant.prototype.render = function(ctx) {
	var c = this.canvas;
	//ctx.drawImage(c, this.x, this.y);
	ctx.drawImage(c, 200, 200);
}
