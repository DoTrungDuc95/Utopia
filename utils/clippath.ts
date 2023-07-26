import { color_array, shapeType, shape_array } from '@/assest-data/shapes';

export type Shape = (typeof shape_array)[0];

export const mapShape = (shape: Shape): Shape => {
  const { coords } = shape;
  let newCoords = coords.map(([x, y], i) => [x, y, i + 1]);
  if (shape.name === 'Custom Polygon') newCoords = [];
  const s = { ...shape, coords: newCoords };
  return JSON.parse(JSON.stringify(s));
};

export const createClippath = (shape: Shape) => {
  const { coords, type, radius, position } = shape;
  let str = `${type}(`;

  if (coords.length === 0) return "";

  coords.forEach(([x, y], i) => {
    if (type === shapeType.polygon) {
      if (i) str += ', ';
      str += `${Math.round(x)}% ${Math.round(y)}%`;
    } else if (type === shapeType.circle) {
      if (i === 0) {
        str += `${radius[0].toFixed(1)}% at ${Math.round(
          position[0]
        )}% ${Math.round(position[1])}%`;
      }
    } else if (type === shapeType.ellipse) {
      if (i === 0) {
        str += `${Math.round(radius[0])}% ${Math.round(
          radius[1]
        )}% at ${Math.round(position[0])}% ${Math.round(position[1])}%`;
      }
    } else {
      if (i) str += ' ';
      if (i === 3) str += `${Math.round(x)}%`;
      else if (i === 2) str += `${Math.round(100 - y)}%`;
      else if (i === 1) str += `${Math.round(100 - x)}%`;
      else str += `${Math.round(y)}%`;
    }
  });
  return str + ')';
};
