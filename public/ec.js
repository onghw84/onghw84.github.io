var Mchars = [];
var Echars = [];
var pronounce = [];

Mchars.push(['猫','狗','兔子','老鼠','大象']);
Mchars.push(['鱼','狮子','老虎','蛇','龙']);
Mchars.push(['母鸡','小鸡','马','山羊','公鸡']);
Mchars.push(['猴子','绵羊','火鸡','鸟','牛']);
Mchars.push(['鳄鱼','鸭子','松鼠','熊猫','鹿']);
Mchars.push(['浣熊','斑马','长颈鹿','狐狸','豹']);
Mchars.push(['红','橙','黄','绿','蓝']);
Mchars.push(['紫','黑','白','褐','粉色']);

Echars.push(['Cat','Dog','Rabbit','Mouse','Elephant']);
Echars.push(['Fish','Lion','Tiger','Snake','Dragon']);
Echars.push(['Hen','Chick','Horse','Goat','Rooster']);
Echars.push(['Monkey','Sheep','Turkey','Bird','Cow']);
Echars.push(['Crocodile','Duck','Squirrel','Panda','Deer']);
Echars.push(['Raccoon','Zebra','Giraffe','Fox','Leopard']);
Echars.push(['Red','Orange','Yellow','Green','Blue']);
Echars.push(['Purple','Black','White','Brown','Pink']);

pronounce.push(['http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/C/9JZLN1GNLJHU.mp3','http://img2.tfd.com/pron/mp3/en/US/ds/dsdfskdohs.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/R/1N7XX1YSSDARO.mp3',
'http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/M/1JIIP3SRWPNVO.mp3','http://www.onelook.com/pronounce/macmillan/US/elephant-American-English-pronunciation.mp3']);
pronounce.push(['http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/F/UF46V9JKI1C3.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/L/943VLU0XEKCP.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/T/1SLO2UK0O4O8Q.mp3',
'http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/S/13JX7SANV2MOS.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/D/FYDZB79UCYN4.mp3']);
pronounce.push(['http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/H/1RKFJH8ZH39UR.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/C/1ALA5LI3HI4AD.mp3',
'http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/H/17M07F58Y2LP2.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/G/J9E330JIT905.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/R/1XV7XHW847GK3.mp3']);
pronounce.push(['http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/M/99MVMD8QHNOJ.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/S/1DAU4H9CLEYGQ.mp3',
'http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/T/1DBWITM6M3YBR.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/B/BSE1NMD3GLO8.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/C/1DOYMH2J63BLI.mp3']);
pronounce.push(['http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/C/IC14MF6AG0DJ.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/D/38JNNZV8K51Q.mp3',
'http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/S/NQNSAJJNF7FZ.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/P/I3O1CNG3N9GE.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/D/B0ECUHATMLOV.mp3']);
pronounce.push(['http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/R/17ETNP6IFDATS.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/Z/Y382RNYJRXCB.mp3',
'http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/G/1PAY2K13X09TD.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/F/51VR130BTD8Q.mp3','http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/L/1NNEP2R1NPPIQ.mp3']);
pronounce.push(['','','','','']);
pronounce.push(['','','','','']);

let reward = new Reward();

var Mchars_array = [...Mchars[0]];
var Echars_array = [...Echars[0]];
var pronounce_array = [...pronounce[0]];
var tested = Array(Mchars_array.length).fill(0);
var correct = 0; var error = 0; var answer = 0;
genQues(); genLearn();

document.getElementById("check").style.display = "none";
document.getElementById("A").addEventListener("click", answerHandler)
document.getElementById("B").addEventListener("click", answerHandler)
document.getElementById("C").addEventListener("click", answerHandler)
document.getElementById("D").addEventListener("click", answerHandler)

function answerHandler(){

	var index = Echars_array.indexOf(this.value);
	playSound(index);	

  if (this.value == "Next"){
	genQues();
  }
  else {
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
		document.getElementById("happy").style.display = "block";
		document.getElementById("happy").style.visibility = "visible";
		document.getElementById("sad").style.visibility = "hidden";
		document.getElementById("sad").style.display = "none";      
		document.getElementById("A").value = "Next";
		document.getElementById("B").value = "Next";
		document.getElementById("C").value = "Next";
		document.getElementById("D").value = "Next";
		this.value = answer;
		this.disabled = true;
		
		//update correct/error value		
		correct += 1;      
		document.getElementById("correct").innerHTML = correct;
	  }
  }
  reward.showReward(correct-error, 5);
  return;
}

