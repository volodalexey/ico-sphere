import { Loader } from './Loader'
import { Pointer } from './Pointer'
import { Canvas } from './Canvas'
import { Matrix4 } from './Matrix4'
import { WebGL } from './WebGL'
import { IcoSphere } from './IcoSphere'

const ellipsis: HTMLElement | null = document.querySelector('.ellipsis')
if (ellipsis != null) {
  ellipsis.style.display = 'none'
}

let curSplit = ''
async function loadAndRun (): Promise<void> {
  const [vertexShaderSource, fragmentShaderSource] = await Promise.all([
    Loader.getText('/shaders/ico_sphere.vert'),
    Loader.getText('/shaders/ico_sphere.frag')
  ])
  const pointer = new Pointer()
  const canvas = new Canvas({
    selector: 'canvas',
    initWidth: window.innerWidth,
    initHeight: window.innerHeight,
    onPointerDown: pointer.onPointerDown,
    onPointerMove: pointer.onPointerMove,
    onPointerUp: pointer.onPointerUp
  })
  const splitElement = document.querySelector<HTMLInputElement>('#split_count')
  if (splitElement == null) {
    throw new Error('Unable to select split element')
  }
  const rotateElement = document.querySelector<HTMLInputElement>('#rotate')
  if (rotateElement == null) {
    throw new Error('Unable to select rotate element')
  }
  const speedElement = document.querySelector<HTMLInputElement>('#rotate_speed')
  if (speedElement == null) {
    throw new Error('Unable to select speed element')
  }

  const gMvpMatrix = new Matrix4()
  const gl = canvas.context
  const webglProgram = WebGL.initWebGL(gl, vertexShaderSource, fragmentShaderSource)
  let positions: number[]
  let colors: number[]
  let xAngle = 0.0
  let yAngle = 0.0
  let zAngle = 0.0

  // https://github.com/mrdoob/stats.js
  // npm install stats.js
  // let stats = new Stats();
  //   stats.setMode(1);
  //   stats.showPanel(0);
  // document.body.appendChild(stats.dom);

  const uMvpMatrix = WebGL.getUniform(gl, webglProgram, 'u_MvpMatrix')
  const mvpMatrix = new Matrix4()
  mvpMatrix.setPerspective(30, canvas.initWidth / canvas.initHeight, 1, 100)
  mvpMatrix.lookAt(0, 0, 5, 0, 0, 0, 0, 1, 0)
  gMvpMatrix.set(mvpMatrix)

  const checkAndSplit = (): void => {
    if (curSplit !== splitElement.value) {
      curSplit = splitElement.value;
      [positions, colors] = IcoSphere.icosahedronVertices()
      for (let i = Number(splitElement.value); i > 1; i--) {
        [positions, colors] = IcoSphere.splitVertices(positions, colors)
      }
      const positionsLength = positions.length
      for (let i = 0; i < positionsLength; i = i + 3) {
        const [x, y, z] = IcoSphere.normalize(positions[i], positions[i + 1], positions[i + 2])
        positions[i] = x
        positions[i + 1] = y
        positions[i + 2] = z
      }
      WebGL.initArrayBuffer(gl, webglProgram, 'a_Position', new Float32Array(positions), gl.FLOAT, 3)
      WebGL.initArrayBuffer(gl, webglProgram, 'a_Color', new Float32Array(colors), gl.FLOAT, 3)
    }
  }

  const updateCanvas = (): void => {
    // stats.begin();

    checkAndSplit()

    if (pointer.points.length > 0) {
      const p = pointer.points[0]
      if (p.diffPrevX > 0 || p.diffPrevY > 0) {
        if (p.diffPrevY > 0) {
          xAngle = xAngle + p.diffPrevY
          p.diffPrevY = 0
        }
        if (p.diffPrevX > 0) {
          yAngle = yAngle + p.diffPrevX
          p.diffPrevX = 0
        }
        gMvpMatrix.set(mvpMatrix)
        if (xAngle > 0 || yAngle > 0) {
          gMvpMatrix.rotate(Math.hypot(xAngle, yAngle), xAngle, yAngle, 0.0)
        }
      }
    } else if (rotateElement.checked) {
      gMvpMatrix.set(mvpMatrix)
      xAngle = xAngle + parseFloat(speedElement.value)
      xAngle = xAngle % 360
      yAngle = yAngle + parseFloat(speedElement.value)
      yAngle = yAngle % 360
      zAngle = zAngle + parseFloat(speedElement.value)
      zAngle = zAngle % 360
      gMvpMatrix.rotate(xAngle, 1.0, 0.0, 0.0)
      gMvpMatrix.rotate(yAngle, 0.0, 1.0, 0.0)
      gMvpMatrix.rotate(zAngle, 0.0, 0.0, 1.0)
    }
    gl.uniformMatrix4fv(uMvpMatrix, false, gMvpMatrix.elements)
    WebGL.drawFrame(gl, canvas.initWidth, canvas.initHeight, positions.length)

    // stats.end()
    requestAnimationFrame(updateCanvas)
  }

  updateCanvas()
}

loadAndRun().catch(err => {
  console.error(err)
  const errorMessageDiv: HTMLElement | null = document.querySelector('.error-message')
  if (errorMessageDiv != null) {
    errorMessageDiv.classList.remove('hidden')
    errorMessageDiv.innerText = ((Boolean(err)) && (Boolean(err.message))) ? err.message : err
  }
  const errorStackDiv: HTMLElement | null = document.querySelector('.error-stack')
  if (errorStackDiv != null) {
    errorStackDiv.classList.remove('hidden')
    errorStackDiv.innerText = ((Boolean(err)) && (Boolean(err.stack))) ? err.stack : ''
  }
  const elementsToHide = document.querySelectorAll('[data-view="app"]')
  if (elementsToHide.length > 0) {
    for (const el of elementsToHide) {
      el.parentElement?.removeChild(el)
    }
  }
})
