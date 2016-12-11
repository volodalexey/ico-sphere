class Canvas {
  constructor(width, height) {
    this.canvas_width = width;
    this.canvas_height = height;
    this.requests_count = 0;
    this.messages_count = 0;
    this.rps_last = 0;
    this.fps_last = 0;
  }

  static initializeCanvas(selector, width, height, context) {
    let
      canvas_element = document.querySelector(selector),
      canvas_context = canvas_element.getContext(context);

    canvas_element.width = width;
    canvas_element.height = height;

    return [canvas_context, canvas_element]
  }

  initializeRPS(rps_selector) {
    this.rps_element = document.querySelector(rps_selector);
  }
}