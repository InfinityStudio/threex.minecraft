
module.exports = function buildNickCartouche(text) {
	// create the canvas
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	canvas.width = 256;
	canvas.height = 128;
	// center the origin
	context.translate(canvas.width / 2, canvas.height / 2);
	// measure text
	var fontSize = 36;
	context.font = "bolder " + fontSize + "px Verdana";
	var fontH = fontSize;
	var fontW = context.measureText(text).width;
	// build the background
	context.fillStyle = "rgba(0,0,255,0.3)";
	var scale = 1.2;
	context.fillRect(-fontW * scale / 2, -fontH * scale / 1.3, fontW * scale, fontH * scale)
	// display the text
	context.fillStyle = "rgba(0,0,0,0.7)";
	context.fillText(text, -fontW / 2, 0);
	// return the canvas element
	return canvas;
};