const setSelect = document.querySelectorAll('input[name="char_set"]');
for (let i = 0; i < setSelect.length; i++) {
  setSelect[i].addEventListener("change", function() {
	document.getElementById("check").style.display = "none";
	document.getElementById("learnSel").disabled = false;
    if (this.value == "MIX"){
		document.getElementById("check").style.display = "flex";
		document.getElementById("playSel").checked = true;	
		document.getElementById("learnSel").disabled = true;
		document.getElementById("learn").style.display = "none";
		document.getElementById("play").style.display = "flex";				
	}
	else{			
      Mchars_array = [...Mchars[this.value-1]];
	  Echars_array = [...Echars[this.value-1]];
	  pronounce_array = [...pronounce[this.value-1]];
    }
	tested = Array(Mchars_array.length).fill(0);	
	genQues(); genLearn();
  });
}

const checkSelect = document.querySelectorAll('input[name="check_set"]');
for (let i = 0; i < checkSelect.length; i++) {
  checkSelect[i].addEventListener("change", function() {
    if (this.checked){
		Mchars_array = [...Mchars_array, ...Mchars[this.value-1]];
		Echars_array = [...Echars_array, ...Echars[this.value-1]];
		pronounce_array = [...pronounce_array, ...pronounce[this.value-1]];
	}
	else {
		var index = Mchars_array.indexOf(Mchars[this.value-1][0]);
		Mchars_array.splice(index, Mchars[this.value-1].length);
		Echars_array.splice(index, Mchars[this.value-1].length);
		pronounce_array.splice(index, Mchars[this.value-1].length);
	}
	tested = Array(Mchars_array.length).fill(0);	
  });
}

const learnSelect = document.querySelectorAll('input[name="learn_play"]');
for (let i = 0; i < learnSelect.length; i++) {
  learnSelect[i].addEventListener("change", function() {
    if (this.value == 1){
      document.getElementById("learn").style.display = "flex";
	  document.getElementById("play").style.display = "none";
    }
	else {
      document.getElementById("learn").style.display = "none";
	  document.getElementById("play").style.display = "flex";		
	}
  })
}

function genLearn(){
	var tmpStrM = '';
	var tmpStrE = '';
	var imgStr = '';
	for (var i=0; i<Mchars_array.length; i++){
		tmpStrM += `<p>${Mchars_array[i]}</p>`;
		tmpStrE += `<p  onclick="playSound(${i})">${Echars_array[i]}<i class="fa fa-play-circle"></i></p>`;
		imgStr +=  `<img src="./public/image/${Echars_array[i]}.jpg"></img>`
	}
	document.getElementById("learnC").innerHTML = tmpStrM;
	document.getElementById("learnE").innerHTML = tmpStrE;
	document.getElementById("limage").innerHTML = imgStr;
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
	document.getElementById("happy").style.display = "block";
	document.getElementById("happy").style.visibility = "hidden";
	document.getElementById("sad").style.visibility = "hidden";
	document.getElementById("sad").style.display = "none";    
  
  var max = Math.max(...tested);
  if (Math.min(...tested) == max){max += 1;}  
  var index = Math.floor(Math.random()*Echars_array.length); 
  while (tested[index] >= max){
    index = Math.floor(Math.random()*Echars_array.length);  
  }
  tested[index] += 1;
  answer = Echars_array[index];
  document.getElementById("character").innerHTML = Mchars_array[index];
  document.getElementById("pimage").innerHTML = `<img src="./public/image/${answer}.jpg"></img>`
  //generate answer
  var rand_answer_index = Math.floor(Math.random()*Echars_array.length);
  if (rand_answer_index == index){rand_answer_index = index + 1 > Echars_array.length-1? index-1:index+1;}
  var answer_matrix_index = [rand_answer_index];
  for (var i = 1; i < 4; i++){
    rand_answer_index = Math.floor(Math.random()*Echars_array.length);
    while (answer_matrix_index.indexOf(rand_answer_index)!=-1 || rand_answer_index == index){
      rand_answer_index = Math.floor(Math.random()*Echars_array.length);
    }
    answer_matrix_index.push(rand_answer_index);
  }
  
  document.getElementById("A").value = Echars_array[answer_matrix_index[0]];
  document.getElementById("B").value = Echars_array[answer_matrix_index[1]];
  document.getElementById("C").value = Echars_array[answer_matrix_index[2]];
  document.getElementById("D").value = Echars_array[answer_matrix_index[3]];
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

function playSound(index){	
  var music = new Audio(pronounce_array[index]);
  music.play();
 }
  
document.getElementById("song").addEventListener("click", function (){
  correct = 0;  error = 0;
  document.getElementById("correct").innerHTML = correct;
  document.getElementById("error").innerHTML = error;
  reward.showReward(correct-error, 5);
});
//document.getElementById('input[name="char_set"]').addEventListener("change", console.log("charset1"));
