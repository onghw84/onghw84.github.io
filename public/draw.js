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
	console.log(color);
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

document.getElementById("showGrid").addEventListener("click", function (){
  if (this.checked){
	//document.getElementById("colorPicker").style.backgroundColor = color;
	//background color
	ctx.beginPath();
	ctx.rect(0, 0, 100, 600);
	ctx.fillStyle = "#99FFCC";
	ctx.fill();
	ctx.beginPath();	
	ctx.rect(100, 0, 200, 600);
	ctx.fillStyle = "#FFCCFF";
	ctx.fill();
	ctx.beginPath();	
	ctx.rect(200, 0, 300, 600);
	ctx.fillStyle = "#CCFFFF";
	ctx.fill();	
	ctx.beginPath();	
	ctx.rect(300, 0, 400, 600);
	ctx.fillStyle = "#FFFFCC";
	ctx.fill();		
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = "black";
	
	//vertical line
	ctx.beginPath();
	ctx.moveTo(100,0);
	ctx.lineTo(100,600);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200,0);
	ctx.lineTo(200,600);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(300,0);
	ctx.lineTo(300,600);
	ctx.stroke();
	
	//horizontal line
	ctx.beginPath();
	ctx.moveTo(0,100);
	ctx.lineTo(400,100);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0,200);
	ctx.lineTo(400,200);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0,204);
	ctx.lineTo(400,204);	
	ctx.stroke();		
	ctx.beginPath();
	ctx.moveTo(0,300);
	ctx.lineTo(400,300);
	ctx.stroke();		
	ctx.beginPath();
	ctx.moveTo(0,304);
	ctx.lineTo(400,304);	
	ctx.stroke();		
  }
  else {
	ctx.beginPath();
	ctx.rect(000, 0, 400, 600);
	ctx.fillStyle = "white";
	ctx.fill();
  }
});