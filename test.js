var Render = require('./');
var Generator = require('audio-generator');
var Sink = require('stream-sink');
var Canvas = require('drawille-canvas');
var spawn  = require('child_process').spawn;

var canvas = new Canvas();

var rec = spawn('sox', ['-d','-t', 'wav', '-']).on('error', function( err ){ throw err });

rec.stdout.pipe(Render({
	channel: 0,
	canvas: canvas,
	render: function (canvas, data) {
	/*
			var data = this.getTimeData();

		var ctx = canvas.getContext('2d');

		ctx.clearRect(0,0,canvas.width, canvas.height);

		if (!data.length) return;

		//get average magnitude
		var w = 5;
		var magnitude = 0;
		for (var i = 1; i <= w; i++) {
			magnitude += data[data.length - i];
		}

		magnitude /= w;
		magnitude = magnitude / 2 + 0.5;

		ctx.fillRect(0,0, magnitude * canvas.width, 20);
		ctx.fillText('Magnitude: ' + magnitude, 0, 40);

		/*****/
		var self = this;
		self.size = 1024;
		self.offset = null;
		var offset = self.offset;

		//if offset is undefined - show last piece of data
		if (offset == null) {
			offset = data.length - self.size;
			if (offset < 0) offset = 0;
		}

		var context = canvas.getContext('2d');

		context.clearRect(0, 0, canvas.width, canvas.height);

		if (!data.length) return;

		var amp = canvas.height / 2;

		var frameData = data.slice(offset, offset + self.size);

		var step = self.size / canvas.width;
		var middle = amp;

		context.beginPath();
		context.moveTo(0, middle);

		for (var i = 0; i < canvas.width; i++) {
			var sampleNumber = Math.round(step * i);
			var sample = frameData[sampleNumber];

			//ignore undefined data
			if (sample == null) continue;

			context.lineTo(i, -sample * amp + middle);
		}

		context.stroke();

	}
}))
.on('render', function (canvas) {
		process.stdout.write(canvas._canvas.frame());
});

