var total = 0;

const iconArray = ["fa fa-cloud","fa fa-circle","fa fa-leaf","fa fa-paw","fa fa-star","fa fa-tree","fa fa-subway","fa fa-train","fa fa-plane","fa fa-bell","fa fa-coffee","fa fa-heart","fa fa-gift","fa fa-umbrella"]
const colorArray = ["orange","orangered","blue","black","green","red","peru","purple"]
const reward_dir = './public/reward/';
const happyImg = ["happybee1.jpg","happybee2.jpg","happybee3.jpg","happybee4.jpg","happybee5.jpg","happybee6.jpg","happycat1.jpg","happycat2.jpg","happycat3.jpg","happycat4.jpg","happycat5.jpg","happycat6.jpg"];
const wordPair = [["CR","GP"],["80","BO"],["F5","ES"],["85","BS"],["EO","FQ"],["CM","GM"],["pq","bd"]];
//["午","牛"],["九","丸"],["人","入"],["生","牛"],["井","并"],["女","文"],["洋","详"],["挨","埃"],["仑","仓"],["于","丁"],["正","止"],["晴","睛"]];

//["找","我"],["水","永"],["刀","力"],["十","土"],["厂","广"],["九","几"],["月","明"],["笑","哭"],["是","足"],["品","晶"],["好","女"],
//["三","二"],["大","太"],["十","干"],["乙","九"],["大","天"],["必","心"],["子","了"],["日","目"],
//,
const ABCArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlklmnopqrstuvwxyz";
const fontArray = ["Courier New","Georgia","Arial","Monospace"];
	  
const grid = ['A1','A2','A3','A4','A5','A6','A7','A8','A9',
			  'B1','B2','B3','B4','B5','B6','B7','B8','B9',
			  'C1','C2','C3','C4','C5','C6','C7','C8','C9',
			  'D1','D2','D3','D4','D5','D6','D7','D8','D9',
			  'E1','E2','E3','E4','E5','E6','E7','E8','E9',
			  'F1','F2','F3','F4','F5','F6','F7','F8','F9',
			  'G1','G2','G3','G4','G5','G6','G7','G8','G9',
			  'H1','H2','H3','H4','H5','H6','H7','H8','H9',
			  'I1','I2','I3','I4','I5','I6','I7','I8','I9'];

document.getElementById("newGame").addEventListener("click", ()=>{genGame()});
document.getElementById("total").innerHTML = total;
var answer = '';
let reward = new Reward();
var focus = "";
genGame();

function gridListener(event){
	if (focus != ""){
		document.getElementById(focus).style.backgroundColor = "white";
	}
	focus = event.currentTarget.id;
	event.currentTarget.style.backgroundColor = "yellowgreen";
	answerHandler();
}

for (var i = 0; i < grid.length; i++) {
	document.getElementById(grid[i]).addEventListener("click", gridListener, false);
}

function answerHandler(){    
  const value = document.getElementById(focus).id;  
  
  if (answer == value){
	document.getElementById("container1").style.backgroundColor = "pink";
	document.getElementById("container1").classList.add("stop");		 
    document.getElementById("happy").style.display = "block";
    document.getElementById("happy").style.visibility = "visible";
    document.getElementById("sad").style.visibility = "hidden";
    document.getElementById("sad").style.display = "none";
	total += 1;
	document.getElementById("total").innerHTML = total;
	reward.showReward(total, 10);				
  }
  else {
    document.getElementById("sad").style.display = "block";
    document.getElementById("sad").style.visibility = "visible";
    document.getElementById("happy").style.visibility = "hidden";
    document.getElementById("happy").style.display = "none";
  }
  return;
}

function genGame(){	
	document.getElementById("happy").src = reward_dir + happyImg[Math.floor(Math.random()*happyImg.length)];	
	document.getElementById("container1").classList.remove("stop");
	document.getElementById("sad").style.display = "none";
	document.getElementById("happy").style.display = "none";
	document.getElementById("container1").style.backgroundColor = "white";
	
	//generate new game
	var index = Math.floor(Math.random()*grid.length);
	var wordIndex = Math.floor(Math.random()*wordPair.length);
	var same = Math.floor(Math.random()*iconArray.length);
	var diff = Math.floor(Math.random()*iconArray.length);
	while (diff == same){
		diff = Math.floor(Math.random()*iconArray.length);
	}
	var color = colorArray[Math.floor(Math.random()*colorArray.length)];
	var ABC = ABCArray[Math.floor(Math.random()*ABCArray.length)] + ABCArray[Math.floor(Math.random()*ABCArray.length)];
	var fontA = [...fontArray];
	var font1 = fontA[Math.floor(Math.random()*fontArray.length)];
	fontA = fontA.filter((el)=>el!=font1);
	var font2 = fontA[Math.floor(Math.random()*fontA.length)];
	var fontstyle1 = Math.random()<0.5? 'italic':'normal';
	var fontstyle2 = Math.random()<0.5? 'italic':'normal';
	answer = grid[index];

	//fill in grid
	for (var i = 0; i < grid.length; i++) {
		document.getElementById(grid[i]).style.backgroundColor = "white";
		if (i == index){
			if (total%3 == 0){
				document.getElementById(grid[i]).innerHTML = `<i class="${iconArray[diff]}" style="color:${color};"></i>`;	//different image
			}
			else if (total%3 == 1){
				document.getElementById(grid[i]).innerHTML = `<p style="color:${color};">${wordPair[wordIndex][1]}</p>`;	//different word
			}
			else {
				document.getElementById(grid[i]).innerHTML = `<p style="color:${color}; font-family: ${font1}; font-style:${fontstyle1}">${ABC}</p>`;	//different word
			}
		}
		else {
			if (total%3 == 0){
				document.getElementById(grid[i]).innerHTML = `<i class="${iconArray[same]}" style="color:${color};"></i>`;	//same image
			}
			else if (total%3 == 1){
				document.getElementById(grid[i]).innerHTML = `<p style="color:${color};">${wordPair[wordIndex][0]}</p>`;	//same word
			}
			else {
				document.getElementById(grid[i]).innerHTML = `<p style="color:${color}; font-family: ${font2}; font-style:${fontstyle2}">${ABC}</p>`;	//different word
			}
		}
	}
}

document.getElementById("song").addEventListener("click", function (){
  total = 0;
  document.getElementById("total").innerHTML = total;
  reward.showReward(total, 10);
});