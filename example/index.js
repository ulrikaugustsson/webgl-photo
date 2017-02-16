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

    glEditor.setScale({x: 0.5, y: 0.5});

    function drawStuff() {
      requestAnimationFrame(() => {
        drawStuff();

        glEditor
          .rotate(0.01)
          .draw();
      });
    }

    drawStuff();
    
  }, false);
}

image.src = '/image.png';
