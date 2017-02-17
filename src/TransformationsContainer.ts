import Matrix3 from './Mat3';
import ContextContainer from './ContextContainer';

import Pipe from './Pipe';
import * as matrix3Helpers from './matrix3Helpers';

export type Data = {
  rotation: number,
  offset: [number, number],
  scale: [number, number]
};

export interface TransformationPredicate {
  (data: Data): Data;
}

export type Outdata = {
  data: Data,
  matrix3: Matrix3,
};

export default class TransformationContainer {
  private data: Data;
  private matrix3: Float32Array;

  constructor(data?: Data, matrix3?: Float32Array) {
    this.matrix3 = matrix3 || new Float32Array(9);
    this.data = data || {
      rotation: 0,
      offset: [0, 0],
      scale: [0, 0]
    };
  }

  map(pred: TransformationPredicate) {
    this.data = pred(this.data);

    return new TransformationContainer(this.data, this.matrix3);
  }

  apply(contextContainer: ContextContainer) {
    const matrixPipe = new Pipe(this.matrix3)
      .map(matrix3Helpers.identity)
      .map(matrix3Helpers.projection.bind(null, contextContainer.clientWidth, contextContainer.clientHeight))
      .map(matrix3Helpers.scale.bind(null, this.data.scale))
      .map(matrix3Helpers.translate.bind(null, this.data.offset))
      .map<Float32Array>(matrix3Helpers.rotate.bind(null, this.data.rotation));

    contextContainer.map(matrixPipe.fold());
  }

  fold(): Outdata {
    const returnMatrix = new Float32Array(9);
    returnMatrix.set(this.matrix3);

    return {
      data: Object.assign({}, this.data),
      matrix3: new Matrix3(returnMatrix),
    };
  }
}
