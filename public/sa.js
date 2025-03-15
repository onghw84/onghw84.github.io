var correct = 0;
var error = 0;
const iconArray = ["fa fa-cloud","fa fa-circle","fa fa-leaf","fa fa-paw","fa fa-star","fa fa-tree","fa fa-subway","fa fa-train","fa fa-plane","fa fa-bell","fa fa-coffee","fa fa-heart","fa fa-gift","fa fa-umbrella","fa fa-circle"]
const colorArray = ["orange","orangered","blue","pink","green","red","peru","purple"]
const reward_dir = './public/reward/';
const happyImg = ["happybee1.jpg","happybee2.jpg","happybee3.jpg","happybee4.jpg","happybee5.jpg","happybee6.jpg","happycat1.jpg","happycat2.jpg","happycat3.jpg","happycat4.jpg","happycat5.jpg","happycat6.jpg"];
document.getElementById("A").addEventListener("click", answerHandler)
document.getElementById("B").addEventListener("click", answerHandler)
document.getElementById("C").addEventListener("click", answerHandler)
document.getElementById("D").addEventListener("click", answerHandler)

document.getElementById("correct").innerHTML = correct;
document.getElementById("error").innerHTML = error;
const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const arithmetic = document.getElementById("arithmetic");
const illus1 = document.getElementById("illus1");
const illus2 = document.getElementById("illus2");
var answer = 0;
let reward = new Reward();
genQues();

function answerHandler(){
  if (this.value == "Next"){
	genQues(); return;
  }
  if (answer != this.value){
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
	document.getElementById("happy").src = reward_dir + happyImg[Math.floor(Math.random()*happyImg.length)];
    document.getElementById("happy").style.display = "block";
    document.getElementById("happy").style.visibility = "visible";
    document.getElementById("sad").style.visibility = "hidden";
    document.getElementById("sad").style.display = "none";      
    //update correct/error value
    correct += 1;      
    document.getElementById("correct").innerHTML = correct;
    genQues();
  }
  reward.showReward(correct-error, 5);
  return;
}

function genQues(){
  //reset view
  document.getElementById("A").style.backgroundColor = "greenyellow";
  document.getElementById("B").style.backgroundColor = "greenyellow";
  document.getElementById("C").style.backgroundColor = "greenyellow";
  document.getElementById("D").style.backgroundColor = "greenyellow";
  document.getElementById("A").disabled = false;
  document.getElementById("B").disabled = false;
  document.getElementById("C").disabled = false;
  document.getElementById("D").disabled = false;

  const num1 = Math.ceil(Math.random()*document.getElementById("num1Range").value);
  const num2 = Math.ceil(Math.random()*document.getElementById("num2Range").value);
  number1.innerHTML = num1;
  number2.innerHTML = num2;
  if (Math.random() <= 0.5){
    arithmetic.innerHTML = "+"
    answer = num1 + num2;
  }
  else {
    arithmetic.innerHTML = "-"
    if (num1 > num2){
      answer = num1 - num2;
    }
    else {
      answer = num2 - num1;
      number1.innerHTML = num2;
      number2.innerHTML = num1;
    }
  }

  //generate answer
  var rand_answer = answer + Math.floor((Math.random()-0.5)*6);
  if (rand_answer == answer){rand_answer = answer + 1;}
  answer_matrix = [rand_answer];
  for (var i = 1; i < 4; i++){
    rand_answer = answer + Math.floor((Math.random()-0.5)*6);
    while (answer_matrix.indexOf(rand_answer)!=-1 || rand_answer == answer){
      rand_answer = answer + Math.floor((Math.random()-0.5)*6);
    }
    answer_matrix.push(rand_answer);
  }
  document.getElementById("A").value = answer_matrix[0];
  document.getElementById("B").value = answer_matrix[1];
  document.getElementById("C").value = answer_matrix[2];
  document.getElementById("D").value = answer_matrix[3];
  var ca = Math.floor(Math.random()*4);
  if (ca == 0){
    document.getElementById("A").value = answer;
  }
  if (ca == 1){
    document.getElementById("B").value = answer;
  }
  if (ca == 2){
    document.getElementById("C").value = answer;
  }
  if (ca == 3){
    document.getElementById("D").value = answer;
  }      

  //generate icon
  const color = colorArray[Math.floor(Math.random()*colorArray.length)];
  const icon = iconArray[Math.floor(Math.random()*iconArray.length)];
  var text = ""
  
  if (arithmetic.innerHTML == "+"){
    for (var i = 0; i < number1.innerHTML; i++){
      text += `<i class="${icon}"></i>`
    }
    illus1.innerHTML = text;
    illus1.style.color = color;
    text = ""
    for (var i = 0; i < number2.innerHTML; i++){
      text += `<i class="${icon}"></i>`
    }
    illus2.innerHTML = text;
    illus2.style.color = color;
  }
  else {
    for (var i = 0; i < number1.innerHTML; i++){
      if (i < number2.innerHTML){
        text += `<i class="${icon}" style="color:black;"></i>`
      }
      else {
        text += `<i class="${icon}" style="color:${color};"></i>`
      }
    }
    illus1.innerHTML = text;
    illus2.innerHTML = "";
  }
}

document.getElementById("song").addEventListener("click", function (){
  correct = 0;  error = 0;
  document.getElementById("correct").innerHTML = correct;
  document.getElementById("error").innerHTML = error;
  reward.showReward(correct-error, 5);
});

document.getElementById("showIllus").addEventListener("click", function (){
  if (this.checked){
    //document.getElementById("illus").style.visibility="visible";
    document.getElementById("illus1").style.visibility="visible";
    document.getElementById("illus2").style.visibility="visible";
  }
  else {
    //document.getElementById("illus").style.visibility="hidden";
    document.getElementById("illus1").style.visibility="hidden";
    document.getElementById("illus2").style.visibility="hidden";    
  }
});