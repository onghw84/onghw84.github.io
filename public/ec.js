var Mchars = [];
var Echars = [];
const audio_dir = './public/audio/';

Mchars.push(['猫','狗','兔子','老鼠','大象']);
Mchars.push(['鱼','狮子','老虎','蛇','龙']);
Mchars.push(['母鸡','小鸡','马','山羊','公鸡']);
Mchars.push(['猴子','绵羊','鸭子','鸟','牛']);
Mchars.push(['云','花','叶子','石头','水']);
Mchars.push(['沙子','树','草','山','河']);
Mchars.push(['红','橙','黄','绿','蓝']);
Mchars.push(['紫','黑','白','褐','粉色']);
Mchars.push(['鳄鱼','火鸡','松鼠','熊猫','鹿']);
Mchars.push(['浣熊','斑马','长颈鹿','狐狸','豹']);

Echars.push(['Cat','Dog','Rabbit','Mouse','Elephant']);
Echars.push(['Fish','Lion','Tiger','Snake','Dragon']);
Echars.push(['Hen','Chick','Horse','Goat','Rooster']);
Echars.push(['Monkey','Sheep','Duck','Bird','Cow']);
Echars.push(['Cloud','Flower','Leaf','Stone','Water']);
Echars.push(['Sand','Tree','Grass','Mountain','River']);
Echars.push(['Red','Orange','Yellow','Green','Blue']);
Echars.push(['Purple','Black','White','Brown','Pink']);
Echars.push(['Crocodile','Turkey','Squirrel','Panda','Deer']);
Echars.push(['Raccoon','Zebra','Giraffe','Fox','Leopard']);

Mchars.push(['一','二','三','四','五']);
Mchars.push(['六','七','八','九','十']);
Mchars.push(['十一','十二','十三','十四','十五']);
Mchars.push(['十六','十七','十八','十九','二十']);
Mchars.push(['屋子','车子','风扇','电脑','手机']);
/*Mchars.push(['三十','四十','五十','六十','七十']);
Mchars.push(['八十','九十','百','千','百万']);*/

Echars.push(['One','Two','Three','Four','Five']);
Echars.push(['Six','Seven','Eight','Nine','Ten']);
Echars.push(['Eleven','Twelve','Thirteen','Fourteen','Fifteen']);
Echars.push(['Sixteen','Seventeen','Eighteen','Nineteen','Twenty']);
Echars.push(['House','Car','Fan','Computer','Handphone']);
/*Echars.push(['Thirty','Fourty','Fifty','Sixty','Seventy']);
Echars.push(['Eighty','Ninety','Hundred','Thousand','Million']);*/

let reward = new Reward();

var Mchars_array = [...Mchars[0]];
var Echars_array = [...Echars[0]];
var tested = Array(Mchars_array.length).fill(0);
var correct = 0; var error = 0; var answer = 0;
genQues(); genLearn();

document.getElementById("check").style.display = "none";
document.getElementById("A").addEventListener("click", answerHandler)
document.getElementById("B").addEventListener("click", answerHandler)
document.getElementById("C").addEventListener("click", answerHandler)
document.getElementById("D").addEventListener("click", answerHandler)

function answerHandler(){

  if (this.value == "Next"){
	genQues();
  }
  else {
		var index = Echars_array.indexOf(this.value);
		playSound(index);		
	  if (answer != this.value){
		this.style.backgroundColor = "orange";
		this.value = this.value + '-'+Mchars_array[index];
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
	}
	else {
		var index = Mchars_array.indexOf(Mchars[this.value-1][0]);
		Mchars_array.splice(index, Mchars[this.value-1].length);
		Echars_array.splice(index, Mchars[this.value-1].length);
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
		imgStr +=  `<img src="./public/image/${Echars_array[i].toLowerCase()}.jpg"></img>`
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
  document.getElementById("pimage").innerHTML = `<img src="./public/image/${answer.toLowerCase()}.jpg"></img>`
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
  const path = audio_dir+Echars_array[index].toLowerCase()+'.mp3';
  var music = new Audio(path);
  music.play();
 }
  
document.getElementById("song").addEventListener("click", function (){
  correct = 0;  error = 0;
  document.getElementById("correct").innerHTML = correct;
  document.getElementById("error").innerHTML = error;
  reward.showReward(correct-error, 5);
});
//document.getElementById('input[name="char_set"]').addEventListener("change", console.log("charset1"));
