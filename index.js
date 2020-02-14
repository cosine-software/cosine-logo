
function initLogo(canvasId, bufferId) {
  var viewportContext = document.getElementById(canvasId || 'canvas').getContext('2d')
  var bufferCanvas = document.getElementById(bufferId || 'buffer')
  var bufferContext = bufferCanvas.getContext('2d')

  var drawFuncs = []
  drawFuncs.push(createSine('rgba(0, 0, 200, 0.4)', 33))
  drawFuncs.push(createSine('rgba(200, 0, 0, 0.4)', 66))
  drawFuncs.push(createSine('rgba(0, 200, 0, 0.4)', 100))

  drawFuncs.push(createSine('rgba(200, 200, 0, 0.4)', -10))
  drawFuncs.push(createSine('rgba(0, 200, 200, 0.4)', -40))
  drawFuncs.push(createSine('rgba(200, 0, 200, 0.4)', -70))

  function createSine(colour, offset) {
    return function (ctx) {
      var magnitude = Math.min(ctx.time / 3000, 1)

      ctx.buffer.fillStyle = colour;
      ctx.buffer.moveTo(0, 100)
      ctx.buffer.beginPath()
      for (var x = 0; x < 600; x++) {
        var y = 100 * magnitude * amp(x) * Math.cos(ctx.time / (50 * offset) + x / (5 * offset)) + 100
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
    bufferContext.globalCompositeOperation = 'source-over'
    bufferContext.fillStyle = 'rgb(255, 255, 255)'
    bufferContext.fillRect(0, 0, 600, 200)
    bufferContext.globalCompositeOperation = 'darker'

    var now = new Date().getTime()
    drawFuncs.forEach(x => x({
      buffer: bufferContext,
      time: now - startTime
    }))

    bufferContext.font = '80px Roboto'
    bufferContext.fillStyle = 'rgb(255, 255, 255)'

    bufferContext.fillText('cosine', 180, 122);

    // swap the buffer for the viewport
    viewportContext.drawImage(bufferCanvas, 0, 0)
    window.requestAnimationFrame(drawFrame)
  }
}