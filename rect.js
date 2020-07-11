import { Element } from './element.js';
import { getPos } from './helpers.js';

export class Rect extends Element
{
  constructor(ctx, x, y, w, h)
  {
    super(ctx, x, y);
    this.handleSize = 5;
    this.w = w;
    this.h = h;
  }

  getHandles()
  {
    let handles = {
      top: {
        x: this.x + this.w/2 - this.handleSize/2,
        y: this.y - this.handleSize/2,
        w: this.handleSize,
        h: this.handleSize
      },
      bottom: {
        x: this.x + this.w/2 - this.handleSize/2,
        y: this.y + this.h - this.handleSize/2,
        w: this.handleSize,
        h: this.handleSize
      },
      left: {
        x: this.x - this.handleSize/2,
        y: this.y + this.h/2 - this.handleSize/2,
        w: this.handleSize,
        h: this.handleSize
      },
      right: {
        x: this.x + this.w - this.handleSize/2,
        y: this.y + this.h/2 - this.handleSize/2,
        w: this.handleSize,
        h: this.handleSize
      },
      topLeft: {
        x: this.x - this.handleSize,
        y: this.y - this.handleSize,
        w: this.handleSize*2,
        h: this.handleSize*2
      },
      topRight: {
        x: this.x + this.w - this.handleSize,
        y: this.y - this.handleSize,
        w: this.handleSize*2,
        h: this.handleSize*2
      },
      bottomLeft: {
        x: this.x - this.handleSize,
        y: this.y + this.h - this.handleSize,
        w: this.handleSize*2,
        h: this.handleSize*2
      },
      bottomRight: {
        x: this.x + this.w - this.handleSize,
        y: this.y + this.h - this.handleSize,
        w: this.handleSize*2,
        h: this.handleSize*2
      }
    };
    return handles;
  }

  draw()
  {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.stroke();

    if (this.selected)
    {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#fff';
      let handles = this.getHandles();
      for (let handleKey in handles)
      {
        let handle = handles[handleKey];
        this.ctx.rect(handle.x, handle.y, handle.w, handle.h);
        this.ctx.fillRect(handle.x, handle.y, handle.w, handle.h);
      }
      this.ctx.stroke();
    }
  }

  onMouseMove(e)
  {
    let pos = getPos(e, this.ctx.canvas);

    if (e.buttons == 1 && this.selected)
    {
      this.x = pos.x - this.initialOffset.x;
      this.y = pos.y - this.initialOffset.y;
    }
  }
}
