const audio_dir = './public/audio/pinyin/';
const card = document.getElementById("card");
var line = 0;
document.getElementById("prev-btn").addEventListener("click", prevHandler)
document.getElementById("next-btn").addEventListener("click", nextHandler)

var category = [];
category.push('拯救蒲公英','我不再自私','猫头鹰睡不着','白色的小猫头鹰','一只懒惰的小蜜蜂','月亮种子','坚持尝试的小兔','小花猫种向日葵','在月亮上住过的小猫','彩色的小象');

var story = stories[0];

var selSet = document.getElementById("selSet");
selSet.options[selSet.options.length] = new Option(`选择故事`,0);
//generate select
for (var i = 0; i < category.length; i++){
	selSet.options[selSet.options.length] = new Option(`Story ${i+1} - ${category[i]}`,i+1);
}

selSet.onchange = function() {
    story = stories[this.value-1];	
	line = 0;
	dispHandler();
}


function nextHandler() {  
	line += 1;
	dispHandler();
};

function prevHandler() {  
	line -= 1;
	dispHandler();
};

function dispHandler() {  
	var tmpStr = '';
	for (var i=0; i< story[line].length; i++){
		if (story[line][i] == "\n"){
			tmpStr += `<div class="break"></div>`;
		}
		else {
			tmpStr += `<p  onclick="highlight(this); playaudio('${story[line][i]}')">${story[line][i]}</p>`;
		}
	}
	card.innerHTML = tmpStr;	
	return;
};

function highlight(el){
	el.style.color = "red";
}

function playaudio(input){
	index = cchar.indexOf(input);
	if (index != -1){
		pinput = pinyin[index];
		path = audio_dir+convertsound(pinput)+'.mp3';
		//console.log(path);
		var music = new Audio(path);
		music.play();
	}
	else {
		console.log(`new word - ${input}`)
		return;
	}
}

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