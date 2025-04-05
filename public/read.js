var Echars = [];
var Syllabus = ['A1','A2','A3','A4','E','I','O','U'];
const audio_dir = './public/audio/';

Echars.push(['ad','am','an','as','at','air','ant','ash','angel','angry','apple','anxious','ambush','animal']);
Echars.push(['are','art','ask','arch','alpine','alp','altar']);
Echars.push(['a','about','around','arch','absorb','abdomen','aloud','agree','amaze','amount']);
Echars.push(['all','always','already','also',]);
Echars.push(['Ed','Egg','End','Enjoy','Enable','Excuse','Exercise']);
Echars.push(['It','In','Is','Ill','Inch','Itch']);
Echars.push(['Old','Omen','Orange']);
Echars.push(['Umbrella']);

genLearn(0);

//generate select
for (var i = 0; i < Syllabus.length; i++){
	selSet.options[selSet.options.length] = new Option(`${Syllabus[i]}`,i);
}

selSet.onchange = function() {
	genLearn(this.value);
}

function genLearn(index){
	tmpStrE = '';
	for (var i=0; i<Echars[index].length; i++){
		//tmpStrE += `<p  onclick="playSound(${index},${i})">${Echars[index][i]}<i class="fa fa-play-circle"></i></p>`;
		tmpStrE += `<p  onclick="playSound(${index},${i})"><span style="color:red">${Echars[index][i][0]}</span><span>${Echars[index][i].slice(1)}</span><i class="fa fa-play-circle"></i></p>`;
	}
	document.getElementById("syl").innerHTML = Syllabus[index][0] + Syllabus[index][0].toLowerCase();
	document.getElementById("learnE").innerHTML = tmpStrE;
}

function playSound(list,index){	
  const path = audio_dir+Echars[list][index].toLowerCase()+'.mp3';
  var music = new Audio(path);
  music.play();
 }

