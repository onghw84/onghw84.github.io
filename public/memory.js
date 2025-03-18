var total = 0;
var item = 8;

const img_dir = './public/image/memory/';


document.getElementById("newGame").addEventListener("click", ()=>{genGame()});
document.getElementById("total").innerHTML = total;
var answer = '';
let reward = new Reward();
var focus1 = "";
var focus2 = "";
var clickCount = 0;
var totalClick = 0;
var count = 0;
genGame();

document.getElementById("kids").addEventListener("click", function(){
	item = 8; document.getElementById("container1").style.height = "185px"; 
	reset(); this.style.backgroundColor = "pink";
})
document.getElementById("easy").addEventListener("click", function(){
	item = 16; document.getElementById("container1").style.height = "370px"; 
	reset(); this.style.backgroundColor = "pink";
})
document.getElementById("medium").addEventListener("click", function(){
	item = 24; document.getElementById("container1").style.height = "250px"; 
	reset(); this.style.backgroundColor = "pink";
})
document.getElementById("hard").addEventListener("click", function(){
	item = 36; document.getElementById("container1").style.height = "370px"; 
	reset(); this.style.backgroundColor = "pink";
})

document.getElementById("startGame").addEventListener("click", async function(){
	await new Promise(resolve => setTimeout(resolve, 500));
	for (var i = 0; i < item; i++) {
		document.getElementById(i).style.visibility = "hidden";
		document.getElementById(i+'A').classList.add("close");
		document.getElementById(i+'A').addEventListener("click", gridListener, false);		
	}	
	document.getElementById("startGame").style.display = "none";
})

function gridListener(event){
	totalClick += 1;
	document.getElementById("totalClick").innerHTML = totalClick;	
	if (clickCount == 0){		
		focus1 = event.currentTarget.id;
		this.classList.remove("close");
		clickCount = 1;
		document.getElementById(focus1.replace('A','')).style.visibility = "visible";
	}
	else if (clickCount == 1){
		focus2 = event.currentTarget.id;
		this.classList.remove("close");
		clickCount = 0;
		document.getElementById(focus2.replace('A','')).style.visibility = "visible";		
		answerHandler();
	}	
}

async function answerHandler(){    
  const value1 = document.getElementById(focus1).myParams;  
  const value2 = document.getElementById(focus2).myParams;  
  if (focus1 == focus2){
	  document.getElementById(focus1).classList.add("close");
	  return;
  }
  else {
	  if (value1 == value2){
		  document.getElementById(focus1).classList.remove("close");
		  document.getElementById(focus2).classList.remove("close");
		  document.getElementById(focus1).classList.add("stop");
		  document.getElementById(focus2).classList.add("stop");
		  count += 1;
	  }
	  else {
		  await new Promise(resolve => setTimeout(resolve, 300));
		  document.getElementById(focus1.replace('A','')).style.visibility = "hidden";
		  document.getElementById(focus2.replace('A','')).style.visibility = "hidden";
		  document.getElementById(focus1).classList.add("close");
		  document.getElementById(focus2).classList.add("close");		  
	  }
  }
  
  if (count == item/2){
	document.getElementById("container1").style.backgroundColor = "pink";
	if (totalClick < item*1.5){
	   total += 1; 
	}
	count = 0; totalClick = 0;
	document.getElementById("total").innerHTML = total;
	reward.showReward(total, 1);
  }
  return;
}

function genGame(){	
	//generate new game
	var text = "";
	for (var i = 0; i < item; i++) {
		if (item <= 16){
			text += `<div class = "grid size8" id="${i+'A'}"><img id="${i}" class="size8"></img></div>`;
		}
		else {
			text += `<div class = "grid size24" id="${i+'A'}"><img id="${i}" class="size24"></img></div>`;
		}
	}
	document.getElementById("totalClick").innerHTML = totalClick;
	document.getElementById("container1").innerHTML = text;
	document.getElementById("startGame").style.display = "flex";
	
	var array1 = new Array(item).fill(0);
	var list = array1.map((el,index)=>{return index});
	var array2 = new Array(148).fill(0);
	var tmpChars = array2.map((el,index)=>{return index+1});
	for (var i = 0; i < item/2; i++) {
		var index1 = list[Math.floor(Math.random()*list.length)];
		list = list.filter((el)=>el!=index1);
		var index2 = list[Math.floor(Math.random()*list.length)];
		list = list.filter((el)=>el!=index2);
		var imgName = tmpChars[Math.floor(Math.random()*tmpChars.length)];
		tmpChars = tmpChars.filter((el)=>el!=imgName);
		document.getElementById(index1).src = img_dir+imgName+".png"
		document.getElementById(index2).src = img_dir+imgName+".png"
		document.getElementById(index1+'A').myParams = imgName;
		document.getElementById(index2+'A').myParams = imgName;
	}
	document.getElementById("container1").style.backgroundColor = "white";
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
  reward.showReward(total, 10);
});