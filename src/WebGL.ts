// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class WebGL {
  static initShader (gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type)
    if (shader == null) {
      throw new Error(`Unable to createShader of type ${type}`)
    }
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (compiled !== true) {
      const error = gl.getShaderInfoLog(shader)
      gl.deleteShader(shader)
      throw new Error(error ?? 'Empty compile status shader info')
    }
    return shader
  }

  static initWebGL (gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram {
    const vertexShader = WebGL.initShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = WebGL.initShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    const shaderProgram = gl.createProgram()
    if (shaderProgram == null) {
      throw new Error('Unable to create shader programm')
    }
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)
    return shaderProgram
  }

  static initVertexBuffers (gl: WebGLRenderingContext, program: WebGLProgram): number {
    // const SPHERE_DIV = 13

    // let
    //   i, ai, si, ci,
    //   j, aj, sj, cj,
    //   p1, p2

    let positions = []
    let indices = []

    // Generate coordinates
    // for (j = 0; j <= SPHERE_DIV; j++) {
    //   aj = j * Math.PI / SPHERE_DIV;
    //   sj = Math.sin(aj);
    //   cj = Math.cos(aj);
    //   for (i = 0; i <= SPHERE_DIV; i++) {
    //     ai = i * 2 * Math.PI / SPHERE_DIV;
    //     si = Math.sin(ai);
    //     ci = Math.cos(ai);
    //
    //     positions.push(si * sj);  // X
    //     positions.push(cj);       // Y
    //     positions.push(ci * sj);  // Z
    //   }
    // }

    positions = [
      // unique vertices coordinates
      1.0, 1.0, 1.0, // v0
      -1.0, 1.0, 1.0, // v1
      -1.0, -1.0, 1.0, // v2
      1.0, -1.0, 1.0, // v3
      1.0, -1.0, -1.0, // v4
      1.0, 1.0, -1.0, // v5
      -1.0, 1.0, -1.0, // v6
      -1.0, -1.0, -1.0 // v7
    ]

    // Generate indices
    // for (j = 0; j < SPHERE_DIV; j++) {
    //   for (i = 0; i < SPHERE_DIV; i++) {
    //     p1 = j * (SPHERE_DIV + 1) + i;
    //     p2 = p1 + (SPHERE_DIV + 1);
    //
    //     indices.push(p1);
    //     indices.push(p2);
    //     indices.push(p1 + 1);
    //
    //     indices.push(p1 + 1);
    //     indices.push(p2);
    //     indices.push(p2 + 1);
    //   }
    // }

    indices = [
      0, 1, 2, 0, 2, 3, // front = v0 v1 v2 & v0 v2 v3
      0, 3, 4, 0, 4, 5, // right
      0, 5, 6, 0, 6, 1, // up
      1, 6, 7, 1, 7, 2, // left
      7, 4, 3, 7, 3, 2, // down
      4, 7, 6, 4, 6, 5 // back
    ]

    WebGL.initArrayBuffer(gl, program, 'a_Position', new Float32Array(positions), gl.FLOAT, 3)
    WebGL.initArrayBuffer(gl, program, 'a_Normal', new Float32Array(positions), gl.FLOAT, 3)

    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    WebGL.initElementArrayBuffer(gl, new Uint16Array(indices))

    return indices.length
  }

  static getAttribute (gl: WebGLRenderingContext, program: WebGLProgram, name: string): number {
    const attributeLocation = gl.getAttribLocation(program, name)
    if (attributeLocation < 0) {
      throw new Error()
    }
    return attributeLocation
  }

  static getUniform (gl: WebGLRenderingContext, program: WebGLProgram, name: string): WebGLUniformLocation {
    const uniformLocation = gl.getUniformLocation(program, name)
    if (uniformLocation == null) {
      throw new Error(`Unable to get uniform location ${name}`)
    }
    return uniformLocation
  }

  static initArrayBuffer (gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: ArrayBuffer, type: number, num: number): void {
    const buffer = gl.createBuffer()
    if (buffer == null) {
      throw new Error('Unable to create buffer')
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

    const attribute = WebGL.getAttribute(gl, program, name)

    gl.vertexAttribPointer(attribute, num, type, false, 0, 0)
    gl.enableVertexAttribArray(attribute)
  }

  static initElementArrayBuffer (gl: WebGLRenderingContext, data: ArrayBuffer): void {
    const buffer = gl.createBuffer()
    if (buffer == null) {
      throw new Error('Unable to create buffer')
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW)
  }

  static drawFrame (gl: WebGLRenderingContext, width: number, height: number, length: number): void {
    gl.clearColor(1, 1, 1, 1)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.viewport(0, 0, width, height)
    // gl.drawElements(gl.LINES, length, gl.UNSIGNED_SHORT, 0);
    // gl.drawElements(gl.LINE_STRIP, length, gl.UNSIGNED_SHORT, 0);
    // gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, length / 3)
  }

  static initMatrices (gl: WebGLRenderingContext, program: WebGLProgram): WebGLUniformLocation[] {
    return [
      WebGL.getUniform(gl, program, 'u_ModelMatrix'),
      WebGL.getUniform(gl, program, 'u_MvpMatrix'),
      WebGL.getUniform(gl, program, 'u_NormalMatrix'),
      WebGL.getUniform(gl, program, 'u_LightColor'),
      WebGL.getUniform(gl, program, 'u_LightPosition'),
      WebGL.getUniform(gl, program, 'u_AmbientLight')
    ]
  }
}
