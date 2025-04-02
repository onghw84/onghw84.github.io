var correct = 0;
var error = 0; 
var count = 0;
const reward_dir = './public/reward/';
const image_dir = './public/image/bigger/';
const happyImg = ["happybee1.jpg","happybee2.jpg","happybee3.jpg","happybee4.jpg","happybee5.jpg","happybee6.jpg","happycat1.jpg","happycat2.jpg","happycat3.jpg","happycat4.jpg","happycat5.jpg","happycat6.jpg"];
const MCQ = ['A','B','C','D'];
var answer = '';

document.getElementById("newGame").addEventListener("click", ()=>{genGame()});
document.getElementById("correct").innerHTML = correct;
document.getElementById("error").innerHTML = error;
document.getElementById("A").addEventListener("click", answerHandler);
document.getElementById("B").addEventListener("click", answerHandler);
document.getElementById("C").addEventListener("click", answerHandler);
document.getElementById("D").addEventListener("click", answerHandler);

let reward = new Reward();
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;
genGame();

//setInterval(drawClock, 1000);

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

function drawTime(ctx, radius, hour, minute, second){
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07, 'blue');
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


function answerHandler(){    
  const value = this.myParam;
  if (answer == value){
	document.getElementById("happy").style.display = "block";	
	correct += 1;
	document.getElementById("correct").innerHTML = correct;	
	reward.showReward(correct - error, 5);
  }
  else {
	error += 1;
	document.getElementById("error").innerHTML = error;	
	reward.showReward(correct - error, 5);
  }
  return;
}

async function genGame(){	
	//generate new game	
	drawFace(ctx, radius);
	drawNumbers(ctx, radius);
    var hour = Math.ceil(Math.random()*11);
    var minute = Math.floor(Math.random()*12)*5;
    var second = 1; //Math.floor(Math.random()*60);
	answer = `${hour}:${addZero(minute)}`;
	console.log(answer);
	drawTime(ctx, radius, hour, minute, second);
	document.getElementById("happy").style.display = "none";
	document.getElementById("happy").src = reward_dir + happyImg[Math.floor(Math.random()*happyImg.length)];

	//generate answer 
	answerArray = Array(4);
	answerArray[Math.floor(Math.random()*4)] = answer;	
	for (var i = 0; i < 4; i++){
		if (answerArray[i] != answer){
			var hh = hour; var mm = minute;
			while (answerArray.indexOf(`${hh}:${addZero(mm)}`) != -1){
				hh = hour + Math.floor(Math.random()*2);
				mm = Math.floor(Math.random()*12)*5;
			}			
			answerArray[i] = `${hh}:${addZero(mm)}`;			
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