function Plant(z) {
	//this.canvas = document.createElement('canvas');
	//this.canvas.width = view.canvas.width;
	//this.canvas.height = view.canvas.height;
	this.x = ~~Utility.rand(15,view.canvas.width-15);
	this.y = ~~Utility.rand(view.canvas.height-100,view.canvas.height-150);
	this.z = ~~Utility.rand(1, 2.9);
	this.w = ~~Utility.rand(this.x-35,this.x);
	this.canvas = [];
	
	for (var i = 0; i < Plant.frames; i++) {
		this.prepare(i);
	}
    this.prepare(Plant.frames);
	
	Plant.all.push(this);
}
Plant.frames = 2;
Plant.all = [];
Plant.prototype._draw_plant = function(c, ctx, w, h) {
		 
    var stemThickness = 7;
            
	ctx.strokeStyle = "#0A520A";
	var lineCap = 'round'; 
    ctx.lineWidth = stemThickness ;
    ctx.beginPath();
	var bottom = Math.floor(Utility.rand(h-20,h));
	var xpos = this.x;
	var top = this.y;
	var randx1 = this.w;
	var randx2 = ~~Utility.rand(xpos+35,xpos);
	var curve = top-bottom;
	
	ctx.moveTo(xpos,bottom);
	ctx.bezierCurveTo(randx1,bottom-curve,randx2,top-(curve*2),randx1,top);
	ctx.stroke();
    
	ctx.globalCompositeOperation = "source-over";
}

Plant.prototype._draw_leaf = function(c,ctx)	{
	
	ctx.lineWidth = 1;
	ctx.beginPath();
	
	var randx1 = this.w;
	var top = this.y;
	
	var rleafx = randx1+ ~~Utility.rand(-100,100);
	var rleafy = top- ~~Utility.rand(100, 400);
	var rleafup = randx1+ ~~((rleafx-randx1)/7);
	var rleafback = randx1;
	var rleafcurveup = top;
	var rleafcurveback = top- ~~((top-rleafy)/6);
	

	ctx.moveTo(randx1,top);
	
	ctx.quadraticCurveTo(rleafup,rleafcurveup,rleafx,rleafy);
	ctx.quadraticCurveTo(rleafback,rleafcurveback,randx1,top);
	
	ctx.fillStyle = "#003300";
	ctx.fill();
	
	ctx.strokeStyle = "#0A520A";
	ctx.stroke();

	ctx.globalCompositeOperation = "source-over";
}

Plant.prototype.prepare = function (frame) {
	
    this.canvas[frame] = document.createElement('canvas');
	this.canvas[frame].width = this.w;
	this.canvas[frame].height = this.h;
	
	var c = this.canvas[frame],
	ctx = c.getContext('2d');
	 
    this._draw_plant(c, ctx, this.canvas[frame].width , this.canvas[frame].height);
    this._draw_leaf(c, ctx, this.canvas[frame].width , this.canvas[frame].height);
    //this._draw_leaf(c, ctx);
    //this._draw_leaf(c, ctx);
}

Plant.prototype.render = function(ctx, frame) {
	var c = this.canvas[frame];
	//ctx.drawImage(c, this.x, this.y);
	ctx.drawImage(c, 0, 0);
}
