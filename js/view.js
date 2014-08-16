// !View
function View(el_id) {
	this.canvas = document.getElementById(el_id);
	this.ctx = this.canvas.getContext('2d');

	//var canvas = document.getElementById('view');
	this.ctx.canvas.width = window.innerWidth;
	this.ctx.canvas.height = window.innerHeight;
}
View.prototype.resize = function(w, h) {
	this.canvas.width = w;
	this.canvas.height = h;
};
View.prototype.clear = function() {
	this.canvas.width = this.canvas.width;
};

