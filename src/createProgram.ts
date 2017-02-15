type ShaderType = 0x8B31 | 0x8B30 | number;

function createShader(gl: WebGLRenderingContext, type: ShaderType, source: string) {
  if (gl === null || gl === undefined) {
    throw new Error('No webgl context');
  }

  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  console.warn(gl.getShaderInfoLog(shader)); // eslint-disable-line no-console
  gl.deleteShader(shader);

  throw new Error('Error compiling shader');
}

export default function createProgram(gl: WebGLRenderingContext, vertexShader: string, fragmentShader: string) {
  const program = gl.createProgram();

  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShader));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShader));

  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  console.warn(gl.getProgramInfoLog(program)); // eslint-disable-line no-console
  gl.deleteProgram(program);

  throw new Error('Could not create program');
}
