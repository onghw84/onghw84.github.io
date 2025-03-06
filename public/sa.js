var correct = 0;
var error = 0;
const iconArray = ["fa fa-cloud","fa fa-circle","fa fa-leaf","fa fa-paw","fa fa-star","fa fa-tree","fa fa-subway","fa fa-train","fa fa-plane","fa fa-bicycle","fa fa-bell","fa fa-coffee","fa fa-heart","fa fa-gift","fa fa-umbrella","fa fa-circle"]
const colorArray = ["orange","orangered","blue","pink","green","red","peru","purple","indigo"]
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
genQues();

function answerHandler(){
  if (this.value == "Next"){
    genQues();
  }
  else {
    if (answer != this.value){
      this.style.backgroundColor = "orange";
      document.getElementById("sad").style.display = "block";
      document.getElementById("sad").style.visibility = "visible";
      document.getElementById("happy").style.visibility = "hidden";
      document.getElementById("happy").style.display = "none";
      //update correct/error value
      error += 1;
      document.getElementById("error").innerHTML = error;
      if (correct-error < 5){
        document.getElementById("cat1").style.visibility = "hidden";}
      if (correct-error < 10){
        document.getElementById("cat2").style.visibility = "hidden";}
      if (correct-error < 15){
        document.getElementById("cat3").style.visibility = "hidden";}
      if (correct-error < 20){
        document.getElementById("cat4").style.visibility = "hidden";}
      if (correct-error < 25){
        document.getElementById("cat5").style.visibility = "hidden";}
      if (correct-error < 30){
        document.getElementById("cat6").style.visibility = "hidden";}
      if (correct-error < 35){
        document.getElementById("cat7").style.visibility = "hidden";}
      if (correct-error < 40){
        document.getElementById("cat8").style.visibility = "hidden";}
      if (correct-error < 45){
        document.getElementById("song").style.visibility = "hidden";}      
    }
    else {
      document.getElementById("happy").style.display = "block";
      document.getElementById("happy").style.visibility = "visible";
      document.getElementById("sad").style.visibility = "hidden";
      document.getElementById("sad").style.display = "none";
      //change button value to next
      document.getElementById("A").value = "Next";
      document.getElementById("B").value = "Next";
      document.getElementById("C").value = "Next";
      document.getElementById("D").value = "Next";
      //update correct/error value
      correct += 1;      
      document.getElementById("correct").innerHTML = correct;

      //award
      if (correct-error >= 5){
        document.getElementById("cat1").style.visibility = "visible";
      }
      if (correct-error >= 10){
        document.getElementById("cat2").style.visibility = "visible";
      }
      if (correct-error >= 15){
        document.getElementById("cat3").style.visibility = "visible";
      }
      if (correct-error >= 20){
        document.getElementById("cat4").style.visibility = "visible";
      }
      if (correct-error >= 25){
        document.getElementById("cat5").style.visibility = "visible";
      }
      if (correct-error >= 30){
        document.getElementById("cat6").style.visibility = "visible";
      }
      if (correct-error >= 35){
        document.getElementById("cat7").style.visibility = "visible";
      }
      if (correct-error >= 40){
        document.getElementById("cat8").style.visibility = "visible";
      }
      if (correct-error >= 45){
        document.getElementById("song").style.visibility = "visible";
      }
      return;
    }
  }
}

function genQues(){
  //reset view
  document.getElementById("happy").style.visibility = "hidden";
  document.getElementById("sad").style.visibility = "hidden";
  document.getElementById("A").style.backgroundColor = "greenyellow";
  document.getElementById("B").style.backgroundColor = "greenyellow";
  document.getElementById("C").style.backgroundColor = "greenyellow";
  document.getElementById("D").style.backgroundColor = "greenyellow";

  const num1 = Math.floor(Math.random()*20);
  const num2 = Math.floor(Math.random()*20);
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
