import createProgram from './createProgram';
import setPosition from './setPosition';
import setImageAsTexture from './setImageAsTexture';

const OFFSET = 0;
const COUNT = 6;

export default class ContextContainer {
  readonly _glContext: WebGLRenderingContext;
  readonly _image: HTMLImageElement;
  readonly _glProgram: WebGLProgram;

  readonly _uMatrix: WebGLUniformLocation;
  readonly _uLevels: WebGLUniformLocation;
  readonly _uGamma: WebGLUniformLocation;

  private _levels: Float32Array; // [BLACK<RGB>, WHITE<RGB>]  
  private _gamma: number;

  public clientWidth: number;
  public clientHeight: number;

  constructor(image: HTMLImageElement, glContext: WebGLRenderingContext, fragmentShader: string, vertextShader: string) {
    this.clientWidth = glContext.canvas.clientWidth;
    this.clientHeight = glContext.canvas.clientHeight;

    this._glContext = glContext;

    const glProgram = createProgram(glContext, vertextShader, fragmentShader);

    if (!glProgram) throw new Error('Could not create WebGLProgram');

    // set readonly properties
    this._image = image;
    this._glProgram = glProgram;

    // set stuff on the glContext
    glContext.useProgram(this._glProgram);
    glContext.viewport(0, 0, glContext.canvas.width, glContext.canvas.height);

    // set uniforms
    const uLevels = this._glContext.getUniformLocation(this._glProgram, 'u_levels');
    const uGamma = this._glContext.getUniformLocation(this._glProgram, 'u_gamma');
    const uMatrix = this._glContext.getUniformLocation(this._glProgram, 'u_matrix');

    if (!uLevels || !uGamma || !uMatrix) throw new Error('Could not get uniforms');

    this._uLevels = uLevels;
    this._uGamma = uGamma;
    this._uMatrix = uMatrix;

    this._levels = new Float32Array([0, 0, 0, 255, 255, 255]);
    this._gamma = 1.0;

    setPosition(this._glProgram, this._glContext, 1, 1);
    setImageAsTexture(this._glProgram, this._glContext, image);
  }

  map(matrix: Float32Array) {
    this._glContext.uniformMatrix3fv(this._uMatrix, false, matrix);
    this._glContext.uniform3fv(this._uLevels, this._levels);
    this._glContext.uniform1f(this._uGamma, this._gamma);

    this._glContext.drawArrays(this._glContext.TRIANGLES, OFFSET, COUNT);
  }
}
