var total = 0;
var level = 10; 
var focus = '';

var start = [99, 118];
var stop = [101, 102, 103, 104, 105, 106, 107, 149, 150, 151, 152, 153, 154, 155, 119];
var iconDir = './public/image/memory/';
var startSrc = iconDir + start[Math.floor(Math.random()*start.length)]+ '.png';
var endSrc = './public/reward/happybee.gif';
var dest = -1;
const r = document.querySelector(':root');
const dirIndex = ["right","left","up","down"];

//document.getElementById("up").addEventListener("click", moveHandler);
//document.getElementById("down").addEventListener("click", moveHandler);
//document.getElementById("left").addEventListener("click", moveHandler);
//document.getElementById("right").addEventListener("click", moveHandler);
//todo: add eventlistener for keyboard
document.onkeydown = function (e) {
    e = e || window.event;
	if (e.keyCode >= 37 && e.keyCode <= 40){
		moveHandler(e);
	}
};

document.getElementById("kids").addEventListener("click", function(){
	level = 10; reset(); this.style.backgroundColor = "pink";
})
document.getElementById("easy").addEventListener("click", function(){
	level = 12; reset(); this.style.backgroundColor = "pink";
})
document.getElementById("medium").addEventListener("click", function(){
	level = 14; reset(); this.style.backgroundColor = "pink";
})
document.getElementById("hard").addEventListener("click", function(){
	level = 16; reset(); this.style.backgroundColor = "pink";
})

document.getElementById("total").innerHTML = total;
let reward = new Reward();
genGame();

function moveHandler(event){
	var moveTmp = -1;
	if (event instanceof KeyboardEvent){
		var dir;
		switch (event.keyCode){
		case 37:	//left
			dir = 1; break;
		case 38:	//up
			dir = 2; break;
		case 39:	//right
			dir = 0; break;
		case 40:	//down
			dir = 3; break;
		default:
			dir = -1; break;
		}
		moveTmp = move(focus,dir);
	}
	else {
		var id = event.currentTarget.id;	
		if (dirIndex.includes(id)){
			moveTmp = move(focus,dirIndex.indexOf(id));
		}
		else {
			moveTmp = move(focus,findDirection(parseInt(id)));
		}		
	}

	if (moveTmp != focus && moveTmp != -1){
		document.getElementById(focus).innerHTML = '';
		document.getElementById(moveTmp).innerHTML = `<img id="start" src=${startSrc}></img>`;
		focus = moveTmp;
		answerHandler();
	}
}

function findDirection(gridIndex){
	if (gridIndex == focus){
		return -1;
	}
	if (Math.floor(gridIndex/level) == Math.floor(focus/level)){	//same row
		if (gridIndex < focus){
			return 1;	//gridIndex on left of focus
		}
		else {return 0;} //gridIndex on right of focus		
	}
	else if (gridIndex%level == focus%level){	//same column
		if (gridIndex < focus){
			return 2;	//gridIndex on top of focus
		}
		else {return 3;} //gridIndex on bottom of focus
	} else {
		return -1;
	}	
}

async function answerHandler(){    
  if (focus == dest){
	document.getElementById("container1").style.backgroundImage = "linear-gradient(180deg,orchid,white)";
	total += 1; 
	var text = ""
	for (var i = 0; i < total; i++){
		text += `<img src="${iconDir + stop[i]+ '.png'}" style="visibility: visible; width: 70px; height: 70px"></img>`
	}
	document.getElementById("container1").innerHTML = `
		<img src=${endSrc} style="visibility: visible; width: 250px; height: auto"></img>
		<div class="but" style="flex-wrap: wrap; width: 380px">${text}</div>`;
	document.getElementById("total").innerHTML = total;
	reward.showReward(total, 1);
	await new Promise(resolve => setTimeout(resolve, 2000));
	genGame();
  }
}

