export function getPos(e, canvas)
{
  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.x;
  let y = e.clientY - rect.y;
  return {x: x, y: y};
}
