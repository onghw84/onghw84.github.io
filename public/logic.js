var correct = 0;
var error = 0;
const iconArray = ["fa fa-cloud","fa fa-circle","fa fa-leaf","fa fa-paw","fa fa-star","fa fa-tree","fa fa-subway","fa fa-train","fa fa-plane","fa fa-bell","fa fa-coffee","fa fa-heart","fa fa-gift","fa fa-umbrella","fa fa-circle"]
const colorArray = ["orange","orangered","blue","pink","green","red","peru","purple"]
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
  if (answer != this.value){
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

  var rep = Math.floor(Math.random()*3);
  var repArith = Math.floor((Math.random()-0.5)*2);
  var repStart = Math.floor(Math.random()*2);
  const repNum = Math.floor((Math.random()-0.5)*4);
  var numNum = Math.floor((Math.random()-0.5)*4);
  var numArith = Math.floor((Math.random()-0.5)*2);
  var iniNum = Math.floor(Math.random()*10);  
  var repIniNum = Math.floor(Math.random()*2);
  var ques = [];
  if (rep == 0){
    repStart = 0;
    if (numNum == 0){
      numNum = Math.ceil(Math.random()*4);
    }
    if (numArith == 0){
      numArith = 1;
    }        
  }

  if (level == 0){
    repArith = 0; numArith = 0;
  }  
  if (level == 1){
    numArith = 0;
  }    
  if (level == 2){
    rep = 0;
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
  //const ques = [1,2,3,4,5,6,7,8,9,10];
  index = Math.floor(Math.random()*10);
  answer = ques[index];
  ques[index] = "_";
  question.innerHTML = ques.toString().replaceAll(',',' ');

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
}

document.getElementById("song").addEventListener("click", function (){
  correct = 0;  error = 0;
  document.getElementById("correct").innerHTML = correct;
  document.getElementById("error").innerHTML = error;
  reward.showReward(correct-error, 5);
});