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

    setPosition(this._glProgram, this._glContext, 1, 1);
    setImageAsTexture(this._glProgram, this._glContext, image);
  }

  map(matrix: Float32Array) {
    this._glContext.uniformMatrix3fv(this._uMatrix, false, matrix);

    this._glContext.drawArrays(this._glContext.TRIANGLES, OFFSET, COUNT);
  }
}
