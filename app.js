"use strict";
Promise.all([
  new Promise(resolve => {
    window.addEventListener('load', resolve, false);
  }),
  Load.getText('ico_sphere.vert'),
  Load.getText('ico_sphere.frag')
])
  .then(results => {

    let
      pointer = new Pointer(),
      canvas = new Canvas({
        selector: 'canvas',
        width: window.innerWidth,
        height: window.innerHeight,
        strContext: 'webgl',
        onMouseDown: (e) => pointer.onMouseDown(e),
        onMouseMove: (e) => pointer.onMouseMove(e),
        onMouseUp: (e) => pointer.onMouseUp(e),
        onTouchStart: (e) => pointer.onTouchStart(e),
        onTouchMove: (e) => pointer.onTouchMove(e),
        onTouchEnd: (e) => pointer.onTouchEnd(e),
      }),
      cur_split = null,
      split_element = document.querySelector('#split_count'),
      rotate_element = document.querySelector('#rotate'),
      speed_element = document.querySelector('#rotate_speed'),
      canvas_width = canvas.width, canvas_height = canvas.height;

    let
      g_MvpMatrix = new Matrix4(),
      gl = canvas.context,
      shader_program = WebGL.initWebGL(gl, results[1], results[2]),
      xAngle = 0.0, yAngle = 0.0, zAngle = 0.0,
      positions, colors;

    let stats = new Stats();
    stats.setMode(1);
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    let u_MvpMatrix = WebGL.getUniform(gl, shader_program, 'u_MvpMatrix');
    let mvpMatrix = new Matrix4();
    mvpMatrix.setPerspective(30, canvas_width / canvas_height, 1, 100);
    mvpMatrix.lookAt(0, 0, 5, 0, 0, 0, 0, 1, 0);
    g_MvpMatrix.set(mvpMatrix);

    function checkAndSplit() {
      if (cur_split !== split_element.value) {
        cur_split = split_element.value;
        [positions, colors] = IcoSphere.icosahedronVertices();
        for (let iteration = Number(split_element.value); iteration > 1; iteration--) {
          [positions, colors] = IcoSphere.splitVertices(positions, colors);
        }
        let positions_length = positions.length;
        for (let i = 0; i < positions_length; i = i + 3) {
          let [x, y, z] = IcoSphere.normalize(positions[i], positions[i + 1], positions[i + 2]);
          positions[i] = x;
          positions[i + 1] = y;
          positions[i + 2] = z;
        }
        positions = new Float32Array(positions);
        colors = new Float32Array(colors);
      }
      return [positions, colors];
    }

    (function updateCanvas() {
      stats.begin();
      [positions, colors] = checkAndSplit();

      WebGL.initArrayBuffer(gl, shader_program, 'a_Position', positions, gl.FLOAT, 3);
      WebGL.initArrayBuffer(gl, shader_program, 'a_Color', colors, gl.FLOAT, 3);

      if (pointer.start) {
        let p = pointer.pointers[0];
        if (p.diffPrevX || p.diffPrevY) {
          if (p.diffPrevY) {
            xAngle = xAngle + p.diffPrevY;
            xAngle = xAngle % 360;
            p.diffPrevY = 0;
          }
          if (p.diffPrevX) {
            yAngle = yAngle + p.diffPrevX;
            yAngle = yAngle % 360;
            p.diffPrevX = 0;
          }
          g_MvpMatrix.set(mvpMatrix);
          g_MvpMatrix.rotate(xAngle, 1.0, 0.0, 0.0);
          g_MvpMatrix.rotate(yAngle, 0.0, 1.0, 0.0);
          g_MvpMatrix.rotate(zAngle, 0.0, 0.0, 1.0);
        }
      } else if (rotate_element.checked) {
        g_MvpMatrix.set(mvpMatrix);
        xAngle = xAngle + parseFloat(speed_element.value);
        xAngle = xAngle % 360;
        yAngle = yAngle + parseFloat(speed_element.value);
        yAngle = yAngle % 360;
        zAngle = zAngle + parseFloat(speed_element.value);
        zAngle = zAngle % 360;
        g_MvpMatrix.rotate(xAngle, 1.0, 0.0, 0.0);
        g_MvpMatrix.rotate(yAngle, 0.0, 1.0, 0.0);
        g_MvpMatrix.rotate(zAngle, 0.0, 0.0, 1.0);
      }
      gl.uniformMatrix4fv(u_MvpMatrix, false, g_MvpMatrix.elements);
      WebGL.drawFrame(gl, canvas_width, canvas_height, positions.length);

      stats.end();
      requestAnimationFrame(updateCanvas);
    })()
  })
  .catch(e => console.error(e.stack || e));