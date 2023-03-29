interface ICanvasOptions {
  selector?: string
  element?: HTMLCanvasElement
  initWidth?: number
  initHeight?: number
  onPointerDown?: (ev: PointerEvent) => void
  onPointerMove?: (ev: PointerEvent) => void
  onPointerUp?: (ev: PointerEvent) => void
}

export class Canvas {
  public element!: HTMLCanvasElement
  public context!: WebGLRenderingContext
  public initWidth!: number
  public initHeight!: number
  constructor (options: ICanvasOptions = {}) {
    this.init(options)
  }

  init (options: ICanvasOptions): void {
    const { selector, element, initWidth, initHeight } = options
    let qsElement
    if (typeof selector === 'string' && selector.length > 0) {
      qsElement = document.querySelector<HTMLCanvasElement>(selector)
    }
    this.element = element ?? qsElement ?? document.createElement('canvas')
    const ctx = this.element.getContext('webgl')
    if (ctx == null) {
      throw new Error('Unable to get webgl context')
    }
    this.context = ctx
    this.initWidth = initWidth ?? this.element.width
    this.initHeight = initHeight ?? this.element.height
    this.element.width = this.initWidth
    this.element.height = this.initHeight
    this.addListeners(options)
  }

  addListeners (options: ICanvasOptions): void {
    if (typeof options.onPointerDown === 'function') {
      this.element.addEventListener('pointerdown', options.onPointerDown)
    }
    if (typeof options.onPointerMove === 'function') {
      this.element.addEventListener('pointermove', options.onPointerMove)
    }
    if (typeof options.onPointerUp === 'function') {
      this.element.addEventListener('pointerup', options.onPointerUp)
    }
  }

  removeListeners (options: ICanvasOptions): void {
    if (typeof options.onPointerDown === 'function') {
      this.element.removeEventListener('pointerdown', options.onPointerDown)
    }
    if (typeof options.onPointerMove === 'function') {
      this.element.removeEventListener('pointermove', options.onPointerMove)
    }
    if (typeof options.onPointerUp === 'function') {
      this.element.removeEventListener('pointerup', options.onPointerUp)
    }
  }
}
