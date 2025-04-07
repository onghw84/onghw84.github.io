var Echars = [];
var Echars1 = [];
//var Syllabus = ['A1','A2','A3','A4','E','I','O','U'];
var Syllabus = ['A1','E','I','O','U','B','C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'Y', 'Z'];
var sound = ['/æ/','/ɛ/','/ɪ/','/ɔ/','/ʌ/','/b/','/k/', '/d/', '/f/', '/g/', '/h/', '/dʒ/', '/k/', '/l/', '/m/', '/n/', '/p/', '/r/', '/s/', '/t/', '/v/', '/w/', '/j/', '/z/']
const audio_dir = './public/audio/';

Echars.push(['ad','am','an','as','at','air','ash','ant','angel','apple']);		//a
//Echars.push(['are','art','ask','arch','alpine','alp','altar']);
//Echars.push(['a','about','around','arch','absorb','abdomen','aloud','agree','amaze','amount']);
//Echars.push(['all','always','already','also',]);
Echars.push(['egg','end','ebb','enjoy','enable','exercise','elephant']);	//e
Echars.push(['it','in','is','ill','inch','itch']);		//i
Echars.push(['on','or','ox','owl','old','omen','orange']);	//o
Echars.push(['umbrella','under','udder','ugly','ultra']);		//u
Echars.push(['bee','bed','bob','bun','bat']);	//b
Echars.push(['car','cat','cash','cup','cold']);	//c
Echars.push(['dog','dad','dash','duck','deer']);	//d
Echars.push(['for','fish','five','fun','feed']);	//f
Echars.push(['gun','goat','gain','green','get']);	//g
Echars.push(['ham','hit','hen','hot','hunt']);	//h
Echars.push(['jab','juice','jeep','job','jinx']);	//j
Echars.push(['kiss','key','kind','koala','kick']);	//k
Echars.push(['leaf','leg','leopard','lion','love']);	//l
Echars.push(['men','mob','monkey','mouse','moon']);	//m
Echars.push(['nine','new','nice','now','null']);	//n
Echars.push(['pat','pet','panda','pink','pool']);	//p
Echars.push(['red','ribbon','river','run','rob']);	//r
Echars.push(['six','snow','snake','sand','seven']);	//s
Echars.push(['ten','tree','tiger','tin','three']);	//t
Echars.push(['very','visit','voice','volume','vase']);	//v
Echars.push(['why','will','web','white','water']);	//w
Echars.push(['yes','year','you','yellow','yard']);	//y
Echars.push(['zoo','zero','zip','zebra','zone']);	//z

Echars1.push(['bad','ham','can','has','pat','fair','dash']);
//Echars1.push(['hard','card','balm']);
Echars1.push(['bed','leg','send','web','pet','men','red']);
Echars1.push(['hit','tin','kiss','will','pinch','hitch']);
Echars1.push(['fond','for','fox','fold','cold','hold','gold']);
Echars1.push(['hunt','fun','run','gun','pump']);
Echars1.push(['web','jab','job','rob','mob']);
Echars1.push(['music','panic','logic','magic','topic']);	//c
Echars1.push(['bed','dad','cod','bad','old']);	//d
Echars1.push(['leaf','half','cliff','golf','chef']);	//f
Echars1.push(['big','dog','leg','bag','egg']);	//g
Echars1.push([]);	//h
Echars1.push([]);	//j
Echars1.push(['oak','silk','kick','peak','ark']);	//k
Echars1.push(['pool','ball','bowl','coil','basil']);	//l
Echars1.push(['calm','bloom','bosom','dream','alarm']);	//m
Echars1.push(['run','fun','gun','lion','tin']);	//n
Echars1.push(['up','cup','sheep','cheap','stamp']);	//p
Echars1.push(['car','for','after','mother','computer']);	//r
Echars1.push(['has','is','as','grass','anxious']);	//s
Echars1.push(['pat','pet','cat','hit','get']);	//t
Echars1.push([]);	//v
Echars1.push(['low','claw','crow','crew','new']);	//w
Echars1.push([]);	//y
Echars1.push(['buzz','quiz','geez']);	//z

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
		document.getElementById("syl").innerHTML = `${Syllabus[index][0] + Syllabus[index][0].toLowerCase() + '<br><span style="color:blue">'+sound[index]+'</span>'} <i class="fa fa-play-circle" onclick="playConsonant('${Syllabus[index][0] + Syllabus[index][0].toLowerCase()}')"></i>`;
	}
	else {
		document.getElementById("syl").innerHTML = `${Syllabus[index][0] + Syllabus[index][0].toLowerCase() + '<br><span style="color:blue">' + sound[index]+'</span>'}`;
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
	path = audio_dir+name+'.m4a';
	var music = new Audio(path);
	music.play();
 }

