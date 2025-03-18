var total = 0;
var item = 12;

const img_dir = './public/image/memory/';


document.getElementById("newGame").addEventListener("click", ()=>{genGame()});
document.getElementById("total").innerHTML = total;
var answer = '';
let reward = new Reward();
var focus1 = "";
var focus2 = "";
var clickCount = 0;
var count = 0;
genGame();

document.getElementById("kids").addEventListener("click", function(){
	item = 12; genGame();
})
document.getElementById("easy").addEventListener("click", function(){
	item = 18; genGame();
})
document.getElementById("medium").addEventListener("click", function(){
	item = 24; genGame();
})
document.getElementById("hard").addEventListener("click", function(){
	item = 36; genGame();
})

document.getElementById("startGame").addEventListener("click", async function(){
	await new Promise(resolve => setTimeout(resolve, 500));
	for (var i = 0; i < item; i++) {
		document.getElementById(i).style.visibility = "hidden";
		document.getElementById(i+'A').addEventListener("click", gridListener, false);
		document.getElementById(i+'A').addEventListener("click", gridListener, false);		
	}	
	document.getElementById("startGame").style.display = "none";
})

function gridListener(event){
	if (clickCount == 0){		
		focus1 = event.currentTarget.id;
		clickCount = 1;
		document.getElementById(focus1.replace('A','')).style.visibility = "visible";
	}
	else if (clickCount == 1){
		focus2 = event.currentTarget.id;
		clickCount = 0;
		document.getElementById(focus2.replace('A','')).style.visibility = "visible";		
		answerHandler();
	}	
}

async function answerHandler(){    
  const value1 = document.getElementById(focus1).myParams;  
  const value2 = document.getElementById(focus2).myParams;  
  if (focus1 == focus2){
	  return;
  }
  else {
	  if (value1 == value2){
		  document.getElementById(focus1).classList.add("stop");
		  document.getElementById(focus2).classList.add("stop");
		  count += 1;
	  }
	  else {
		  await new Promise(resolve => setTimeout(resolve, 200));
		  document.getElementById(focus1.replace('A','')).style.visibility = "hidden";
		  document.getElementById(focus2.replace('A','')).style.visibility = "hidden";
	  }
  }
  
  if (count == item/2){
	document.getElementById("container1").style.backgroundColor = "pink";
	total += 1; count = 0;
	document.getElementById("total").innerHTML = total;
	reward.showReward(total, 1);
  }
  return;
}

function genGame(){	
	//generate new game
	var text = "";
	for (var i = 0; i < item; i++) {
		text += `<div class = "grid" id="${i+'A'}"><img id="${i}"></img></div>`;
	}
	document.getElementById("container1").innerHTML = text;
	document.getElementById("startGame").style.display = "flex";
	
	var array1 = new Array(item).fill(0);
	var list = array1.map((el,index)=>{return index});
	var array2 = new Array(148).fill(0);
	var tmpChars = array2.map((el,index)=>{return index});
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

document.getElementById("song").addEventListener("click", function (){
  total = 0;
  document.getElementById("total").innerHTML = total;
  reward.showReward(total, 10);
});