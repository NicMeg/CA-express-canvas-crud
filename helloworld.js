var fs = require('fs'),
    fabric = require('fabric').fabric,
    out = fs.createWriteStream(__dirname + '/helloworld.png');

var canvas = new fabric.StaticCanvas(null, { width: 700, height: 700 });
var text = new fabric.Text('Hello world', {
  left: 1,
  top: 1,
  fill: '#f55',
  angle: 15
});
canvas.add(text);
canvas.renderAll();

var stream = canvas.createPNGStream();
stream.on('data', function(chunk) {
  out.write(chunk);
});