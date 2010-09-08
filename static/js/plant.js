function Plant(z) {
	//this.canvas = document.createElement('canvas');
	//this.canvas.width = view.canvas.width;
	//this.canvas.height = view.canvas.height;
	this.x = ~~Utility.rand(15,view.canvas.width-15);
	this.y = ~~Utility.rand(view.canvas.height-100,view.canvas.height-150);
	this.z = ~~Utility.rand(1, 2.9);
	this.h = view.canvas.height;
	this.canvas = [];
	
	this._fingerprint(this.h);
	
	for (var i = 0; i < Plant.frames; i++) {
		this.prepare(i);
	}
    // Don't need, I only did this with Fish to build extra "profile" frame
	// this.prepare(Plant.frames);
	
	Plant.all.push(this);
}
Plant.frames = 10;
Plant.all = [];


Plant.prototype._fingerprint = function(h) {
	this.main = {
		bottom: Math.floor(Utility.rand(h-20,h)),
		xpos: this.x,
		top: this.y
				
	}
	
	this.stem = {
		stemThickness: 7,
		randx1: ~~Utility.rand(this.main.xpos-35,this.main.xpos),
		randx2: ~~Utility.rand(this.main.xpos+35,this.main.xpos),
		curve: this.main.top-this.main.bottom
	}
	
	this.leaf1 = {
		rleafx: this.stem.randx1+ ~~Utility.rand(-100,100),
		rleafy: this.main.top- ~~Utility.rand(100, 400),
		rleafcurveup: this.main.top
	
	}
	
	this.leaf2 = {
		rleafup: this.stem.randx1+ ~~((this.leaf1.rleafx-this.stem.randx1)/7),
		rleafback: this.stem.randx1,		
		rleafcurveback:this.main.top- ~~((this.main.top-this.leaf1.rleafy)/6)
	}
	
	
}

Plant.prototype._draw_plant = function(c, ctx, w, h, m, s) {
		 
            
	ctx.strokeStyle = "#0A520A";
	var lineCap = 'round'; 
	ctx.lineWidth = s.stemThickness ;
	ctx.beginPath();
	
	ctx.moveTo(m.xpos,m.bottom);
	ctx.bezierCurveTo(s.randx1,m.bottom-s.curve,s.randx2,m.top-(s.curve*2),s.randx1,m.top);
	ctx.stroke();
    
	ctx.globalCompositeOperation = "source-over";
}


Plant.prototype._draw_leaf = function(c, ctx, m, s, l1, l2, frame)	{
	
	ctx.lineWidth = 1;
	ctx.beginPath();
	
	ctx.moveTo(s.randx1,m.top);
	
	var framerev = frame;

	
	if (frame<5)	{
		framerev = frame;

	}
	else	{
		framerev = 10-frame;

	}
	
	ctx.quadraticCurveTo(l2.rleafup,l1.rleafcurveup,l1.rleafx+(framerev),l1.rleafy+(framerev/4));
	ctx.quadraticCurveTo(l2.rleafback,l2.rleafcurveback,s.randx1,m.top);
	
	ctx.fillStyle = "#003300";
	ctx.fill();
	
	ctx.strokeStyle = "#0A520A";
	ctx.stroke();

	ctx.globalCompositeOperation = "source-over";
}

Plant.prototype.prepare = function (frame) {
	
    this.canvas[frame] = document.createElement('canvas');
	this.canvas[frame].width = view.canvas.width;
	this.canvas[frame].height = view.canvas.height;
	
	var c = this.canvas[frame],
	ctx = c.getContext('2d');
	var m = this.main;
	var s = this.stem;
	var l1 = this.leaf1;
	var l2 = this.leaf2;
	 
    this._draw_plant(c, ctx, c.width , c.height, m, s);
    this._draw_leaf(c, ctx, m, s, l1, l2, frame);
    //this._draw_leaf(c, ctx, m, s, l1, l2);
    //this._draw_leaf(c, ctx, m, s, l1, l2);
}

Plant.prototype.render = function(ctx, frame) {
	var c = this.canvas[frame];
	//ctx.drawImage(c, this.x, this.y);
	ctx.drawImage(c, 0, 0);
}
