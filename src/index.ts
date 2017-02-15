import Matrix3 from './Mat3';
import createProgram from './createProgram';
import setPosition from './setPosition';
import setImageAsTexture from './setImageAsTexture';

const OFFSET = 0;
const COUNT = 6;
const SIZE = 2;
const NORMALIZE = false;
const STRIDE = 0;

export class WebGLPhotoEditor {
  readonly _glContext: WebGLRenderingContext;
  readonly _image: HTMLImageElement;
  readonly _glProgram: WebGLProgram;

  readonly _uLevels: WebGLUniformLocation;
  readonly _uGamma: WebGLUniformLocation;
  readonly _uMatrix: WebGLUniformLocation;

  private _levels: Float32Array; // [BLACK<RGB>, WHITE<RGB>]  
  private _gamma: number;
  private _matrix: Matrix3;
  private _rotation: number;
  private _offset: [number, number];
  private _scale: [number, number];

  constructor(image: HTMLImageElement, glCanvas: HTMLCanvasElement, fragmentShader: string, vertextShader: string) {
    const glContext = glCanvas.getContext('webgl') || glCanvas.getContext('experimental-webgl');

    if (!glContext) throw new Error('Could not get webgl context');

    const glProgram = createProgram(glContext, vertextShader, fragmentShader);

    if (!glProgram) throw new Error('Could not create WebGLProgram');

    // set readonly properties
    this._glContext = glContext;
    this._image = image; // TODO: should we be able to change the image?
    this._glProgram = glProgram;

    // set uniforms
    const uLevels = this._glContext.getUniformLocation(this._glProgram, 'u_levels');
    const uGamma = this._glContext.getUniformLocation(this._glProgram, 'u_gamma');
    const uMatrix = this._glContext.getUniformLocation(this._glProgram, 'u_matrix');

    if (!uLevels || !uGamma || !uMatrix) throw new Error('Could not get uniforms');

    this._uLevels = uLevels;
    this._uGamma = uGamma;
    this._uMatrix = uMatrix;

    // set defaults
    this._levels = new Float32Array([0, 0, 0, 255, 255, 255]);
    this._gamma = 1.0;
    this._matrix = new Matrix3(new Float32Array(9));
    this._rotation = 1.0;
    this._offset = [0, 0];
    this._scale = [1.0, 1.0];

    // set stuff on the glContext
    glContext.useProgram(this._glProgram);
    glContext.viewport(0, 0, glContext.canvas.width, glContext.canvas.height);

    setPosition(this._glProgram, this._glContext, 1, 1);
    setImageAsTexture(this._glProgram, this._glContext, image);
  }

  draw() {
    this._matrix
      .identity()
      .projection(this._glContext.canvas.clientWidth, this._glContext.canvas.clientHeight)
      .scale(this._scale)
      .translate(this._offset)
      .rotate(this._rotation);

    this._glContext.uniformMatrix3fv(this._uMatrix, false, this._matrix.matrix);

    this._glContext.uniform3fv(this._uLevels, this._levels);
    this._glContext.uniform1f(this._uGamma, this._gamma);

    this._glContext.drawArrays(this._glContext.TRIANGLES, OFFSET, COUNT);
  }
}
