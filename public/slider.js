var total = 0;
const mySvg = document.getElementById("mySvg");
const endSrc = './public/reward/happybee.gif';
const beeMap = new Map();
beeMap.set("skyb", 0);
beeMap.set("pink", 1);
beeMap.set("purple", 2);
beeMap.set("yellow", 3);
beeMap.set("orange", 4);
beeMap.set("dpink", 5);
beeMap.set("white", 6);
const svgsize = 370;
const gridNo = 9;
const beeSize = 50;
const targetSize = 100;
const sidePad = 5;
const interval = (svgsize - sidePad*2)/Math.sqrt(gridNo);
const bee1 = sidePad + interval/2 - beeSize/2;
const target1 = sidePad + interval/2 - targetSize/2;
const pos = [bee1, bee1+interval, bee1+interval*2];
const post = [target1, target1+interval, target1+interval*2];
var beeloc;
var targetloc;

document.getElementById("newGame").addEventListener("click", ()=>{genGame()});
document.getElementById("total").innerHTML = total;
var answer = '';
let reward = new Reward();
var focus = "";
var move = 0; var dir = 0; var beeNo = 4;
genGame();

mySvg.addEventListener("pointerdown",selectHandler);
mySvg.addEventListener("pointermove",moveHandler);
mySvg.addEventListener("pointerup",checkHandler);
mySvg.addEventListener("pointerleave",checkHandler);

document.getElementById("kids").addEventListener("click", function(){
	beeNo = 4; reset(); this.style.backgroundColor = "pink";
})
document.getElementById("easy").addEventListener("click", function(){
	beeNo = 5; reset(); this.style.backgroundColor = "pink";
})
document.getElementById("medium").addEventListener("click", function(){
	beeNo = 6; reset(); this.style.backgroundColor = "pink";	
})
document.getElementById("hard").addEventListener("click", function(){
	beeNo = 7; reset(); this.style.backgroundColor = "pink";
})

function selectHandler(event){
	focus = event.target.id;
	if (beeMap.has(focus)){
		move = 1;
	}
	else {move = 0;}
}

function moveHandler(event){
	
	if (move == 1){		
		loc = getXY(beeloc[beeMap.get(focus)]);
		focusItem = document.getElementById(focus);
		//can only move in x direction or y direction
		if (dir == 0){
			if (Math.abs(event.movementX) > Math.abs(event.movementY)){
				dir = 1;	//x direction
			}
			else {dir = 2; }	//y direction
		}
				
		if (dir == 1){
			if (Math.sign(event.movementX) == 1){
				offX = 60;
			}
			else {
				offX = 0;
			}
			//check movement if got other bee blocking	
			gotoGrid = checkGrid(event.offsetX + offX, loc[1]);
			if (!checkBlock(beeloc[beeMap.get(focus)],gotoGrid)){
				if (event.offsetX < svgsize - sidePad - beeSize){
					focusItem.setAttribute('x',event.offsetX);
					beeloc[beeMap.get(focus)] = checkGrid(event.offsetX, loc[1]);
				}
				else {
					focusItem.setAttribute('x',svgsize - sidePad - beeSize);
					beeloc[beeMap.get(focus)] = checkGrid(svgsize - sidePad - beeSize, loc[1]);
				}
				
			}
		}
		else if (dir == 2){
			if (Math.sign(event.movementY) == 1){
				offY = 60;
			}
			else {
				offY = 0;
			}			
			gotoGrid = checkGrid(loc[0], event.offsetY + offY);
			if (!checkBlock(beeloc[beeMap.get(focus)],gotoGrid)){
				if (event.offsetY < svgsize - sidePad - beeSize){
					focusItem.setAttribute('y',event.offsetY);
					beeloc[beeMap.get(focus)] = checkGrid(loc[0], event.offsetY);
				}
				else {
					focusItem.setAttribute('y',svgsize - sidePad - beeSize);
					beeloc[beeMap.get(focus)] = checkGrid(loc[0],svgsize - sidePad - beeSize);
				}			
			}			
		}
	}
}

function checkHandler(event){
	if (move == 1){
		setXY(focus,beeloc[beeMap.get(focus)]);		
		move = 0; dir = 0;	
		focus = "";
		answerHandler();
	}
}

