const canvas = document.getElementById("myCanvas");
var clicked = false; var move = false;
const ctx = canvas.getContext("2d");
const ge_image = new Image();
ge_image.src = './public/image/ge.png';
const bai_image = new Image();
bai_image.src = './public/image/bai.png';
const qian_image = new Image();
qian_image.src = './public/image/qian.png';
const shi_image = new Image();
shi_image.src = './public/image/shi.png';

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
	ctx.rect(0, 0, 80, 600);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
	ctx.beginPath();	
	ctx.rect(80, 0, 160, 600);
	ctx.fillStyle = "#FFCCFF";
	ctx.fill();
	ctx.beginPath();	
	ctx.rect(160, 0, 240, 600);
	ctx.fillStyle = "#CCFFFF";
	ctx.fill();	
	ctx.beginPath();	
	ctx.rect(240, 0, 320, 600);
	ctx.fillStyle = "#FFFFCC";
	ctx.fill();
	ctx.beginPath();	
	ctx.rect(320, 0, 400, 600);
	ctx.fillStyle = "#99FFCC";
	ctx.fill();			
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = "black";
	
	//vertical line
	for (var i = 80; i <= 400; i += 80){
		ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,600); ctx.stroke();
	}
	
	//horizontal line
	for (var i = 80; i <= 600; i += 80){
		ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(400,i); ctx.stroke();
	}
	
	//indicator
	ctx.drawImage(ge_image, 330, 10, 60, 60);
	ctx.drawImage(shi_image, 250, 10, 60, 60);
	ctx.drawImage(bai_image, 170, 10, 60, 60);
	ctx.drawImage(qian_image, 90, 10, 60, 60);
	
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#CC00FF";
	document.getElementById("colorPicker").style.backgroundColor = "#CC00FF";
  }
  else {
	ctx.beginPath();
	ctx.rect(000, 0, 400, 600);
	ctx.fillStyle = "white";
	ctx.fill();
  }
});