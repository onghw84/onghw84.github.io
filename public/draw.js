const canvas = document.getElementById("myCanvas");
var clicked = false;
const ctx = canvas.getContext("2d");

// Define a new path
ctx.beginPath();
//set line width and color
ctx.lineWidth = 4;
ctx.strokeStyle = "black";

canvas.addEventListener('mousedown', function (event) {
	clicked = true;
	ctx.beginPath();
});

canvas.addEventListener('mouseup', function (event) {
	clicked = false;
});

canvas.addEventListener('mousemove', function (event) {
   if (clicked){
		// Set a start-point
		ctx.moveTo(event.offsetX-event.movementX,event.offsetY-event.movementY);
		// Set an end-point
		ctx.lineTo(event.offsetX,event.offsetY);
		// Draw it
		ctx.stroke();
   }
});

canvas.addEventListener("touchstart", function(e){
	clicked = true;
	ctx.beginPath();
});

canvas.addEventListener("touchend", function(e){
	clicked = false;
});   

canvas.addEventListener('touchmove', function (event) {
   if (clicked){
		// Set a start-point
		ctx.moveTo(event.offsetX-event.movementX,event.offsetY-event.movementY);
		// Set an end-point
		ctx.lineTo(event.offsetX,event.offsetY);
		// Draw it
		ctx.stroke();
   }
});

function clickColor(color){
	ctx.strokeStyle = color;
	document.getElementById("colorPicker").style.backgroundColor = color;
}

function clickLine(thickness){
	ctx.lineWidth = thickness;
	document.getElementById("thickness").innerHTML = `<circle r="${thickness/2}" cx="40" cy="20" fill="blue" />`
}

document.getElementById("clearCanvas").addEventListener('click', function (event) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
})