var total = 0;
var level = 0; 
var focus = '';
var answer = '';

var start = [99, 118];
var stop = [101, 102, 103, 104, 105, 106, 107, 119];
var iconDir = './public/image/memory/';

document.getElementById("newGame").addEventListener("click", ()=>{genGame()});
document.getElementById("up").addEventListener("click", moveHandler);
document.getElementById("down").addEventListener("click", moveHandler);
document.getElementById("left").addEventListener("click", moveHandler);
document.getElementById("right").addEventListener("click", moveHandler);
//todo: add eventlistener for keyboard

document.getElementById("kids").addEventListener("click", function(){
	level = 0; genGame(); this.style.backgroundColor = "pink";
})
document.getElementById("easy").addEventListener("click", function(){
	level = 1; genGame(); this.style.backgroundColor = "pink";
})
document.getElementById("medium").addEventListener("click", function(){
	level = 2; genGame(); this.style.backgroundColor = "pink";
})
document.getElementById("hard").addEventListener("click", function(){
	level = 3; genGame(); this.style.backgroundColor = "pink";
})

var text = ""
for (var i = 0; i < 100; i++) {
	text += `<div class = "grid top bottom left right" id="${i}"></div>`
}
document.getElementById("container1").innerHTML = text;

document.getElementById("total").innerHTML = total;
let reward = new Reward();
genGame();

function moveHandler(event){
	focus = event.currentTarget.myParam;
	event.currentTarget.style.backgroundColor = "yellowgreen";
	//check if border exist, move cat
	
	
}

function answerHandler(){    
  const value = this.innerHTML;
  if (focus == ""){
	return;
  }
  else {
	  document.getElementById(focus).innerHTML = value;
	  
	  const index = grid.indexOf(focus);
	  if (answer[index] == value){
		document.getElementById(focus).style.color = "blue";
		correct += 1;
		if (correct == emptyGrid.length){	//all correct
			document.getElementById("container1").style.backgroundColor = "pink";
			total += 1;
			document.getElementById("total").innerHTML = total;
			reward.showReward(total, 1);			
		}
	  }
	  return;
  }
}

function genPath(){
	
}

function genGame(){	

	var startIndex = 0;
	var stopIndex = Math.ceil(Math.random()*100);
	var startSrc = iconDir + start[Math.floor(Math.random()*start.length)]+ '.png';
	var stopSrc = iconDir + stop[Math.floor(Math.random()*stop.length)]+ '.png';
	var borderClass = ["right","left","top","bottom"];
	var borderClass1 = ["left","right","bottom","top"];
	
	document.getElementById(startIndex).innerHTML = `<img id="start" src=${startSrc}></img>`;
	document.getElementById(stopIndex).innerHTML = `<img id="stop" src=${stopSrc}></img>`;

	//generate path from start to stop
	console.log(stopIndex);
	var path = [startIndex]; var step = 0; var count = 0;
	while (path[step] != stopIndex){
		count += 1;
		var moveType = Math.floor(Math.random()*4);
		var moveTmp = move(path[step],moveType);
		if (path.indexOf(moveTmp) == -1){			
			document.getElementById(path[step]).classList.remove(borderClass[moveType]);
			path.push(moveTmp);
			step += 1;
			document.getElementById(path[step]).classList.remove(borderClass1[moveType]);
		}
		console.log(path);
		if (count > 100){
			path = [path[Math.floor(Math.random()*path.length)]];
			count = 0; step = 0;
		}
	}
	
	//this.classList.remove("close");
	emptyGrid = []; var emptyIndex = 0;
	for (var i = 0; i < (level*2+1)*5; i++){
		emptyIndex = (emptyIndex + Math.ceil(Math.random()*10))%grid.length;
		emptyGrid.push(grid[emptyIndex]);
	}
	emptyGrid = removeDuplicates(emptyGrid);

	//fill in grid
	for (var i = 0; i < grid.length; i++) {
		if (emptyGrid.includes(grid[i])){
			document.getElementById(grid[i]).style.fontWeight = "normal";
			document.getElementById(grid[i]).style.fontStyle = "italic";
			document.getElementById(grid[i]).addEventListener("click", moveHandler, false);
			document.getElementById(grid[i]).myParam = grid[i];
			document.getElementById(grid[i]).innerHTML = "";
		}
		else {
			document.getElementById(grid[i]).removeEventListener("click", moveHandler);
			document.getElementById(grid[i]).style.fontWeight = "bold";
			document.getElementById(grid[i]).style.fontStyle = "normal";
			document.getElementById(grid[i]).innerHTML = answer[i];
		}
	}
}

function move(index, direction){
	if (direction == 0){	//Left
		if (index%10 == 9){
			return index;
		}
		else {
			return index + 1;
		}
	}
	else if (direction == 1){	//Right
		if (index%10 == 0){
			return index;
		}
		else {
			return index - 1;
		}
	}
	else if (direction == 2){	//Up
		if (index <= 9){
			return index;
		}
		else {
			return index - 10;
		}		
	}
	else if (direction == 3){	//Down
		if (index >= 90){
			return index;
		}
		else {
			return index + 10;
		}		
	}
	else {
		return index;
	}
}

document.getElementById("song").addEventListener("click", function (){
  total = 0;
  document.getElementById("total").innerHTML = total;
  reward.showReward(total, 1);
});