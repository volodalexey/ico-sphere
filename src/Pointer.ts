interface IPoint {
  id: number
  type: string
  button: number
  startX: number
  startY: number
  curX: number
  curY: number
  prevX: number
  prevY: number
  diffStartX: number
  diffStartY: number
  diffPrevX: number
  diffPrevY: number
}

export class Pointer {
  public touchButton = 0
  public points: IPoint[] = []
  public prevent = true

  findPoint (id: number): IPoint | undefined {
    return this.points.find(point => point.id === id)
  }

  findPointIdx (id: number): number {
    return this.points.findIndex(point => point.id === id)
  }

  findAndRemovePoint (id: number): void {
    let index = -1
    if (id != null) {
      index = this.findPointIdx(id)
    }
    console.log('findAndRemovePoint', index)
    if (index > -1) {
      this.points.splice(index, 1)
    }
  }

  onPointerDown = (e: PointerEvent): void => {
    console.log(e.pointerId, e.pointerType, e.button, e.type)
    this.findAndRemovePoint(e.pointerId)
    if (e.button === 0) {
      this.points.push({
        id: e.pointerId,
        type: e.pointerType,
        button: e.button,
        startX: e.clientX,
        startY: e.clientY,
        curX: e.clientX,
        curY: e.clientY,
        prevX: e.clientX,
        prevY: e.clientY,
        diffStartX: 0,
        diffStartY: 0,
        diffPrevX: 0,
        diffPrevY: 0
      })
    }
  }

  onPointerMove = (e: PointerEvent): void => {
    console.log(e.pointerId, e.pointerType, e.button, e.type)
    const pointer = this.findPoint(e.pointerId)
    if (pointer != null) {
      pointer.prevX = pointer.curX
      pointer.prevY = pointer.curY
      pointer.curX = e.clientX
      pointer.curY = e.clientY
      pointer.diffStartX = pointer.startX - e.clientX
      pointer.diffStartY = pointer.startY - e.clientY
      pointer.diffPrevX = e.clientX - pointer.prevX
      pointer.diffPrevY = e.clientY - pointer.prevY
    }
  }

  onPointerUp = (e: PointerEvent): void => {
    console.log(e.pointerId, e.pointerType, e.button, e.type)
    this.findAndRemovePoint(e.pointerId)
  }
}
