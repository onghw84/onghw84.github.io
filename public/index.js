const chars1 = cchar.slice(0,100);
const chars2 = cchar.slice(100,200);
const chars3 = cchar.slice(200,400);

const pinyin1 = pinyin.slice(0,100);
const pinyin2 = pinyin.slice(100,200);
const pinyin3 = pinyin.slice(200,400);

//const sound1 = new Array(chars1.length).fill(0).map((e,i) => {return i});
let reward = new Reward();
const audio_dir = './public/audio/pinyin/';

var chars_array = chars1.split("");
var pinyin_array = [...pinyin1];
var tested = Array(chars_array.length).fill(0);
var total = 0;

document.getElementById("next-btn").addEventListener("click", nextHandler)
document.getElementById("error-btn").addEventListener("click", errorHandler)
document.getElementById("learn").innerHTML = chars1.length + chars2.length + chars3.length;
const character = document.getElementById("character");
const count = document.getElementById("count");
const pinyinh = document.getElementById("pinyin");
const totalD = document.getElementById("total");

const setSelect = document.querySelectorAll('input[name="char_set"]');
for (let i = 0; i < setSelect.length; i++) {
  setSelect[i].addEventListener("change", function() {
    if (this.value == 0){
      chars_array = newChar.split("");
      pinyin_array = [...pinyin_new];
    }
    else if (this.value == 1){
      chars_array = chars1.split("");
      pinyin_array = [...pinyin1];
    }
    else if (this.value == 2){
      chars_array = chars2.split("");
      pinyin_array = [...pinyin2];
    }
    else {
      chars_array = chars3.split("");
      pinyin_array = [...pinyin3];
    }     
    tested = Array(chars_array.length).fill(0);
    nextHandler();	
  });
}

function nextHandler() {  
  var index = Math.floor(Math.random()*chars_array.length);
  var max = Math.max(...tested);
  if (Math.min(...tested) == max){max += 1;}
  while (tested[index] >= max){
    index = Math.floor(Math.random()*chars_array.length);  
  }
  character.innerText = chars_array[index];
  
  count.innerText = tested[index]+1;
  if (index <= pinyin_array.length){
    pinyinh.style.visibility = "visible";
    pinyinh.innerText = pinyin_array[index];
	character.onclick = function(){
	  playaudio(pinyin_array[index])
	}	
  }
  else {pinyinh.style.visibility = "hidden";}
  tested[index] += 1;
  total += 1;
  totalD.innerHTML = total;

  reward.showReward(total, 30);
  return;
};

function errorHandler() {	
  var index = chars_array.indexOf(character.innerText);
  tested[index] -= 2; total -= 1;
  nextHandler();
  return;
};

document.getElementById("song").addEventListener("click", function (){
  total = 0;  
  totalD.innerHTML = total;
  reward.showReward(total, 30);
});

function convertsound(input) {
	var accent = 0;
	if (input.match(/[āēīōū]/g)){
		accent = 1;
	}
	else if (input.match(/[áéíóúǘ]/g)){
		accent = 2;
	}
	else if (input.match(/[ǎěǐǒǔǚ]/g)){
		accent = 3;
	}
	else if (input.match(/[àèìòùǜ]/g)){
		accent = 4;
	}
	
	input = input.replace(/[āáǎà]/g, "a");
	input = input.replace(/[ēéěè]/g, "e");
	input = input.replace(/[īíǐì]/g, "i");
	input = input.replace(/[ōóǒò]/g, "o");
	input = input.replace(/[ūúǔù]/g, "u");
	input = input.replace(/[ǜǚǘ]/g, "v");
	if (accent == 0){
		return input;
	}
	else {return input+accent;}
}

function playaudio(name){
	path = audio_dir+convertsound(name)+'.mp3';
	var music = new Audio(path);
	music.play();
}

