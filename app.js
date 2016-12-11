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
      canvas_width = canvas.canvas_width, canvas_height = canvas.canvas_height;

    let
      g_MvpMatrix = new Matrix4(),
      [gl] = Canvas.initializeCanvas('#c', canvas_width, canvas_height, 'webgl'),
      shader_program = WebGL.initWebGL(gl, results[1], results[2]),
      currentAngle = 0.0;

    canvas.fps_last = Date.now();
    canvas.rps_last = canvas.fps_last;

    const
      updateCanvas = (closure) => {
        currentAngle = currentAngle + 0.1;
        currentAngle = currentAngle % 360;
        g_MvpMatrix.set(mvpMatrix);
        // g_MvpMatrix.rotate(currentAngle, 1.0, 0.0, 0.0); // x
        // g_MvpMatrix.rotate(currentAngle, 0.0, 1.0, 0.0); // y
        // g_MvpMatrix.rotate(currentAngle, 0.0, 0.0, 1.0); // z
        gl.uniformMatrix4fv(u_MvpMatrix, false, g_MvpMatrix.elements);
        // gl.clearColor(1, 1, 1, 1);
        // gl.enable(gl.DEPTH_TEST);
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // gl.viewport(0, 0, canvas_width, canvas_height);
        // gl.drawArrays(gl.TRIANGLES, 0, length / 3);
        WebGL.drawFrame(gl, canvas, length);

        requestAnimationFrame(closure);
      },
      closure = () => {
        updateCanvas(closure)
      };

    let [positions, colors] = IcoSphere.icosahedronVertices();

    [positions, colors] = IcoSphere.splitVertices(positions, colors);
    [positions, colors] = IcoSphere.splitVertices(positions, colors);
    // [positions, colors] = IcoSphere.splitVertices(positions, colors);
    // [positions, colors] = IcoSphere.splitVertices(positions, colors);
    // [positions, colors] = IcoSphere.splitVertices(positions, colors);

    let
      positions_length = positions.length;
    for (let i = 0; i < positions_length; i = i + 3) {
      let [x, y, z] = IcoSphere.normalize(positions[i], positions[i + 1], positions[i + 2]);
      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;
    }

    let length = positions_length;
    WebGL.initArrayBuffer(gl, shader_program, 'a_Position', new Float32Array(positions), gl.FLOAT, 3);
    WebGL.initArrayBuffer(gl, shader_program, 'a_Color', new Float32Array(colors), gl.FLOAT, 3);
    // WebGL.initElementArrayBuffer(gl, new Uint16Array(indices));

    let u_MvpMatrix = WebGL.getUniform(gl, shader_program, 'u_MvpMatrix');
    let mvpMatrix = new Matrix4();
    mvpMatrix.setPerspective(30, canvas_width / canvas_height, 1, 100);
    mvpMatrix.lookAt(0, 0, 5, 0, 0, 0, 0, 1, 0);
    mvpMatrix.rotate(30, 1.0, 0.0, 0.0);
    // gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

    closure();
  })
  .catch(e => console.error(e.stack || e));