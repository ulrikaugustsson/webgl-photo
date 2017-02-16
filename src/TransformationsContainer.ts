import Matrix3 from './Mat3';
import ContextContainer from './ContextContainer';

export type Data = {
  rotation: number,
  offset: [number, number],
  scale: [number, number]
};

export interface TransformationPredicate {
  (data: Data): Data;
}

export default class TransformationContainer {
  private data: Data;
  private matrix3: Matrix3;

  constructor(data?: Data) {
    this.matrix3 = new Matrix3(new Float32Array(9));
    this.data = data || {
      rotation: 0,
      offset: [0, 0],
      scale: [0, 0]
    };
  }

  map(pred: TransformationPredicate) {
    this.data = pred(this.data);
  }

  apply(contextContainer: ContextContainer) {
    this.matrix3
      .identity()
      .projection(contextContainer.clientWidth, contextContainer.clientHeight)
      .scale(this.data.scale)
      .translate(this.data.offset)
      .rotate(this.data.rotation);

    contextContainer.map(this.matrix3.matrix);
  }

  fold() {
    return Object.assign({}, this.data);
  }
}
