var correct = 0;
var error = 0; 
var count = 0;
const reward_dir = './public/reward/';
const image_dir = './public/image/bigger/';
const happyImg = ["happybee1.jpg","happybee2.jpg","happybee3.jpg","happybee4.jpg","happybee5.jpg","happybee6.jpg","happycat1.jpg","happycat2.jpg","happycat3.jpg","happycat4.jpg","happycat5.jpg","happycat6.jpg"];
const imgCount = 50;
const grid = ['A1','A2','A3','A4','A5','A6',
			  'B1','B2','B3','B4','B5','B6',
			  'C1','C2','C3','C4','C5','C6',
			  'D1','D2','D3','D4','D5','D6',
			  'E1','E2','E3','E4','E5','E6',
			  'F1','F2','F3','F4','F5','F6'];
const MCQ = ['A','B','C','D'];
const img = document.getElementById("main");

document.getElementById("newGame").addEventListener("click", ()=>{genGame()});
document.getElementById("correct").innerHTML = correct;
document.getElementById("error").innerHTML = error;
document.getElementById("A").addEventListener("click", answerHandler);
document.getElementById("B").addEventListener("click", answerHandler);
document.getElementById("C").addEventListener("click", answerHandler);
document.getElementById("D").addEventListener("click", answerHandler);

let reward = new Reward();
var focus = "";
genGame();

function gridListener(event){
	if (focus != ""){
		document.getElementById(focus).style.border = "1pt solid blue";
	}
	focus = event.currentTarget.id;
	event.currentTarget.style.border = "2pt solid red";
}

function answerHandler(){    
  const value = this.myParam;
  if (focus == ""){
	return;
  }  
  if (focus == value){
	//hide canvas, change grid zIndex to -1
	this.style.display = "none";
	document.getElementById(focus).style.zIndex = -1;
	//focus = "";
	count += 1;
	correct += 1;
	document.getElementById("correct").innerHTML = correct;	
	reward.showReward(correct - error, 4);
  }
  else {
	  if (document.getElementById(focus).style.zIndex == 1){
		error += 1;
		document.getElementById("error").innerHTML = error;	
		reward.showReward(correct - error, 4);
	  }
  }
  
  if (count == 4){
    document.getElementById("happy").style.display = "block";	
  }
  return;
}

function waitForImage(imgElem) {
    return new Promise(res => {
        if (imgElem.complete) {
            return res();
        }
        imgElem.onload = () => res();
        imgElem.onerror = () => res();
    });
}

async function genGame(){	
	//generate new game	
	count = 0; 
	document.getElementById("happy").style.display = "none";
	document.getElementById("happy").src = reward_dir + happyImg[Math.floor(Math.random()*happyImg.length)];
	if (focus != ""){
		document.getElementById(focus).style.border = "1pt solid blue";
	}
	focus = "";
	var imgSrc = image_dir + Math.ceil(Math.random()*imgCount) + '.jpg';
	img.src = imgSrc;
	
	await waitForImage(img);
	
	const imgHeight = img.naturalHeight;
	const imgWidth = img.naturalWidth;
	const frameHeight = img.height;
	const frameWidth = img.width;
	const resizeY = imgHeight/frameHeight;
	const resizeX = imgWidth/frameWidth;
	var resize, offsetX, offsetY;
	if (resizeY < resizeX){
		resize = resizeY;
		offsetX = Math.floor(((imgWidth/resize)-frameWidth)/2);
		offsetY = 0;
	}
	else {
		resize = resizeX;
		offsetX = 0;
		offsetY = Math.floor(((imgHeight/resize)-frameHeight)/2);
	}
	
	var index = Math.floor(Math.random()*grid.length);
	
	emptyGrid = []; var j = 0;
	while (j < 4){
		emptyIndex = Math.floor(Math.random()*grid.length);
		if (!emptyGrid.includes(grid[emptyIndex])){
			emptyGrid.push(grid[emptyIndex]);
			j += 1;
		}
	}

	//fill in grid
	for (var i = 0; i < grid.length; i++) {
		if (emptyGrid.includes(grid[i])){
			document.getElementById(grid[i]).style.zIndex = 1;
			document.getElementById(grid[i]).addEventListener("click", gridListener, false);
		}
		else {
			document.getElementById(grid[i]).style.zIndex = -1;
			document.getElementById(grid[i]).removeEventListener("click", gridListener);
		}
	}
	
	//generate answer 
	for (var i = 0; i < emptyGrid.length; i++){
		let canvas = document.getElementById(MCQ[i]);
		canvas.myParam = emptyGrid[i];
		let ctx = canvas.getContext("2d");
		let sourceX = document.getElementById(emptyGrid[i]).offsetLeft - img.offsetLeft;
		let sourceY = document.getElementById(emptyGrid[i]).offsetTop - img.offsetTop;		
		ctx.drawImage(img, (sourceX+offsetX)*resize, (sourceY+offsetY)*resize, 60*resize, 60*resize, 0, 0, canvas.width, canvas.height); 
		canvas.style.display = "flex";
	}
}

function reset(){
	genGame();
}

document.getElementById("song").addEventListener("click", function (){
  correct = 0; error = 0;
  document.getElementById("correct").innerHTML = correct;
  document.getElementById("error").innerHTML = error;
  reward.showReward(correct - error, 4);
});