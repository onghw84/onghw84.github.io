const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Define a new path
ctx.beginPath();

// Set a start-point
ctx.moveTo(0,0);

// Set an end-point
ctx.lineTo(200,100);

// Draw it
ctx.stroke();

// Define a new path
ctx.beginPath();

// Set a start-point
ctx.moveTo(30,0);

// Set an end-point
ctx.lineTo(100,20);
ctx.lineWidth = 10;
ctx.strokeStyle = "red";
// Draw it
ctx.stroke();

function clickColor(color, x, y){
	console.log("clicked!");
	console.log(color);	
}

function mouseOverColor(color){
	console.log(color);
}

function mouseOutMap(){
	console.log('Mouse out!');
}