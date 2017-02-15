const OFFSET = 0;
const COUNT = 6;
const SIZE = 2;
const NORMALIZE = false;
const STRIDE = 0;

export default function setImageAsTexture(glProgram: WebGLProgram, glContext: WebGLRenderingContext, image: HTMLImageElement) {
  const texCoordLocation = glContext.getAttribLocation(glProgram, 'a_texCoord');
  const texCoordBuffer = glContext.createBuffer();
  glContext.bindBuffer(glContext.ARRAY_BUFFER, texCoordBuffer);
  glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0,
  ]), glContext.STATIC_DRAW);
  glContext.enableVertexAttribArray(texCoordLocation);
  glContext.vertexAttribPointer(texCoordLocation, 2, glContext.FLOAT, false, 0, 0);

  // Create a texture.
  const texture = glContext.createTexture();
  glContext.bindTexture(glContext.TEXTURE_2D, texture);

  // Set the parameters so we can render any size image.
  glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
  glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
  glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, glContext.NEAREST);
  glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MAG_FILTER, glContext.NEAREST);

  // Upload the image into the texture.
  glContext.texImage2D(glContext.TEXTURE_2D, 0, glContext.RGBA, glContext.RGBA, glContext.UNSIGNED_BYTE, image);
}
