import {
  WebGLPhotoEditor
} from '../src/index';

const glCanvas = document.querySelector('#webgl-canvas');
const image = new Image();
const fragmentShader = document.querySelector('#fragment-shader').innerText;
const vertexShader = document.querySelector('#vertex-shader').innerText;

if (glCanvas) {
  image.addEventListener('load', () => {
    console.log('image loaded', image);
    const glEditor = new WebGLPhotoEditor(image, glCanvas, fragmentShader, vertexShader);

    glEditor.draw();
  }, false);
}

image.src = '/image.png';
