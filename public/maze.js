var total = 0;
var level = 10; 

var start = [99, 118];
var stop = [101, 102, 103, 104, 105, 106, 107, 149, 150, 151, 152, 153, 154, 155, 119];
var iconDir = './public/image/memory/';
var startSrc = iconDir + start[Math.floor(Math.random()*start.length)]+ '.png';
const endSrc = './public/reward/happybee.gif';
var dest = -1;
var beeloc = -1;
const r = document.querySelector(':root');
const dirIndex = ["right","left","up","down"];
var moveOK = [];
var svgsize = 370;
var sidePad = 0;
var size = Math.floor((380-10)/level)-2;		//2:border
r.style.setProperty('--size', size+'px');
var interval = (svgsize - sidePad*2)/level;
var bee1 = sidePad + interval/2 - size/2;
var pos = []; var dir = 0; var move = 0;
for (var i = 0; i < level; i++){
	pos[i] = bee1 + interval*i;
}


document.onkeydown = function (e) {
    e = e || window.event;
	if (e.keyCode >= 37 && e.keyCode <= 40){
		keyboardHandler(e);
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


function keyboardHandler(event){
	loc = getXY(beeloc);
	loc[0] = loc[0] + size/2; loc[1] = loc[1]+size/2;
	switch (event.keyCode){
	case 37:	//left		
		loc[0] = loc[0] - size; break;
	case 38:	//up
		loc[1] = loc[1] - size; break;
	case 39:	//right
		loc[0] = loc[0] + size; break;
	case 40:	//down
		loc[1] = loc[1] + size; break;
	default:
		break;
	}
	gotoGrid = checkGrid(loc[0], loc[1]); 
	if (!checkBlock(beeloc,gotoGrid)){
		beeloc = gotoGrid;			
	}
	move = 1; checkHandler();
}

function selectHandler(event){
	if (event.target.id == "start"){
		move = 1; accumX = 0; accumY = 0;
	}
	else {move = 0;}
}

function moveHandler(event){	
	if (move == 1){		
		loc = getXY(beeloc);
		focusItem = document.getElementById("start");		
		
		//can only move in x direction or y direction
		if (dir == 0){
			accumX += event.movementX; accumY += event.movementY;
			if (Math.abs(accumX)> 20 || Math.abs(accumY)> 20){
				if (Math.abs(accumX) > Math.abs(accumY)){
					dir = 1;	//x direction
				}
				else {dir = 2; }	//y direction
			}
		}
				
		if (dir == 1){
			if (Math.sign(event.movementX) == 1){
				offX = size;
			}
			else {
				offX = 0;
			}
			//check movement if got other wall blocking	
			gotoGrid = checkGrid(event.offsetX + offX, loc[1]);
			if (!checkBlock(beeloc,gotoGrid)){
				if (event.offsetX < svgsize - sidePad - size){
					focusItem.setAttribute('x',event.offsetX);
					beeloc = checkGrid(event.offsetX, loc[1]);
				}
				else {
					focusItem.setAttribute('x',svgsize - sidePad - size);
					beeloc = checkGrid(svgsize - sidePad - size, loc[1]);
				}
				
			}
		}
		else if (dir == 2){
			if (Math.sign(event.movementY) == 1){
				offY = size;
			}
			else {
				offY = 0;
			}			
			gotoGrid = checkGrid(loc[0], event.offsetY + offY);
			if (!checkBlock(beeloc,gotoGrid)){
				if (event.offsetY < svgsize - sidePad - size){
					focusItem.setAttribute('y',event.offsetY);
					beeloc = checkGrid(loc[0], event.offsetY);
				}
				else {
					focusItem.setAttribute('y',svgsize - sidePad - size);
					beeloc = checkGrid(loc[0],svgsize - sidePad - size);
				}			
			}			
		}
	}
}

function checkHandler(event){
	if (move == 1){
		move = 0; dir = 0;
		setXY("start",beeloc);
		answerHandler();
	}
}

function checkBlock(startGrid, gotoGrid){
	if (startGrid == gotoGrid){
		return false;
	}
	else {
		allowMove = moveOK[startGrid];	
		if ((gotoGrid-startGrid) > 0 && (gotoGrid-startGrid) < level && allowMove[0]){
			return false;
		}		
		else if ((startGrid-gotoGrid) > 0 && (startGrid-gotoGrid) < level && allowMove[1]){
			return false;
		}
		else if ((gotoGrid-startGrid)%level == 0 && (gotoGrid < startGrid) && allowMove[2]){
			return false;
		}
		else if ((gotoGrid-startGrid)%level == 0 && (gotoGrid > startGrid) && allowMove[3]){
			return false;
		}
		else {
			return true;
		}
	}
	
}

function checkGrid(x, y){
	if (x >= (svgsize - sidePad)){
		x = svgsize - sidePad - 1;
	}
	else if (x < sidePad){x = sidePad;}
	if (y >= (svgsize - sidePad)){
		y = svgsize - sidePad - 1;
	}	
	else if (y < sidePad){y = sidePad;}
	return Math.floor((y-sidePad)/interval)*(level) + Math.floor((x-sidePad)/interval);
}

function getXY(grid){
	return [pos[grid%level],pos[Math.floor(grid/level)]];
}

function setXY(el, grid){	
	[x,y] = getXY(grid);
	document.getElementById(el).setAttribute('x', x); 
	document.getElementById(el).setAttribute('y', y);
	return 
}

async function answerHandler(){    
  if (beeloc == dest){
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
	await new Promise(resolve => setTimeout(resolve, 3000));
	genGame();
  }
}

function genGame(){	
	var stopSrc = iconDir + stop[total]+ '.png';
	document.getElementById("container1").style.backgroundImage = "";
	document.getElementById("container1").style.backgroundColor = "white";
	
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
	//moveOK = neighborArray.map((list)=>{return list.map((el)=>{return el != -1})});
	moveOK = neighborArray.map((list)=>{return list.map((el)=>{return false})});
	text += `<svg  width=370 height=370 id="mySvg"></svg>`
	document.getElementById("container1").innerHTML = text;
	for (var i = 0; i < level**2; i++) {
		document.getElementById(i).addEventListener("click", moveHandler);
	}	
	
	mySvg.addEventListener("pointerdown",selectHandler);
	mySvg.addEventListener("pointermove",moveHandler);
	mySvg.addEventListener("pointerup",checkHandler);
	mySvg.addEventListener("pointerleave",checkHandler);

	var borderClass = ["right","left","top","bottom"]; var borderClassOK = [0,1,2,3];
	var borderClass1 = ["left","right","bottom","top"]; var borderClass1OK = [1,0,3,2];
	
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
			moveOK[active[step]][borderClassOK[moveArray[moveType]]] = true;
			moveOK[moveTmp][borderClass1OK[moveArray[moveType]]] = true;
		}
		else {
			active.splice(step,1);
		}
	}
	
	var startIndex = Math.floor(Math.random()*level**2/4);				
	var stopIndex = startIndex+level**2/2+Math.floor(Math.random()*level);
	
	document.getElementById("mySvg").innerHTML += `<image id="stop" href="${stopSrc}"/>`;
	document.getElementById("mySvg").innerHTML += `<image id="start" href="${startSrc}"/>`;
	setXY("stop",stopIndex); setXY("start",startIndex);
	dest = stopIndex; beeloc = startIndex;
}

function reset(){
	size = Math.floor((380-10)/level)-2;		//2:border
	r.style.setProperty('--size', size+'px');
	interval = (svgsize - sidePad*2)/level;
	bee1 = sidePad + interval/2 - size/2;
	for (var i = 0; i < level; i++){
		pos[i] = bee1 + interval*i;
	}
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