import { Rect } from './rect.js';


export class Layer
{
  constructor(ctx)
  {
    this.ctx = ctx;
    this.z_index = 0;
    this.elements = [];
  }

  draw()
  {
    for (let el of this.elements)
    {
      el.draw();
    }
  }

  putRect(x, y, w, h)
  {
    this.elements.push(new Rect(this.ctx, x, y, w, h));
  }
}
