var correct = 0;
var error = 0; 
var count = 0;
const reward_dir = './public/reward/';
const image_dir = './public/image/bigger/';
const happyImg = ["happybee1.jpg","happybee2.jpg","happybee3.jpg","happybee4.jpg","happybee5.jpg","happybee6.jpg","happycat1.jpg","happycat2.jpg","happycat3.jpg","happycat4.jpg","happycat5.jpg","happycat6.jpg"];
const MCQ = ['A','B','C','D'];
var showNum = 1;
var showLine = 1;
var answer = '';
var hh = 12;
var mm = 0;

document.getElementById("correct").innerHTML = correct;
document.getElementById("error").innerHTML = error;
document.getElementById("A").addEventListener("click", answerHandler);
document.getElementById("B").addEventListener("click", answerHandler);
document.getElementById("C").addEventListener("click", answerHandler);
document.getElementById("D").addEventListener("click", answerHandler);

document.getElementById("hplus").addEventListener("click", clkHandler);
document.getElementById("hminus").addEventListener("click", clkHandler);
document.getElementById("mplus").addEventListener("click", clkHandler);
document.getElementById("mminus").addEventListener("click", clkHandler);

document.getElementById("play").style.display = "none";

let reward = new Reward();
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.8;
reset_clk(hh,mm);

const learnSelect = document.querySelectorAll('input[name="learn_play"]');
for (let i = 0; i < learnSelect.length; i++) {
  learnSelect[i].addEventListener("change", function() {
    if (this.value == 1){
      document.getElementById("learn").style.display = "flex";
	  document.getElementById("play").style.display = "none";
	  reset_clk(hh,mm);
    }
	else {
      document.getElementById("learn").style.display = "none";
	  document.getElementById("play").style.display = "block";
	  genGame();
	}
  })
}

//setInterval(drawClock, 1000);
document.getElementById("showNum").addEventListener("click", function (){
  if (this.checked){
	showNum = 1; showLine = 1;
	radius = canvas.height / 2 * 0.8;	
  }
  else {
	showNum = 0; showLine = 0;
	radius = canvas.height / 2 * 0.9;
  }
  
  if (document.getElementById("learn").style.display == "flex"){
	  reset_clk(hh,mm);
  }
  else {
	  reset_clk(parseInt(answer.substring(0,2)), parseInt(answer.substring(3)))
  }
});

function reset_clk(h,m){
	ctx.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2);
	drawFace(ctx, radius);
	drawNumbers(ctx, radius);
	if (showNum == 1){drawNumbers1(ctx, radius);}
	if (showLine == 1){drawLines(ctx, radius);}
	
	drawTime(ctx, radius, h, m, 1);
}

function drawFace(ctx, radius) {
  const grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'pink';
  ctx.fill();
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawLines(ctx, radius) {
  for(let num = 1; num < 13; num++){
	pos = num*Math.PI/6
    ctx.beginPath();
    ctx.lineWidth = radius*0.01;
	ctx.strokeStyle = "white";
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -radius);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}

function drawNumbers(ctx, radius) {
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(let num = 1; num < 13; num++){
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawNumbers1(ctx, radius) {
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  ctx.fillStyle ="purple";
  for(let num = 1; num < 13; num++){
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*1.15);
    ctx.rotate(-ang);
	if (num == 12){
		ctx.fillText("0", 0, 0);
	}
	else {ctx.fillText((num*5).toString(), 0, 0);}
    ctx.rotate(ang);
    ctx.translate(0, radius*1.15);
    ctx.rotate(-ang);
  }
}


function drawTime(ctx, radius, hour, minute, second){
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07, 'purple');
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.75, radius*0.07, 'blue');
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02, 'red');
}

