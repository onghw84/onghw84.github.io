const canvas = document.getElementById("myCanvas");
var clicked = false; var move = false;
const ctx = canvas.getContext("2d");

//set line width and color
ctx.lineWidth = 4;
ctx.strokeStyle = "black";

document.getElementById("colorPicker").addEventListener('click',function (event){
	if (document.getElementById("content").style.display == "flex"){
		document.getElementById("content").style.display = "none";
	}
	else {
		document.getElementById("content").style.display = "flex";
	}
});

document.getElementById("thickness").addEventListener('click',function (event){
	if (document.getElementById("content1").style.display == "flex"){
		document.getElementById("content1").style.display = "none";
	}
	else {
		document.getElementById("content1").style.display = "flex";
	}
});

canvas.addEventListener('pointerdown', function (event) {
	clicked = true; move = false;
	//console.log(event.offsetX, event.offsetY);
	
	// Define a new path
	ctx.beginPath();
});

canvas.addEventListener('pointerup', function (event) {
	if (!move){
		ctx.beginPath();
		ctx.arc(event.offsetX, event.offsetY, ctx.lineWidth/8, 0, 2 * Math.PI);
		ctx.fillStyle = ctx.strokeStyle;
		ctx.fill();	
		ctx.stroke();
	}
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
		move = true;
   }
});

function clickColor(color){
	ctx.strokeStyle = color;
	document.getElementById("colorPicker").style.backgroundColor = color;
	document.getElementById("content").style.display = "none";
}

function clickLine(thickness){
	ctx.lineWidth = thickness;
	document.getElementById("thickness").innerHTML = `<circle r="${thickness/2}" cx="40" cy="20" fill="blue" />`
	document.getElementById("content1").style.display = "none";
}

document.getElementById("clearCanvas").addEventListener('click', function (event) {
	if (window.confirm("Warning! Clear the canvas?")) {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	} 
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