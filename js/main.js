function main() {
  var i;

  // clear view for re-render of objects
  view.clear();

  // render water
  for (var i in Water.all) Water.all[i].render(view.ctx);

  // render plants on level 1
  for (i in Plant.all)
    if(Plant.all[i].z == 1) Plant.all[i].render(view.ctx, pframe);

  // render bubbles
  for (i in Bubbles.all) Bubbles.all[i].render(view.ctx);

  // render fish
  for (i in Fish.all) {
      if(all_stopped > 0) Fish.all[i].render(view.ctx, Fish.frames);
      else Fish.all[i].render(view.ctx, frame);

  }

  // render plants on level 2
  for (i in Plant.all)
    if(Plant.all[i].z == 2) Plant.all[i].render(view.ctx, pframe);

  // render aquarium environment
  aquarium.render(view.ctx);

  // increment frame counters
  frame = (frame + 1) % Fish.frames;
  pframe = (pframe + 1) % Plant.frames;
  overall_frames = (pframe + 1) % 100;
  if (all_stopped > 0) all_stopped++;
  if (all_stopped > 75) all_stopped = 0;
}

// setup frame counter variables
var frame, pframe, overall_frames, all_stopped, view, aquarium;

frame = pframe = overall_frames = all_stopped = 0;

view = new View('view');

aquarium = new Aquarium(view.canvas.width, view.canvas.height);
aquarium.prepare();

// frames, x offset, y offset, wave height, wave length
// new Water(50, -13, 30, 15, 55);
// new Water(45, -13, 32, 10, 50);

new Plant(1);
new Plant(1);
new Plant(1);
new Plant(1);
new Plant(2);
new Plant(2);
new Plant(2);

for (var i = view.canvas.height; i > 0 ; i -= Math.floor(Utility.rand(10,35))) {
  new Bubbles(Utility.rand(view.canvas.width - 80, view.canvas.width - 90), i, 8);
}

document.getElementById("view").addEventListener("click", requestFish, false);

setInterval(main, 1000 / 35);

function requestFish(e) {
  all_stopped = 1;
  newFish(e.x, e.y);
}

function newFish(x, y) {
  var length = Utility.rand(60, 200),
      height = Utility.rand(length * 0.6, length * 0.9);

  x = x - length / 4;
  y = y - height / 2;

  new Fish(x, y, length, height);
}
