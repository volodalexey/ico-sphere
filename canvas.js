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

  static addCanvasListeners(canvas_element, pointer) {
    canvas_element.addEventListener('mousedown', pointer.binded_onMouseDown, false);
    canvas_element.addEventListener('touchstart', pointer.binded_onTouchStart, false);
    canvas_element.addEventListener('mousemove', pointer.binded_onMouseMove, false);
    canvas_element.addEventListener('touchmove', pointer.binded_onTouchMove, false);
    canvas_element.addEventListener('mouseup', pointer.binded_onMouseUp, false);
    canvas_element.addEventListener('touchend', pointer.binded_onTouchEnd, false);
  }

  static drawFPS(fps, canvas_context) {
    canvas_context.font = "30px Arial";
    canvas_context.fillText('fps: ' + fps.toFixed(1), 10, 50);
  }

  static clearCanvas(canvas_element, canvas_context) {
    canvas_context.clearRect(0, 0, canvas_element.width, canvas_element.height);
  }

  static drawSpring(canvas_context, a_x, a_y, a_captured, b_x, b_y, b_captured) {
    canvas_context.beginPath();
    // canvas_context.lineWidth = 1;
    var grad;
    if (a_captured && b_captured) {
      canvas_context.strokeStyle = 'rgb(0,0,255)';
    } else if (a_captured) {
      grad = canvas_context.createLinearGradient(a_x, a_y, b_x, b_y);
      grad.addColorStop(0, 'rgb(0,0,255)');
      grad.addColorStop(1, 'rgb(255,0,0)');
      canvas_context.strokeStyle = grad;
    } else if (b_captured) {
      grad = canvas_context.createLinearGradient(b_x, b_y, a_x, a_y);
      grad.addColorStop(0, 'rgb(0,0,255)');
      grad.addColorStop(1, 'rgb(255,0,0)');
      canvas_context.strokeStyle = grad;
    } else {
      canvas_context.strokeStyle = 'rgb(255,0,0)'
    }
    canvas_context.moveTo(a_x, a_y);
    canvas_context.lineTo(b_x, b_y);
    canvas_context.stroke();
  }
}