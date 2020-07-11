import { Layer } from './layer.js';
import { Rect } from './rect.js';
import { getPos } from './helpers.js';


export class Workspace
{
  constructor(canvas)
  {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.layers = [];
    this.setDefaultStyle();
    
    this.canvas.addEventListener('mousedown', (e) => {
      this.deselectAll();
      let elements = this.getEventElements(e);
      for (let el of elements)
      {
        el.onMouseDown(e);
      }
      this.draw();
    }, false);

    this.canvas.addEventListener('mousemove', (e) => {
      let elements = this.getSelected();
      for (let el of elements)
      {
        el.onMouseMove(e);
      }
      this.draw();
    }, false);
  }

  setDefaultStyle()
  {
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 1;
  }

  addLayer()
  {
    let layer = new Layer(this.ctx);
    this.layers.push(layer);
    return layer;
  }

  clear()
  {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw()
  {
    this.clear();
    for (let layer of this.layers)
    {
      layer.draw();
    }
  }

  deselectAll()
  {
    for (let layer of this.layers)
    {
      for (let el of layer.elements)
      {
        el.deselect();
      }
    }
  }

  getSelected()
  {
    let elements = [];
    for (let layer of this.layers)
    {
      for (let el of layer.elements)
      {
        if (el.selected)
        {
          elements.push(el);
        }
      }
    }
    return elements;
  }
  
  getPos(e)
  {
    return getPos(e, this.canvas);
    let rect = this.canvas.getBoundingClientRect();
    let x = e.clientX - rect.x;
    let y = e.clientY - rect.y;
    return {x: x, y: y};
  }

  getEventElements(e)
  {
    let pos = this.getPos(e);
    let elements = [];

    for (let layer of this.layers)
    {
      for (let el of layer.elements)
      {
        if (el instanceof Rect)
        {
          if (pos.x >= el.x && pos.x <= el.x+el.w && pos.y >= el.y && pos.y <= el.y+el.h)
          {
            elements.push(el);
          }
        }
      }
    }

    return elements;
  }
}