function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
	ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function clkHandler(){
  id = event.target.id;
  if (id == "mplus"){
	  mm += 5;
	  if (mm >= 60){
		  mm = 0; hh += 1;
	  }
  }
  else if (id == "mminus"){
	  mm -= 5;
	  if (mm < 0){
		  mm = 55; hh -= 1;
	  }	  
  }
  else if (id == "hplus"){
	  hh += 1;
  }
  else {
	  hh -= 1;
  }
  if (hh > 12){
	  hh = 1;
  }
  if (hh <= 0){
	  hh = 12
  }
  document.getElementById("hh").innerHTML = addZero(hh);
  document.getElementById("mm").innerHTML = addZero(mm);
  
  reset_clk(hh,mm);
  return;
}

function answerHandler(){    
  const value = this.myParam;
  if (this.value == "Next"){
	genGame();
  }
  else {  
	  if (answer == value){
		document.getElementById("happy").style.display = "block";
		document.getElementById("happy").style.visibility = "visible";
		document.getElementById("sad").style.visibility = "hidden";
		document.getElementById("sad").style.display = "none";  	
		correct += 1;
		document.getElementById("A").value = "Next";
		document.getElementById("B").value = "Next";
		document.getElementById("C").value = "Next";
		document.getElementById("D").value = "Next";	
		document.getElementById("correct").innerHTML = correct;	
		reward.showReward(correct - error, 5);
	  }
	  else {
		this.style.backgroundColor = "orange";
		this.disabled = "true";
		document.getElementById("sad").style.display = "block";
		document.getElementById("sad").style.visibility = "visible";
		document.getElementById("happy").style.visibility = "hidden";
		document.getElementById("happy").style.display = "none";  
		error += 1;
		document.getElementById("error").innerHTML = error;	
		reward.showReward(correct - error, 5);
	  }
  }
  return;
}

async function genGame(){	
	//reset
	document.getElementById("A").style.backgroundColor = "greenyellow";
	document.getElementById("B").style.backgroundColor = "greenyellow";
	document.getElementById("C").style.backgroundColor = "greenyellow";
	document.getElementById("D").style.backgroundColor = "greenyellow";
	document.getElementById("A").disabled = false;
	document.getElementById("B").disabled = false;
	document.getElementById("C").disabled = false;
	document.getElementById("D").disabled = false;	
	document.getElementById("happy").src = reward_dir + happyImg[Math.floor(Math.random()*happyImg.length)];
	document.getElementById("happy").style.display = "none";
	document.getElementById("happy").style.visibility = "hidden";
	document.getElementById("sad").style.visibility = "hidden";
	document.getElementById("sad").style.display = "none";  

	//generate new game	
    var hour = Math.ceil(Math.random()*11);
    var minute = Math.floor(Math.random()*12)*5;
    var second = 1; //Math.floor(Math.random()*60);
	answer = `${addZero(hour)}:${addZero(minute)}`;
	//drawFace(ctx, radius);
	//drawNumbers(ctx, radius);
	//if (showNum == 1){drawNumbers1(ctx, radius);}
	//if (showLine == 1){drawLines(ctx, radius);}	
	//drawTime(ctx, radius, hour, minute, second);
	reset_clk(hour,minute);	
	
	//generate answer 
	answerArray = Array(4);
	answerArray[Math.floor(Math.random()*4)] = answer;	
	for (var i = 0; i < 4; i++){
		if (answerArray[i] != answer){
			var hh = hour; var mm = minute;
			while (answerArray.indexOf(`${addZero(hh)}:${addZero(mm)}`) != -1){
				hh = hour + Math.floor(Math.random()*2);
				mm = Math.floor(Math.random()*12)*5;
			}			
			answerArray[i] = `${addZero(hh)}:${addZero(mm)}`;			
		}
	}
	for (var i = 0; i < 4; i++){
		let ans = document.getElementById(MCQ[i]);
		ans.myParam = answerArray[i];
		ans.value = answerArray[i];
	}
}

function addZero(num){
	if (num >= 10){
		return num
	}
	else if (num == 0) {
		return '00'
	}
	else {
		return '0'+num
	}
}

document.getElementById("song").addEventListener("click", function (){
  correct = 0; error = 0;
  document.getElementById("correct").innerHTML = correct;
  document.getElementById("error").innerHTML = error;
  reward.showReward(correct - error, 5);
});