const canvas = document.getElementById("myCanvas");
var clicked = false;
const ctx = canvas.getContext("2d");

// Define a new path
ctx.beginPath();
//set line width and color
ctx.lineWidth = 4;
ctx.strokeStyle = "black";



canvas.addEventListener('pointerdown', function (event) {
	clicked = true;
	//console.log(event.offsetX, event.offsetY);
	ctx.beginPath();
});

canvas.addEventListener('pointerup', function (event) {
	clicked = false;
});

canvas.addEventListener('pointermove', function (event) {
   if (clicked){
	   //console.log(event.offsetX, event.offsetY, event.movementX, event.movementY);
		// Set a start-point
		ctx.moveTo(event.offsetX-event.movementX,event.offsetY-event.movementY);
		// Set an end-point
		ctx.lineTo(event.offsetX,event.offsetY);
		// Draw it
		ctx.stroke();
   }
});

/*canvas.addEventListener("touchstart", function(e){
	clicked = true;
	document.getElementById("save").style.backgroundColor = "yellowgreen";
	ctx.beginPath();
});

canvas.addEventListener("touchend", function(e){
	document.getElementById("save").style.backgroundColor = "pink";
	clicked = false;
});   

canvas.addEventListener('touchmove', function (event) {
   document.getElementById("save").style.backgroundColor = "yellow";
   if (clicked){
		// Set a start-point
		ctx.moveTo(event.offsetX-event.movementX,event.offsetY-event.movementY);
		// Set an end-point
		ctx.lineTo(event.offsetX,event.offsetY);
		// Draw it
		ctx.stroke();
   }
});*/

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


document.getElementById('save').addEventListener('click', function(e) {

	canvas.toBlob((blob) => {
	  const newImg = document.createElement("img");
	  const url = URL.createObjectURL(blob);
	  const createEl = document.createElement('a');
	  createEl.href = url;
	  createEl.download = "drawing";
	  createEl.click();
	  createEl.remove();
	});
});