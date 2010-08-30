function Utility(){
}

Utility.rand = function(a, b) {
	return Math.random() * (b - a) + a;
}

Utility.circle = function(ctx, x, y, r) {
	ctx.beginPath();
	ctx.arc(
		x, y,
		r, 0, Math.PI * 2,
		false
	);
}

// When precomputing, seems to lock transparency so you can't do this in the original sprites =(
Utility.glow = function(ctx, dist, color) {
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = dist;
	ctx.shadowColor = color;
}

Utility.gcs = function(grad,p,r,g,b,a) {
	grad.addColorStop(p, 'rgba('+r+','+g+','+b+','+a+')');
}

Utility.ma = function(o,n) {
    var fn = o ? o[n] : null;
    if (typeof fn == 'undefined') return function () {}
    return function () {return fn.apply(o, arguments)}
}

