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
      canvas = new Canvas(window.innerWidth, window.innerHeight),
      cur_split = null,
      split_element = document.querySelector('#split_count'),
      rotate_element = document.querySelector('#rotate'),
      speed_element = document.querySelector('#rotate_speed'),
      canvas_width = canvas.canvas_width, canvas_height = canvas.canvas_height;

    canvas.initializeRPS('#rps');

    let
      g_MvpMatrix = new Matrix4(),
      [gl] = Canvas.initializeCanvas('#c', canvas_width, canvas_height, 'webgl'),
      shader_program = WebGL.initWebGL(gl, results[1], results[2]),
      currentAngle = 0.0,
      positions, colors;

    canvas.fps_last = Date.now();
    canvas.rps_last = canvas.fps_last;
    canvas.requests_count = 0;

    let u_MvpMatrix = WebGL.getUniform(gl, shader_program, 'u_MvpMatrix');
    let mvpMatrix = new Matrix4();
    mvpMatrix.setPerspective(30, canvas_width / canvas_height, 1, 100);
    mvpMatrix.lookAt(0, 0, 5, 0, 0, 0, 0, 1, 0);
    mvpMatrix.rotate(30, 1.0, 0.0, 0.0);
    g_MvpMatrix.set(mvpMatrix);

    const
      checkAndSplit = () => {
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
        }
        return [positions, colors];
      },
      updateCanvas = (closure) => {
        canvas.requests_count++;
        [positions, colors] = checkAndSplit();

        WebGL.initArrayBuffer(gl, shader_program, 'a_Position', new Float32Array(positions), gl.FLOAT, 3);
        WebGL.initArrayBuffer(gl, shader_program, 'a_Color', new Float32Array(colors), gl.FLOAT, 3);

        if (rotate_element.checked) {
          g_MvpMatrix.set(mvpMatrix);
          currentAngle = currentAngle + parseFloat(speed_element.value);
          currentAngle = currentAngle % 360;
          g_MvpMatrix.rotate(currentAngle, 1.0, 0.0, 0.0); // x
          g_MvpMatrix.rotate(currentAngle, 0.0, 1.0, 0.0); // y
          g_MvpMatrix.rotate(currentAngle, 0.0, 0.0, 1.0); // z
        }
        gl.uniformMatrix4fv(u_MvpMatrix, false, g_MvpMatrix.elements);
        WebGL.drawFrame(gl, canvas, positions.length);

        requestAnimationFrame(closure);
      },
      countRPS = () => {
        let
          now = Date.now(),
          elapsed = now - canvas.rps_last;
        canvas.rps_element.value = (canvas.requests_count * 1000 / elapsed).toFixed(1);
        canvas.requests_count = 0;
        canvas.rps_last = now;
      },
      closure = () => {
        updateCanvas(closure)
      };

    setInterval(countRPS, 1000);
    closure();
  })
  .catch(e => console.error(e.stack || e));