function checkBlock(startGrid, gotoGrid){
	if (startGrid == gotoGrid){
		return false;
	}
	else {
		if (beeloc.indexOf(gotoGrid) != -1){
			return true;
		}
		else {
			//check any grid btw startGrid and gotoGrid
			if (Math.abs(startGrid-gotoGrid) == Math.sqrt(gridNo) || Math.abs(startGrid-gotoGrid) == 1){
				return false;			
			}
			else {				
				if (Math.abs(startGrid-gotoGrid)%Math.sqrt(gridNo)==0){
					addDir = Math.sign(gotoGrid-startGrid); addNum = Math.sqrt(gridNo);
				}
				else {
					addDir = Math.sign(gotoGrid-startGrid); addNum = 1;
				}
				eGrid = startGrid + addDir*addNum; btwGrid = []
				while (eGrid!=gotoGrid){
					btwGrid.push(eGrid);
					eGrid += addDir*addNum;
				}
				for (var i = 0; i < btwGrid.length; i++){
					if (beeloc.indexOf(btwGrid[i]) != -1){
						return true;
					}
				}
				return false;
			}
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
	return Math.floor((y-sidePad)/interval)*(Math.sqrt(gridNo)) + Math.floor((x-sidePad)/interval);
}

function getXY(grid){
	return [pos[grid%3],pos[Math.floor(grid/3)]];
}

function setXY(el, grid){	
	[x,y] = getXY(grid);
	document.getElementById(el).setAttribute('x', x); 
	document.getElementById(el).setAttribute('y', y);
	return 
}

function setTXY(el, grid){	
	[x,y] = [post[grid%3],post[Math.floor(grid/3)]];
	document.getElementById(el).setAttribute('x', x); 
	document.getElementById(el).setAttribute('y', y);
	return 
}

async function answerHandler(){    
  count = 0;
  for (var i = 0; i < targetloc.length; i++){
	  if (targetloc[i] == beeloc[i]){
		  count+= 1;
	  }
  }
  if (count == targetloc.length){	
	total += 1; 
	text = `
	  <defs><linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stop-color="orchid" /><stop offset="100%" stop-color="white" /></linearGradient></defs>
	  <rect class="close" width="370" height="370" x="0" y="0" fill="url(#grad1)"/>
	  <image id="target_skyb" class="end" x=60 y=60 href="${endSrc}"/>`
	mySvg.innerHTML = text;
	document.getElementById("total").innerHTML = total;
	reward.showReward(total, 1);

	await new Promise(resolve => setTimeout(resolve, 3000));
	genGame();
  }
}

function genGame(){	

	//generate new game
	text = `
			<image id="target_skyb" class="target" href="./public/image/memory/157.png"/>
			<image id="target_pink" class="target" href="./public/image/memory/151.png"/>
			<image id="target_purple" class="target" href="./public/image/memory/106.png"/>
			<image id="target_yellow" class="target" href="./public/image/memory/103.png"/>`;			
	if (beeNo >= 5){
		text += `<image id="target_orange" class="target" href="./public/image/memory/156.png"/>`;
	}
	if (beeNo >= 6){
		text += `<image id="target_dpink" class="target" href="./public/image/memory/101.png"/>`;
	}
	if (beeNo >= 7){
		text += `<image id="target_white" class="target" href="./public/image/memory/158.png"/>`;
	}	
	
	text += `<image id="skyb" class="bee" href="./public/image/bluebee.png"/>
			<image id="pink" class="bee" href="./public/image/pinkbee.png"/>
			<image id="purple" class="bee" href="./public/image/purplebee.png"/>
			<image id="yellow" class="bee" href="./public/image/yellowbee.png"/>`;
	if (beeNo >= 5){
		text += `<image id="orange" class="bee" href="./public/image/orangebee.png"/>`;
	}
	if (beeNo >= 6){
		text += `<image id="dpink" class="bee" href="./public/image/dpinkbee.png"/>`;
	}
	if (beeNo >= 7){
		text += `<image id="white" class="bee" href="./public/image/whitebee.png"/>`;
	}
	text += '</svg>'
	mySvg.innerHTML = text;
	
	var array1 = new Array(9).fill(0);
	var list = array1.map((el,index)=>{return index});	
	var tmpArray = shuffle(list); var beekey = beeMap.keys();
	beeloc = []; targetloc = [];
	for (var i = 0; i < beeNo; i++){
		targetloc[i] = tmpArray[i];
		setTXY("target_"+beekey.next().value, tmpArray[i]);
	}	
	
	tmpArray = shuffle(list); beekey = beeMap.keys();
	for (var i = 0; i < beeNo; i++){
		beeloc[i] = tmpArray[i];
		setXY(beekey.next().value, tmpArray[i]);
	}
	
}

function shuffle(array) { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
} 

function reset(){
	document.getElementById("kids").style.backgroundColor = "white";
	document.getElementById("easy").style.backgroundColor = "white";
	document.getElementById("medium").style.backgroundColor = "white";
	document.getElementById("hard").style.backgroundColor = "white";
	genGame();
}


document.getElementById("song").addEventListener("click", function (){
  total = 0;
  document.getElementById("total").innerHTML = total;
  reward.showReward(total, 10);
});