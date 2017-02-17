import ContextContainer from '../src/ContextContainer';
import TransformationsContainer from '../src/TransformationsContainer';
import * as transHelpers from '../src/transformHelpers';

const glCanvas = document.querySelector('#webgl-canvas');
const image = new Image();
const fragmentShader = document.querySelector('#fragment-shader').innerText;
const vertexShader = document.querySelector('#vertex-shader').innerText;

if (glCanvas) {
  image.addEventListener('load', () => {
    const glContext = glCanvas.getContext('webgl') || glCanvas.getContext('experimental-webgl');

    if (!glContext) throw new Error('could not get webgl context');

    const contextContainer = new ContextContainer(image, glContext, fragmentShader, vertexShader);
    const transforms = new TransformationsContainer();

    transforms
      .map(transHelpers.setScale({ x: 0.5, y: 0.5 }));

    function drawStuff() {
      requestAnimationFrame(() => {
        drawStuff();

        transforms
          .map(transHelpers.rotate(0.01))
          .apply(contextContainer);
      });
    }

    drawStuff();

  }, false);
}

image.src = '/image.png';
