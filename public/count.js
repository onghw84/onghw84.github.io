var correct = 0;
var error = 0;
const reward_dir = './public/reward/';
const happyImg = ["happybee1.jpg","happybee2.jpg","happybee3.jpg","happybee4.jpg","happybee5.jpg","happybee6.jpg","happycat1.jpg","happycat2.jpg","happycat3.jpg","happycat4.jpg","happycat5.jpg","happycat6.jpg"];
document.getElementById("A").addEventListener("click", answerHandler)
document.getElementById("B").addEventListener("click", answerHandler)
document.getElementById("C").addEventListener("click", answerHandler)
document.getElementById("D").addEventListener("click", answerHandler)

document.getElementById("correct").innerHTML = correct;
document.getElementById("error").innerHTML = error;
const ques = document.getElementById("ques");
var answer = 0;
let reward = new Reward();
genQues();

function answerHandler(){
  if (this.value == "Next"){
	genQues(); return;
  }
  if ("RM"+answer.toFixed(2) != this.value){
    this.style.backgroundColor = "orange";
	var errCount = 0; var corA = 'A';
	if (document.getElementById("A").style.backgroundColor == "orange"){errCount += 1;} else {corA = 'A';}
	if (document.getElementById("B").style.backgroundColor == "orange"){errCount += 1;} else {corA = 'B';}
	if (document.getElementById("C").style.backgroundColor == "orange"){errCount += 1;} else {corA = 'C';}
	if (document.getElementById("D").style.backgroundColor == "orange"){errCount += 1;} else {corA = 'D';}
	if (errCount == 3){
		document.getElementById("A").value = "Next";
		document.getElementById("B").value = "Next";
		document.getElementById("C").value = "Next";
		document.getElementById("D").value = "Next";
		document.getElementById(corA).value = answer;
		document.getElementById(corA).disabled = true;
	}			
    document.getElementById("sad").style.display = "block";
    document.getElementById("sad").style.visibility = "visible";
    document.getElementById("happy").style.visibility = "hidden";
    document.getElementById("happy").style.display = "none";
    //update correct/error value
    error += 1;
    document.getElementById("error").innerHTML = error;      
  }
  else {	
    document.getElementById("happy").style.display = "block";
    document.getElementById("happy").style.visibility = "visible";
    document.getElementById("sad").style.visibility = "hidden";
    document.getElementById("sad").style.display = "none";      
    //update correct/error value
    correct += 1;      
	document.getElementById("A").value = "Next";
	document.getElementById("B").value = "Next";
	document.getElementById("C").value = "Next";
	document.getElementById("D").value = "Next";	
    document.getElementById("correct").innerHTML = correct;
  }
  reward.showReward(correct-error, 5);
  return;
}

function genQues(){
  //reset view
  document.getElementById("sad").style.visibility = "hidden";
  document.getElementById("happy").style.visibility = "hidden";
  document.getElementById("happy").src = reward_dir + happyImg[Math.floor(Math.random()*happyImg.length)];
  document.getElementById("A").style.backgroundColor = "greenyellow";
  document.getElementById("B").style.backgroundColor = "greenyellow";
  document.getElementById("C").style.backgroundColor = "greenyellow";
  document.getElementById("D").style.backgroundColor = "greenyellow";  
  document.getElementById("A").disabled = false;
  document.getElementById("B").disabled = false;
  document.getElementById("C").disabled = false;
  document.getElementById("D").disabled = false;
  
  const num10 = Math.floor(Math.random()*2);
  const num5 = Math.floor(Math.random()*2);
  const num1 = Math.floor(Math.random()*3);
  const num50c = Math.floor(Math.random()*3);
  var num20c = Math.floor(Math.random()*3);
  var num10c = Math.floor(Math.random()*3);
  const num5c = Math.floor(Math.random()*3);
  if (num10 + num5 + num1 + num50c + num20c + num10c + num5c <= 2){
	num20c = Math.ceil(Math.random()*3); num10c = Math.ceil(Math.random()*3);
  }
  
  answer = num10*10 + num5*5 + num1*1 + num50c*0.5 + num20c*0.2 + num10c*0.1 + num5c*0.05;
  
  var content = "";
  for (var i = 0; i < num10; i++){
	  content += `<img src="./public/image/RM10.png" class="RM"></img>`
  }
  for (var i = 0; i < num5; i++){
	  content += `<img src="./public/image/RM5.png" class="RM"></img>`
  }
  for (var i = 0; i < num1; i++){
	  content += `<img src="./public/image/RM1.png" class="RM"></img>`
  }
  for (var i = 0; i < num50c; i++){
	  content += `<img src="./public/image/coin_50.png" class="coin"></img>`
  }
  for (var i = 0; i < num20c; i++){
	  content += `<img src="./public/image/coin_20.png" class="coin"></img>`
  }
  for (var i = 0; i < num10c; i++){
	  content += `<img src="./public/image/coin_10.png" class="coin"></img>`
  }
  for (var i = 0; i < num5c; i++){
	  content += `<img src="./public/image/coin_5.png" class="coin"></img>`
  }
  ques.innerHTML = content;

  //generate answer
  var rand_answer = answer + Math.floor(((Math.random()-0.5)*1)*20)/20;
  if (rand_answer == answer){rand_answer = answer + 1;}
  answer_matrix = [rand_answer];
  for (var i = 1; i < 4; i++){
    rand_answer = answer + Math.floor(((Math.random()-0.5)*1)*20)/20;
    while (answer_matrix.indexOf(rand_answer)!=-1 || rand_answer == answer){
      rand_answer = answer + Math.floor(((Math.random()-0.5)*1)*20)/20;
    }
    answer_matrix.push(rand_answer);
  }
  document.getElementById("A").value = "RM"+answer_matrix[0].toFixed(2);
  document.getElementById("B").value = "RM"+answer_matrix[1].toFixed(2);
  document.getElementById("C").value = "RM"+answer_matrix[2].toFixed(2);
  document.getElementById("D").value = "RM"+answer_matrix[3].toFixed(2);
  var ca = Math.floor(Math.random()*4);
  if (ca == 0){
    document.getElementById("A").value = "RM"+answer.toFixed(2);
  }
  if (ca == 1){
    document.getElementById("B").value = "RM"+answer.toFixed(2);
  }
  if (ca == 2){
    document.getElementById("C").value = "RM"+answer.toFixed(2);
  }
  if (ca == 3){
    document.getElementById("D").value = "RM"+answer.toFixed(2);
  }      
}

document.getElementById("song").addEventListener("click", function (){
  correct = 0;  error = 0;
  document.getElementById("correct").innerHTML = correct;
  document.getElementById("error").innerHTML = error;
  reward.showReward(correct-error, 5);
});