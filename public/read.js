var Echars = [];
var Echars1 = [];
//var Syllabus = ['A1','A2','A3','A4','E','I','O','U'];
var Syllabus = ['A1','E','I','O','U','B','C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const audio_dir = './public/audio/';

Echars.push(['ad','am','an','as','at','air','ash','ant','angel','apple']);
//Echars.push(['are','art','ask','arch','alpine','alp','altar']);
//Echars.push(['a','about','around','arch','absorb','abdomen','aloud','agree','amaze','amount']);
//Echars.push(['all','always','already','also',]);
Echars.push(['egg','end','ebb','enjoy','enable','exercise','elephant']);
Echars.push(['it','in','is','ill','inch','itch']);
Echars.push(['on','or','ox','owl','old','omen','orange']);
Echars.push(['umbrella','under','udder','ugly','ultra']);
Echars.push(['bee','bed','bob','bun','bat']);

Echars1.push(['bad','ham','can','has','pat','fair','dash']);
//Echars1.push(['hard','card','balm']);
Echars1.push(['bed','leg','send','web','pet','men','red']);
Echars1.push(['hit','tin','kiss','will','pinch','hitch']);
Echars1.push(['fond','for','fox','fold','cold','hold','gold']);
Echars1.push(['hunt','fun','run','gun','pump']);
Echars1.push(['web','jab','job','rob','mob']);

genLearn(0);

//generate select
for (var i = 0; i < Syllabus.length; i++){
	selSet.options[selSet.options.length] = new Option(`${Syllabus[i]}`,i);
}

selSet.onchange = function() {
	genLearn(this.value);
}

function genLearn(index){
	tmpStrE = ''; tmpStrE1 = ''; tmpStrE2 = '';
	for (var i=0; i<Echars[index].length; i++){
		//tmpStrE += `<p  onclick="playSound(${index},${i})">${Echars[index][i]}<i class="fa fa-play-circle"></i></p>`;
		tmpStrE += `<p  onclick="playSound(0,${index},${i})"><span style="color:red">${Echars[index][i][0]}</span><span>${Echars[index][i].slice(1)}</span><i class="fa fa-play-circle"></i></p>`;		
	}
	for (var i=0; i<Echars1[index].length; i++){
		if (index < 5){
			tmpStrE1 += `<p  onclick="playSound(1,${index},${i})"><span>${Echars1[index][i][0]}</span><span style="color:red">${Echars1[index][i][1]}</span><span>${Echars1[index][i].slice(2)}</span><i class="fa fa-play-circle"></i></p>`;
		}
		else {
			tmpStrE1 += `<p  onclick="playSound(1,${index},${i})"><span>${Echars1[index][i].slice(0,Echars1[index][i].length-1)}</span><span style="color:red">${Echars1[index][i][Echars1[index][i].length-1]}</span><i class="fa fa-play-circle"></i></p>`;
		}
	}
	if (index >= 5){
		document.getElementById("syl").innerHTML = `${Syllabus[index][0] + Syllabus[index][0].toLowerCase()} <i class="fa fa-play-circle" onclick="playConsonant('${Syllabus[index][0] + Syllabus[index][0].toLowerCase()}')"></i>`;
	}
	else {
		document.getElementById("syl").innerHTML = `${Syllabus[index][0] + Syllabus[index][0].toLowerCase()}`;
	}
	document.getElementById("learnE").innerHTML = tmpStrE;
	document.getElementById("learnE1").innerHTML = tmpStrE1;
}

function playSound(list,listi,index){	
	var path;
	if (list == 0){
		path = audio_dir+Echars[listi][index].toLowerCase()+'.mp3';}
	else if (list == 1){
		path = audio_dir+Echars1[listi][index].toLowerCase()+'.mp3';}
	else{
		path = audio_dir+Echars2[listi][index].toLowerCase()+'.mp3';}
  var music = new Audio(path);
  music.play();
 }
 
 function playConsonant(name){	
	path = audio_dir+name.toLowerCase()+'.m4a';
	var music = new Audio(path);
	music.play();
 }

