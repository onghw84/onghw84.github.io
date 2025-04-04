var Mchars = [];
var Echars = [];
const audio_dir = './public/audio/';
const reward_dir = './public/reward/';
const happyImg = ["happybee1.jpg","happybee2.jpg","happybee3.jpg","happybee4.jpg","happybee5.jpg","happybee6.jpg","happycat1.jpg","happycat2.jpg","happycat3.jpg","happycat4.jpg","happycat5.jpg","happycat6.jpg"];

Mchars.push(['猫','狗','兔子','老鼠','大象','鱼','狮子','老虎','蛇','龙']);
Mchars.push(['红','橙','黄','绿','蓝','紫','黑','白','褐','粉色']);
Mchars.push(['母鸡','小鸡','马','山羊','公鸡']);
Mchars.push(['云','花','叶子','石头','水','雪','彩虹','天使','太阳','月亮']);
Mchars.push(['彩带','爱心','蝴蝶','妖怪','蜻蜓']);
Mchars.push(['沙子','树','草','山','河']);
Mchars.push(['一','二','三','四','五']);
Mchars.push(['椰子','苹果','橙子','糖','雪糕']);
Mchars.push(['六','七','八','九','十']);
Mchars.push(['十一','十二','十三','十四','十五']);
Mchars.push(['十六','十七','十八','十九','二十']);
Mchars.push(['樱桃','蓝莓','龙眼','桃子','香蕉']);
Mchars.push(['葡萄','木瓜','西瓜','草莓','波罗蜜']);
Mchars.push(['猴子','绵羊','鸭子','鸟','牛']);
Mchars.push(['鳄鱼','火鸡','松鼠','熊猫','鹿']);
Mchars.push(['浣熊','斑马','长颈鹿','狐狸','豹']);

Echars.push(['Cat','Dog','Rabbit','Mouse','Elephant','Fish','Lion','Tiger','Snake','Dragon']);
Echars.push(['Red','Orange','Yellow','Green','Blue','Purple','Black','White','Brown','Pink']);
Echars.push(['Hen','Chick','Horse','Goat','Rooster']);
Echars.push(['Cloud','Flower','Leaf','Stone','Water','Snow','Rainbow','Angel','Sun','Moon']);
Echars.push(['Ribbon','Love','Butterfly','Demon','Dragonfly']);
Echars.push(['Sand','Tree','Grass','Mountain','River']);
Echars.push(['One','Two','Three','Four','Five']);
Echars.push(['Coconut','Apple','Orange','Candy','Ice cream']);
Echars.push(['Six','Seven','Eight','Nine','Ten']);
Echars.push(['Eleven','Twelve','Thirteen','Fourteen','Fifteen']);
Echars.push(['Sixteen','Seventeen','Eighteen','Nineteen','Twenty']);
Echars.push(['Cherry','Blueberry','Longan','Peach','Banana']);
Echars.push(['Grape','Papaya','Watermelon','Strawberry','Jackfruit']);
Echars.push(['Monkey','Sheep','Duck','Bird','Cow']);
Echars.push(['Crocodile','Turkey','Squirrel','Panda','Deer']);
Echars.push(['Raccoon','Zebra','Giraffe','Fox','Leopard']);


/*Mchars.push(['屋子','船','风扇','电脑','手机']);
Mchars.push(['三十','四十','五十','六十','七十']);
Mchars.push(['八十','九十','百','千','百万']);
Mchars.push(['鼻子','眼睛','嘴巴','耳朵','眉毛']);
Mchars.push(['手','腋下','手指','肚子','胸膛']);
Mchars.push(['膝盖','脚','大腿','脚趾','脚板']);
Mchars.push(['头发','眼睫毛','屁股','脚跟','小腿']);
Mchars.push(['自行车','车子','罗里','火车','巴士']);
Mchars.push(['衣服','鞋子','睡衣','裙子','衬衫']);

*/


/*Echars.push(['House','Boat','Fan','Computer','Handphone']);
Echars.push(['Thirty','Fourty','Fifty','Sixty','Seventy']);
Echars.push(['Eighty','Ninety','Hundred','Thousand','Million']);
Echars.push(['Nose','Eye','Mouth','Ear','Eyebrow']);
Echars.push(['Hand','Armpit','Finger','Stomach','Chest']);
Echars.push(['Knee','Leg','Thigh','Toe','Foot']);
Echars.push(['Hair','Eyelash','Buttock','Heel','Calf']);
Echars.push(['Bicycle','Car','Lorry','Train','Bus']);
Echars.push(['Clothes','Shoes','Pyjama','Skirt','Shirt']);

*/