function genGame(){	
	var stopSrc = iconDir + stop[total]+ '.png';
	document.getElementById("container1").style.backgroundImage = "";
	document.getElementById("container1").style.backgroundColor = "white";
	const size = Math.floor((380-10)/level)-2;
	r.style.setProperty('--size', size+'px');
	
	var text = ""; var neighborArray = Array(level**2);
	for (var i = 0; i < level**2; i++) {
		text += `<div class = "grid top bottom left right" id="${i}"></div>`;
		neighborArray[i] = [];
		if (i%level != level-1){
			neighborArray[i].push(i+1);
		}else{neighborArray[i].push(-1);}
		if (i%level != 0){
			neighborArray[i].push(i-1);
		}else{neighborArray[i].push(-1);}		
		if (i >= level){
			neighborArray[i].push(i-level);
		}else{neighborArray[i].push(-1);}	
		if (i < level*(level-1)){
			neighborArray[i].push(i+level);
		}else{neighborArray[i].push(-1);}
	}
	document.getElementById("container1").innerHTML = text;
	for (var i = 0; i < level**2; i++) {
		document.getElementById(i).addEventListener("click", moveHandler);
	}
	
	
	var borderClass = ["right","left","top","bottom"];
	var borderClass1 = ["left","right","bottom","top"];
	
	//generate maze
	var visited = [Math.floor(Math.random()*level**2)];
	var active = [...visited]; var step;
	//while (visited.length != level**2){	
	while (active.length > 0){
		
		step = active.length-1;
		//if (Math.random() < 0.75){step = active.length-1;}
		//else {step = Math.floor(Math.random()*active.length);}
		var neighbor = neighborArray[active[step]]; var moveArray = [];
		for (var j = 0; j < 4; j++){
			if (neighbor[j] != -1 && visited.indexOf(neighbor[j])==-1){
				moveArray.push(j);				
			}
		}

		if (moveArray.length > 0){
			var moveType = Math.floor(Math.random()*moveArray.length);
			var moveTmp = neighbor[moveArray[moveType]];
			document.getElementById(active[step]).classList.remove(borderClass[moveArray[moveType]]);
			active.push(moveTmp);
			visited.push(moveTmp);
			document.getElementById(moveTmp).classList.remove(borderClass1[moveArray[moveType]]);
		}
		else {
			active.splice(step,1);
		}
	}
	
	var startIndex = Math.floor(Math.random()*level**2/4);
	document.getElementById(startIndex).innerHTML = `<img id="start" src=${startSrc}></img>`;
	focus = startIndex;
	//var index = Math.floor(Math.random()*level**2/2)+level**2/2;
	var stopIndex = startIndex+level**2/2+Math.floor(Math.random()*level);
	document.getElementById(stopIndex).innerHTML = `<img id="stop" src=${stopSrc}></img>`;
	dest = stopIndex;
}

function move(index, direction){
	if (direction == 0){	//move right
		if (index%level == level-1 || document.getElementById(index).classList.value.includes('right')){
			return index;
		}
		else {
			return index + 1;
		}
	}
	else if (direction == 1){	//move left
		if (index%level == 0 || document.getElementById(index).classList.value.includes('left')){
			return index;
		}
		else {
			return index - 1;
		}
	}
	else if (direction == 2){	//move up
		if (index <= level-1 || document.getElementById(index).classList.value.includes('top')){
			return index;
		}
		else {
			return index - level;
		}		
	}
	else if (direction == 3){	//move down
		if (index >= level*(level-1) || document.getElementById(index).classList.value.includes('bottom')){
			return index;
		}
		else {
			return index + level;
		}		
	}
	else {
		return index;
	}
}

function reset(){
	genGame();
	document.getElementById("kids").style.backgroundColor = "white";
	document.getElementById("easy").style.backgroundColor = "white";
	document.getElementById("medium").style.backgroundColor = "white";
	document.getElementById("hard").style.backgroundColor = "white";
}

document.getElementById("song").addEventListener("click", function (){
  total = 0;
  document.getElementById("total").innerHTML = total;
  reward.showReward(total, 1);
});