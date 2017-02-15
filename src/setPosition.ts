const OFFSET = 0;
const COUNT = 6;
const SIZE = 2;
const NORMALIZE = false;
const STRIDE = 0;

export default function setPosition(glProgram: WebGLProgram, glContext: WebGLRenderingContext, width: number, height: number) {
  const positionAttributeLocation = glContext.getAttribLocation(glProgram, 'a_position');

  const newWidth = width * 0.8;
  const newHeight = height * 0.8;

  const x0 = width === 1 ? 0 : width - newWidth;
  const x1 = width === 1 ? glContext.canvas.width : width - x0;

  const y0 = height === 1 ? 0 : height - newHeight;
  const y1 = height === 1 ? glContext.canvas.height : height - y0;

  const positionBuffer = glContext.createBuffer();
  glContext.bindBuffer(glContext.ARRAY_BUFFER, positionBuffer);
  glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array([
    x0, y0,
    x1, y0,
    x0, y1,
    x0, y1,
    x1, y0,
    x1, y1,
  ]), glContext.STATIC_DRAW);
  glContext.enableVertexAttribArray(positionAttributeLocation);
  glContext.vertexAttribPointer(positionAttributeLocation, SIZE, glContext.FLOAT, NORMALIZE, STRIDE, OFFSET);
}
