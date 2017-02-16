import {Data, TransformationPredicate} from './TransformationsContainer';

export const setRotation = (radians: number): TransformationPredicate => (data: Data) => {
  return Object.assign({}, data, {
    rotation: radians,
  });
};

export const setScale = ({x, y}: {x: number, y: number}): TransformationPredicate => (data: Data) => {
  return Object.assign({}, data, {
    scale: [x, y],
  });
};

export const setOffset = ({x, y}: {x: number, y: number}): TransformationPredicate => (data: Data) => {
  return Object.assign({}, data, {
    offset: [x, y],
  });
};