let reward = new Reward();

var Mchars_array = [...Mchars[0]];
var Echars_array = [...Echars[0]];
var tested = Array(Mchars_array.length).fill(0);
var correct = 0; var error = 0; var answer = 0;
var check = document.getElementById("check");
//generate Checkbox
var text = ""
for (var i = 0; i < Echars.length; i++){
	text += `<input type="checkbox" id="check${i+1}" name="check_set" value="${i+1}">`
	text += `<label for="check${i+1}">SET ${i+1}</label>`
}
check.innerHTML = text;

genQues(); genLearn();

check.style.display = "none";
document.getElementById("A").addEventListener("click", answerHandler)
document.getElementById("B").addEventListener("click", answerHandler)
document.getElementById("C").addEventListener("click", answerHandler)
document.getElementById("D").addEventListener("click", answerHandler)
var selSet = document.getElementById("selSet");
//generate select
for (var i = 0; i < Echars.length; i++){
	selSet.options[selSet.options.length] = new Option(`SET ${i+1}`,i+1);
}
selSet.options[selSet.options.length] = new Option('MIX','MIX');

function answerHandler(){

  if (this.value == "Next"){
	genQues();
  }
  else {
		var index = Echars_array.indexOf(this.value);
		var index1 = Echars_array.indexOf(answer);
		playSound(index);		
	  if (answer != this.value){
		this.style.backgroundColor = "orange";
		this.value = this.value + '-'+Mchars_array[index];
		document.getElementById("sad").style.display = "block";
		document.getElementById("sad").style.visibility = "visible";
		document.getElementById("happy").style.visibility = "hidden";
		document.getElementById("happy").style.display = "none";
		//update correct/error value
		error += 1;
		document.getElementById("error").innerHTML = error;   
		tested[index1] -= 1; tested[index] -= 1;
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
		var errCount = 0;
		if (document.getElementById("A").style.backgroundColor == "orange"){errCount += 1;}
		if (document.getElementById("B").style.backgroundColor == "orange"){errCount += 1;}
		if (document.getElementById("C").style.backgroundColor == "orange"){errCount += 1;}
		if (document.getElementById("D").style.backgroundColor == "orange"){errCount += 1;}
		if (errCount == 3){
			document.getElementById("happy").style.visibility = "hidden";
		}
		else {
			correct += 1;   
			if (errCount == 0){tested[index] += 1;}
			document.getElementById("correct").innerHTML = correct;
		}
	  }
  }
  reward.showReward(correct-error, 5);
  return;
}

/*
const setSelect = document.querySelectorAll('input[name="char_set"]');
for (let i = 0; i < setSelect.length; i++) {
  setSelect[i].addEventListener("change", function() {
	check.style.display = "none";
	document.getElementById("learnSel").disabled = false;
    if (this.value == "MIX"){
		check.style.display = "flex";
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
}*/

selSet.onchange = function() {
	check.style.display = "none";
	document.getElementById("learnSel").disabled = false;
    if (this.value == "MIX"){
		check.style.display = "flex";
		document.getElementById("playSel").checked = true;	
		document.getElementById("learnSel").disabled = true;
		document.getElementById("learn").style.display = "none";
		document.getElementById("check1").checked = true;
		document.getElementById("play").style.display = "flex";				
	}
	else{			
      Mchars_array = [...Mchars[this.value-1]];
	  Echars_array = [...Echars[this.value-1]];
    }
	tested = Array(Mchars_array.length).fill(0);	
	genQues(); genLearn();
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
		genQues();
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
  console.log(tested);
	document.getElementById("happy").src = reward_dir + happyImg[Math.floor(Math.random()*happyImg.length)];	
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
  
/*  var max = Math.max(...tested);
  if (Math.min(...tested) == max){max += 1;}  
  var index = Math.floor(Math.random()*Echars_array.length); 
  while (tested[index] >= max){
    index = Math.floor(Math.random()*Echars_array.length);  
  }*/
  var minArray = []; var minNum = Math.min(...tested);
  tested.forEach((el,index)=> {if (el == minNum){minArray.push(index)}});
  var index = minArray[Math.floor(Math.random()*minArray.length)];
    
  //tested[index] += 1;
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
