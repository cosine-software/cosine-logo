function initLogo(){
  var viewportContext = document.getElementById('canvas').getContext("2d")
  var bufferCanvas = document.getElementById('buffer')
  var bufferContext = bufferCanvas.getContext('2d')

  var drawFuncs = []

  drawFuncs.push(createSine('rgba(0, 0, 200, 0.4)', 33, 80 + 100 * Math.random(), Math.random() - 0.5))
  drawFuncs.push(createSine('rgba(200, 0, 0, 0.4)', 66, 80 * 100 * Math.random(), Math.random() - 0.5))
  drawFuncs.push(createSine('rgba(0, 200, 0, 0.4)', 100, 80 * 100 * Math.random(), Math.random() - 0.5))

  drawFuncs.push(createSine('rgba(200, 200, 0, 0.4)', -10, -80 * 100 * Math.random(), Math.random() - 0.5))
  drawFuncs.push(createSine('rgba(0, 200, 200, 0.4)', -40, -80 * 100 * Math.random(), Math.random() - 0.5))
  drawFuncs.push(createSine('rgba(200, 0, 200, 0.4)', -70, -80 * 100 * Math.random(), Math.random() - 0.5))

  function createSine(colour, offset, offset2, timeoffset) {
    return function (ctx) {
      var magnitude = Math.min(ctx.time / 3000, 1)

      ctx.buffer.fillStyle = colour;
      ctx.buffer.moveTo(0, 100)
      ctx.buffer.beginPath()
      for (var x = 0; x < 600; x++) {
        var y = 100 * magnitude * amp(x) * Math.cos(ctx.time * 2 * timeoffset / (50 * offset) + x / (5 * offset)) + 100
        ctx.buffer.lineTo(x, y)
      }
      for (var x = 600; x >= 0; x--) {
        var y = 100 * magnitude * amp(x) * Math.cos(ctx.time * 2 * timeoffset / (50 * offset2) + x / (5 * offset2)) + 100
        ctx.buffer.lineTo(x, y)
      }
      ctx.buffer.fill()
    }
  }
  function amp(x) {
    return 1 - 0.5 * (Math.cos(2 * Math.PI * x / 600) + 1)
  }

  var startTime = new Date().getTime()
  window.requestAnimationFrame(drawFrame)
  function drawFrame() {
    // bufferContext.font = '20px Orbitron'
    bufferContext.globalCompositeOperation = 'source-over';
    bufferContext.fillStyle = 'rgb(245, 245, 245)'
    bufferContext.fillRect(0, 0, 600, 200)
    bufferContext.globalCompositeOperation = 'color-burn';

    var now = new Date().getTime()
    drawFuncs.forEach(x => x({
      buffer: bufferContext,
      time: now - startTime
    }))

    bufferContext.globalCompositeOperation = 'hard-light';

    bufferContext.font = "bold 80px Roboto";
    bufferContext.fillStyle = 'rgb(255, 255, 255)'

    bufferContext.fillText("cosine", 180, 120);

    // swap the buffer for the viewport
    viewportContext.drawImage(bufferCanvas, 0, 0)
    window.requestAnimationFrame(drawFrame)
  }
}