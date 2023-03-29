// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class IcoSphere {
  static icosahedronElements (): [number[], number[]] {
    // create 12 vertices of a icosahedron
    const t = (1.0 + Math.sqrt(5.0)) / 2.0
    const positions = [
      -1, t, 0,
      1, t, 0,
      -1, -t, 0,
      1, -t, 0,

      0, -1, t,
      0, 1, t,
      0, -1, -t,
      0, 1, -t,

      t, 0, -1,
      t, 0, 1,
      -t, 0, -1,
      -t, 0, 1
    ]
    const indices = [
      0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, // 5 faces around point 0
      1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, // 5 adjacent faces
      3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, // 5 faces around point 3
      4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1 // 5 adjacent faces
    ]

    return [positions, indices]
  }

  static icosahedronVertices (): [number[], number[]] {
    const [positions, indices] = IcoSphere.icosahedronElements()
    const indicesLength = indices.length
    const vertices: number[] = []
    const colors: number[] = []

    for (let i = 0; i < indicesLength; i = i + 3) {
      const faceVertices = IcoSphere.getFaceVertices(i, indices, positions)
      Array.prototype.push.apply(vertices, faceVertices)
      const
        r1 = Math.random(); const g1 = Math.random(); const b1 = Math.random()
      const r2 = Math.random(); const g2 = Math.random(); const b2 = Math.random()
      const r3 = Math.random(); const g3 = Math.random(); const b3 = Math.random()
      const faceColors = [r1, g1, b1, r2, g2, b2, r3, g3, b3]
      Array.prototype.push.apply(colors, faceColors)
    }

    return [vertices, colors]
  }

  static splitVertices (vertices: number[], colors: number[]): [number[], number[]] {
    const newVertices: number[] = []
    const midpoints: Record<string, [number, number, number]> = {}
    const verticesLength = vertices.length

    // iterate through each face to divide it into 4 faces
    for (let i = 0; i < verticesLength; i = i + 9) { // each face is 9 vertices
      const v1X = vertices[i]; const v1Y = vertices[i + 1]; const v1Z = vertices[i + 2]
      const v2X = vertices[i + 3]; const v2Y = vertices[i + 4]; const v2Z = vertices[i + 5]
      const v3X = vertices[i + 6]; const v3Y = vertices[i + 7]; const v3Z = vertices[i + 8]

      const [v12X, v12Y, v12Z] = IcoSphere.getMidpoint(v1X, v1Y, v1Z, v2X, v2Y, v2Z, midpoints)
      const [v23X, v23Y, v23Z] = IcoSphere.getMidpoint(v2X, v2Y, v2Z, v3X, v3Y, v3Z, midpoints)
      const [v31X, v31Y, v31Z] = IcoSphere.getMidpoint(v3X, v3Y, v3Z, v1X, v1Y, v1Z, midpoints)

      const
        splitVertices = [
          v1X, v1Y, v1Z,
          v12X, v12Y, v12Z,
          v31X, v31Y, v31Z,

          v12X, v12Y, v12Z,
          v2X, v2Y, v2Z,
          v23X, v23Y, v23Z,

          v31X, v31Y, v31Z,
          v23X, v23Y, v23Z,
          v3X, v3Y, v3Z,

          v12X, v12Y, v12Z,
          v23X, v23Y, v23Z,
          v31X, v31Y, v31Z
        ]
      const splitColors = [
        colors[i], colors[i + 1], colors[i + 2],
        Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random(),

        Math.random(), Math.random(), Math.random(),
        colors[i + 3], colors[i + 4], colors[i + 5],
        Math.random(), Math.random(), Math.random(),

        Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random(),
        colors[i + 6], colors[i + 7], colors[i + 8],

        Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random(),
        Math.random(), Math.random(), Math.random()
      ]

      Array.prototype.push.apply(newVertices, splitVertices)
      Array.prototype.push.apply(colors, splitColors)
    }

    return [newVertices, colors]
  }

  static getFaceVertices (index: number, indices: number[], positions: number[]): [
    number, number, number,
    number, number, number,
    number, number, number
  ] {
    const face = [
      indices[index],
      indices[index + 1],
      indices[index + 2]
    ]
    const iterator = [
      3 * face[0],
      3 * face[1],
      3 * face[2]
    ]
    return [
      positions[iterator[0]], positions[iterator[0] + 1], positions[iterator[0] + 2],
      positions[iterator[1]], positions[iterator[1] + 1], positions[iterator[1] + 2],
      positions[iterator[2]], positions[iterator[2] + 1], positions[iterator[2] + 2]
    ]
  }

  static midpoint (
    aX: number, aY: number, aZ: number,
    bX: number, bY: number, bZ: number
  ): [number, number, number] {
    return [
      (aX + bX) / 2,
      (aY + bY) / 2,
      (aZ + bZ) / 2
    ]
  }

  static pointToKey (pX: number, pY: number, pZ: number): string {
    return pX.toPrecision(6) + ',' +
      pY.toPrecision(6) + ',' +
      pZ.toPrecision(6)
  }

  static getMidpoint (
    aX: number, aY: number, aZ: number,
    bX: number, bY: number, bZ: number,
    midpoints: Record<string, [number, number, number]>
  ): [number, number, number] {
    const [pX, pY, pZ] = IcoSphere.midpoint(aX, aY, aZ, bX, bY, bZ)
    const pointKey = IcoSphere.pointToKey(pX, pY, pZ)
    const cachedPoint = midpoints[pointKey]
    if (cachedPoint != null) {
      return cachedPoint
    } else {
      midpoints[pointKey] = [pX, pY, pZ]
      return [pX, pY, pZ]
    }
  }

  static getPointIndexOf (pX: number, pY: number, pZ: number, points: number[]): number {
    let index = -1
    let indX; let indY; let indZ
    if ((indX = points.indexOf(pX)) > -1) {
      if ((indY = points.indexOf(pY)) > -1) {
        if ((indZ = points.indexOf(pZ)) > -1) {
          // 3 vertices found and they are siblings
          if (indZ - indY === 1 && indY - indX === 1) {
            index = indX
          }
        }
      }
    }
    return index
  }

  static subDivide (positions: number[], indices: number[]): [number[], number[]] {
    const newIndices: number[] = []
    const newPositions: number[] = []
    const midpoints: Record<string, [number, number, number]> = {}
    const indicesLength = indices.length

    // iterate through each face to divide it into 4 faces
    for (let i = 0; i < indicesLength; i = i + 3) {
      const [
        v1X, v1Y, v1Z,
        v2X, v2Y, v2Z,
        v3X, v3Y, v3Z
      ] = IcoSphere.getFaceVertices(i, indices, positions)

      const [v12X, v12Y, v12Z] = IcoSphere.getMidpoint(v1X, v1Y, v1Z, v2X, v2Y, v2Z, midpoints)
      const [v23X, v23Y, v23Z] = IcoSphere.getMidpoint(v2X, v2Y, v2Z, v3X, v3Y, v3Z, midpoints)
      const [v31X, v31Y, v31Z] = IcoSphere.getMidpoint(v3X, v3Y, v3Z, v1X, v1Y, v1Z, midpoints)

      const calculatedPositions = [
        v1X, v1Y, v1Z,
        v2X, v2Y, v2Z,
        v3X, v3Y, v3Z,
        v12X, v12Y, v12Z,
        v23X, v23Y, v23Z,
        v31X, v31Y, v31Z
      ]; const filteredPositions = []; const pointIndices = []
      // check for already existing points to reduce result size
      for (let i = 0; i < 18; i = i + 3) {
        let index = IcoSphere.getPointIndexOf(
          calculatedPositions[i],
          calculatedPositions[i + 1],
          calculatedPositions[i + 2],
          newPositions
        )
        if (index === -1) {
          // return new length => get new index
          index = (filteredPositions.push(calculatedPositions[i]) - 1) / 3
          filteredPositions.push(calculatedPositions[i + 1])
          filteredPositions.push(calculatedPositions[i + 2])
        }
        pointIndices.push(index)
      }

      Array.prototype.push.apply(newPositions, filteredPositions)
      Array.prototype.push.apply(newIndices, pointIndices)
    }

    return [newPositions, newIndices]
  }

  static normalize (x: number, y: number, z: number): [number, number, number] {
    const length = Math.sqrt(x * x + y * y + z * z)
    if (length === 0) {
      return [0, 0, 0]
    }
    return [x / length, y / length, z / length]
  }
}
