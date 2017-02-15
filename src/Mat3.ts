export default class Matrix3 {
  matrix: Float32Array;

  constructor(matrixArray: Float32Array) {
    this.matrix = matrixArray;
  }

  identity() {
    this.matrix.set([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ]);

    return this;
  }

  projection(width: number, height: number) {
    this.multiply([
      2 / width, 0, 0,
      0, -2 / height, 0,
      -1, 1, 1,
    ], this.matrix, this.matrix);

    return this;
  }

  translate([tx, ty]: [number, number]) {
    this.matrix = this.multiply([
      1, 0, 0,
      0, 1, 0,
      tx, ty, 1,
    ], this.matrix, this.matrix);

    return this;
  }

  rotate(angleInRadians: number) {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    this.matrix = this.multiply([
      c, -s, 0,
      s, c, 0,
      0, 0, 1,
    ], this.matrix, this.matrix);

    return this;
  }

  scale([sx, sy]: [number, number]) {
    this.matrix = this.multiply([
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1,
    ], this.matrix, this.matrix);

    return this;
  }

  multiply(mat: number[], mat2: Float32Array, dest: Float32Array) {
    const a00 = mat[0];
    const a01 = mat[1];
    const a02 = mat[2];
    const a10 = mat[3];
    const a11 = mat[4];
    const a12 = mat[5];
    const a20 = mat[6];
    const a21 = mat[7];
    const a22 = mat[8];
    const b00 = mat2[0];
    const b01 = mat2[1];
    const b02 = mat2[2];
    const b10 = mat2[3];
    const b11 = mat2[4];
    const b12 = mat2[5];
    const b20 = mat2[6];
    const b21 = mat2[7];
    const b22 = mat2[8];

    dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
    dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
    dest[2] = b00 * a02 + b01 * a12 + b02 * a22;

    dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
    dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
    dest[5] = b10 * a02 + b11 * a12 + b12 * a22;

    dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
    dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
    dest[8] = b20 * a02 + b21 * a12 + b22 * a22;

    return dest;
  }
}
