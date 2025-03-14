var correct = 0;
var error = 0;
const iconArray = ["fa fa-cloud","fa fa-circle","fa fa-leaf","fa fa-paw","fa fa-star","fa fa-tree","fa fa-subway","fa fa-train","fa fa-plane","fa fa-bell","fa fa-coffee","fa fa-heart","fa fa-gift","fa fa-umbrella","fa fa-circle"]
const colorArray = ["orange","orangered","blue","black","green","red","peru","purple"]
const MCQ = ["A","B","C","D"];

const reward_dir = './public/reward/';
const happyImg = ["happybee1.jpg","happybee2.jpg","happybee3.jpg","happybee4.jpg","happybee5.jpg","happybee6.jpg","happycat1.jpg","happycat2.jpg","happycat3.jpg","happycat4.jpg","happycat5.jpg","happycat6.jpg"];
document.getElementById("A").addEventListener("click", answerHandler)
document.getElementById("B").addEventListener("click", answerHandler)
document.getElementById("C").addEventListener("click", answerHandler)
document.getElementById("D").addEventListener("click", answerHandler)

document.getElementById("correct").innerHTML = correct;
document.getElementById("error").innerHTML = error;
const question = document.getElementById("question");
var answer = 0;
let reward = new Reward();
let level = 0;
genQues();

let diffSelect = document.querySelectorAll('input[name="level"]');
for (let i = 0; i < diffSelect.length; i++) {
  diffSelect[i].addEventListener("change", function() {
    level = this.value;
    genQues();
  });
}

function answerHandler(){
  if (answer != this.innerHTML){
    this.style.backgroundColor = "orange";
    var errCount = 0;
    if (document.getElementById("A").style.backgroundColor == "orange"){errCount += 1};
    if (document.getElementById("B").style.backgroundColor == "orange"){errCount += 1};
    if (document.getElementById("C").style.backgroundColor == "orange"){errCount += 1};
    if (document.getElementById("D").style.backgroundColor == "orange"){errCount += 1};
    if (errCount == 3){
      genQues();
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
  //document.getElementById("happy").style.visibility = "hidden";
  //document.getElementById("sad").style.visibility = "hidden";
  document.getElementById("A").style.backgroundColor = "greenyellow";
  document.getElementById("B").style.backgroundColor = "greenyellow";
  document.getElementById("C").style.backgroundColor = "greenyellow";
  document.getElementById("D").style.backgroundColor = "greenyellow";

  //set difficulty level
  var ques = [];
  
  var rep = Math.floor(Math.random()*3);
  var repArith = Math.floor((Math.random()-0.5)*2);
  var repStart = Math.floor(Math.random()*2);
  var repNum = Math.floor((Math.random()-0.5)*4);
  var numNum = Math.floor((Math.random()-0.5)*4);
  var numArith = Math.floor((Math.random()-0.5)*2);
  var iniNum = Math.floor(Math.random()*10);  
  var repIniNum = Math.floor(Math.random()*2);
  
  if (rep == 0){
    repStart = 0;
    if (numNum == 0){
      numNum = Math.ceil(Math.random()*4);
    }
    if (numArith == 0){
      numArith = 1;
    }        
  }

  if (level <= 1){
    rep = Math.ceil(Math.random()*2);
	var round = Math.ceil(Math.random()*3)+1;
	if (rep == 2){
		round = Math.ceil(Math.random()*2)+1;
	}
	var i = 0; var k = 0;
	while (i < 10){
		for (var j = 0; j < rep; j++){
			ques.push(iniNum);
			i += 1;
		}
		iniNum++;
		k++;
		if (k == round){
			iniNum -= round;	
			k = 0;
		}
	}
  }  
  else {
	while (repNum == 0){
		repNum = Math.floor((Math.random()-0.5)*4);
	}
	while (repArith == 0){
		repArith = Math.floor((Math.random()-0.5)*2);
	}
	while (rep == 0){
		rep = Math.floor(Math.random()*3);			
	}	  
	while (numNum == 0){
		numNum = Math.floor((Math.random()-0.5)*4);
	}
	while (numArith == 0){
		numArith = Math.floor((Math.random()-0.5)*2);
	}			
	  if (level == 2){
		rep = 0; 
	  }

	  if (level == 3){
		numArith = 0; rep = 1;
	  }

	//  console.log(`rep:${rep}, repArith:${repArith}, repStart:${repStart}, repNum:${repNum}, iniNum:${iniNum}, repIniNum:${repIniNum}, numNum:${numNum}, numArith:${numArith}`)
	  for (var i = 0; i < 10; i++){
		if (i < repStart){
		  ques.push(iniNum);
		  iniNum += numArith*numNum;
		}
		else {
		  if (((i-repStart)%(rep+1) == 0) && rep != 0){
			ques.push(repIniNum);
			repIniNum += repArith*repNum;
		  }
		  else {
			ques.push(iniNum);
			iniNum += numArith*numNum;
		  }
		}
	  }
  }
  index = Math.floor(Math.random()*10);
  answer = ques[index];
  ques[index] = "_";
  
  const color = colorArray[Math.floor(Math.random()*colorArray.length)];
  if (level >= 1){
	question.innerHTML = ques.toString().replaceAll(',',' ');  
  }
  else {
	text = ''
    for (var i = 0; i < ques.length; i++){
		if (ques[i] == "_"){
//			text += '&emsp;'
			text += '__'
		}
		else {
			text += `<i class="${iconArray[ques[i]%iconArray.length]}" style="color:${color};"></i>`
		}
    }
	question.innerHTML = text;
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
  
  var ca = Math.floor(Math.random()*4);

	if (level >= 1){
	  document.getElementById("A").innerHTML = answer_matrix[0];
	  document.getElementById("B").innerHTML = answer_matrix[1];
	  document.getElementById("C").innerHTML = answer_matrix[2];
	  document.getElementById("D").innerHTML = answer_matrix[3]; 
	  document.getElementById(MCQ[ca]).innerHTML = answer;
	}
	else {
	  answer_matrix = answer_matrix.map(i => i + iconArray.length);
	  document.getElementById("A").innerHTML = `<i class="${iconArray[answer_matrix[0]%iconArray.length]}" style="color:${color};"></i>`;
	  document.getElementById("B").innerHTML = `<i class="${iconArray[answer_matrix[1]%iconArray.length]}" style="color:${color};"></i>`;
	  document.getElementById("C").innerHTML = `<i class="${iconArray[answer_matrix[2]%iconArray.length]}" style="color:${color};"></i>`;
	  document.getElementById("D").innerHTML = `<i class="${iconArray[answer_matrix[3]%iconArray.length]}" style="color:${color};"></i>`;
	  document.getElementById(MCQ[ca]).innerHTML = `<i class="${iconArray[answer%iconArray.length]}" style="color:${color};"></i>`;
	  answer = `<i class="${iconArray[answer%iconArray.length]}" style="color:${color};"></i>`;
	}
  
}

document.getElementById("song").addEventListener("click", function (){
  correct = 0;  error = 0;
  document.getElementById("correct").innerHTML = correct;
  document.getElementById("error").innerHTML = error;
  reward.showReward(correct-error, 5);
});