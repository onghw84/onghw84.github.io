const reward_dir = './public/reward/';
const happyImg = ["happybee1.jpg","happybee2.jpg","happybee3.jpg","happybee4.jpg","happybee5.jpg","happybee6.jpg","happycat1.jpg","happycat2.jpg","happycat3.jpg","happycat4.jpg","happycat5.jpg","happycat6.jpg"];
const item = ['cnugget','french fries','cupcake','grapes','apple','orange','pen','eraser','pencil','nasi lemak','exercise book','ice cream','cookies','colour pencil'];
const price = [3.5,2,1.8,8.9,0.6,0.8,1.1,1.25,0.5,6.5,1.2,3,2.4,9.9]
var total = 0; var gameNo = 0;
const totalT = document.getElementById("total");
var answer = 0; var change = false; var change_value = 0;
let reward = new Reward();
document.getElementById("newGame").addEventListener("click", ()=>{genQues()});
const getButton = document.querySelectorAll('input[type="button"]');
genQues();

function clickHandler(){
	if (document.getElementById(this.id+"t").innerHTML == 0 && this.value == "-"){
		return;
	}	  
	if (this.id.includes('c')){
		value = parseInt(this.id.slice(0,-1))/100;		
	}
	else {value = parseInt(this.id);}		
	
	if (this.value == "+"){
		total += value;		
		document.getElementById(this.id+"t").innerHTML = parseInt(document.getElementById(this.id+"t").innerHTML)+1;
	}
	else {
		total -= value;
		document.getElementById(this.id+"t").innerHTML = parseInt(document.getElementById(this.id+"t").innerHTML)-1;
	}
	totalT.innerHTML = `Total: RM${total.toFixed(2)}`;
	answerHandler();
}

function answerHandler(){
  if (Math.round(total*100) == Math.round(answer*100)){
	gameNo += 1;
	totalT.style.color = "black";
	totalT.style.backgroundColor = "pink";
	document.getElementById("happy").style.visibility = "visible";
	document.getElementById("gameNo").innerHTML = gameNo;
	for (let i = 0; i < getButton.length; i++) {
		getButton[i].removeEventListener("click", clickHandler);
	}
	reward.showReward(gameNo, 1);
  }
  else {
	  if (total > answer){
		  totalT.style.color = "blue";
	  }
	  else {
		  totalT.style.color = "red";
	  }
  }
  return;
}

const learnSelect = document.querySelectorAll('input[name="pay_change"]');
for (let i = 0; i < learnSelect.length; i++) {
  learnSelect[i].addEventListener("change", function() {
    if (this.value == 1){
      change = false;
    }
	else {
      change = true;
	}
	genQues();
  })
}

function genQues(){
  //reset view
	document.getElementById("happy").src = reward_dir + happyImg[Math.floor(Math.random()*happyImg.length)];
	for (let i = 0; i < getButton.length; i++) {
	  getButton[i].addEventListener("click", clickHandler);
	  if (getButton[i].value == "+"){
		  document.getElementById(getButton[i].id+"t").innerHTML = 0;
	  }
	}
	total = 0;
	totalT.innerHTML = `Total: RM0.00`;
	totalT.style.backgroundColor = "white";
	document.getElementById("happy").style.visibility = "hidden";
 
	var index = Math.floor(Math.random()*item.length);
	document.getElementById("pimage").innerHTML = `<img src="./public/image/${item[index]}.jpg"></img>`	
	
	if (change){
		document.getElementById("pay_amt").style.display = "block";
		var bill = [1, 5, 10, 20]; var tmp = [];
		bill.forEach((el) => {if (el > price[index]){tmp.push(el)}})		
		change_value = tmp[Math.floor(Math.random()*tmp.length)];
		document.getElementById("pay_amt").src = `./public/image/RM${change_value}.png`;
		answer = change_value - price[index];
		document.getElementById("price").innerHTML = `RM${price[index]}`
		document.getElementById("return").innerHTML = `To return: RM${answer.toFixed(2)}`
	}
	else {
		document.getElementById("pay_amt").style.display = "none";
		change_value = 0;
		answer = price[index];
		document.getElementById("price").innerHTML = `RM${price[index]}`
		document.getElementById("return").innerHTML = ""
	}	
}

document.getElementById("song").addEventListener("click", function (){
  correct = 0;  error = 0;
  document.getElementById("correct").innerHTML = correct;
  document.getElementById("error").innerHTML = error;
  reward.showReward(correct-error, 1);
});
