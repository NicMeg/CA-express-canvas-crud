const initCanvas = (id) => {
  return new fabric.Canvas(id, {
      width: 1200,
      height: 800,
      selection: false
  });
}

const setBackground = (url, canvas) => {
  fabric.Image.fromURL(url, (img) => {
      canvas.backgroundImage = img
      canvas.requestRenderAll()
  })
}

const toggleMode = (mode) => {
  if (mode === modes.pan){
      if (currentMode === modes.pan) {
          // console.log(mode + "Off")
          currentMode = ''
      } else {
          // console.log(mode + "On")
          currentMode = modes.pan
          canvas.isDrawingMode = false;
          canvas.renderAll()
      }
  } else if (mode === modes.drawing){
      if (currentMode === modes.drawing) {
          // console.log(mode + "Off")
          currentMode = ''
          canvas.isDrawingMode = false;
          canvas.renderAll()
      } else {
          // console.log(mode + "On")
          canvas.freeDrawingBrush.color = 'red'
          canvas.freeDrawingBrush.width = 10

          currentMode = modes.drawing
          canvas.isDrawingMode = true
          canvas.renderAll()
      }
  }
  // console.log(mode)
}

const setPanEvents = (canvas) => {
  // mouse:over
  // This tracks the mouse movement over canvas and pans over image if toggle button clicked.
  canvas.on('mouse:move', (event) => {
      // console.log(e)
      if (mousePressed && currentMode === modes.pan) {
          canvas.setCursor('grab')
          canvas.renderAll()
          const mEvent = event.e;
          const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
          canvas.relativePan(delta)
      } 
  })

  //keep track of mouse down/up
  canvas.on('mouse:down', (event) => {
      mousePressed = true;
      if (currentMode === modes.pan) {
          canvas.setCursor('grab')
          canvas.renderAll()
      }
  })
  
  canvas.on('mouse:up', (event) => {
      mousePressed = false;
      canvas.setCursor('default')
      canvas.renderAll()
  })
}

const canvas = initCanvas('canvas');
let mousePressed = false;


let currentMode;
const modes = {
  pan: 'pan',
  drawing: 'drawing'
}

setBackground('./drawing_1.jpg', canvas);

setPanEvents(canvas)