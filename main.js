import { Workspace } from './workspace.js';

let canvas = document.getElementById('workspace');
let workspace = new Workspace(canvas);
let layer = workspace.addLayer();

for (let i = 0; i < 10; i++)
{
  let [x, y] = [Math.random() * 800, Math.random() * 500];
  let [w, h] = [Math.random() * 100+100, Math.random() * 100 + 100];

  layer.putRect(x, y, w, h);
}
workspace.draw();
