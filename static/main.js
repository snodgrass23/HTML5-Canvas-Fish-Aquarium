var frame = 0;
var overall_frames = 0;
var all_stopped = 0;
var addFish = 1;
function main() {
	view.clear();
    for (var i in Water.all) Water.all[i].render(view.ctx);
    
    for (var i in Bubbles.all) Bubbles.all[i].render(view.ctx);
    
    frame = (frame + 1) % Fish.frames;
    
    for (var i in Fish.all) {
        if(all_stopped > 0) Fish.all[i].render(view.ctx, Fish.frames);
        else Fish.all[i].render(view.ctx, frame);
    }
    
    aquarium.render(view.ctx);
    if (all_stopped > 0) all_stopped++
    if (all_stopped > 100) all_stopped = 0
    if (overall_frames == 100) overall_frames = 0;
    else overall_frames++;
    
    if (addFish > 0) {
        for (var i = 0; i < addFish; i++) newFish();
        addFish = 0;
    }
}


var view,aquarium;

view = new View('view');	

aquarium = new Aquarium(view.canvas.width,view.canvas.height);
aquarium.prepare();

// frames, x offset, y offset, wave height, wave length
new Water(50, -13, 30, 15, 55);
new Water(45, -13, 32, 10, 50);

for (var i = view.canvas.height; i > 0 ; i-=Math.floor(rand(10,35))) {
	new Bubbles(rand(view.canvas.width-80,view.canvas.width-90), i, 8);	
}

document.getElementById("view").addEventListener("click", requestFish, false);

setInterval(main, 1000 / 40);

function requestFish() {
    all_stopped = 1;
    addFish++;
}

function newFish() {
    // x, y, length, width
    length = rand(60, 200);
    new Fish(rand(50,view.canvas.width*.7),
             rand(75,view.canvas.height-150),
             length,
             rand(length*.6, length*.9));
}