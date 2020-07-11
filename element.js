import { getPos } from './helpers.js';


export class Element
{
  constructor(ctx, x, y)
  {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.selected = false;
    this.initialOffset = {x: 0, y: 0};
  }

  select()
  {
    this.selected = true;
  }

  deselect()
  {
    this.selected = false;
  }

  onMouseDown(e)
  {
    this.select();

    let pos = getPos(e, this.ctx.canvas);
    this.initialOffset.x = pos.x - this.x;
    this.initialOffset.y = pos.y - this.y;
  }
}
