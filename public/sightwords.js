var Echars = [];
var Echars1 = [];
//var Syllabus = ['A1','A2','A3','A4','E','I','O','U'];
var Syllabus = ['this, is','that, is','the, is','where','a, an, and'];
var sound = ['This, is','That, is','The, is','Where','a, an, and','/b/','/k/', '/d/', '/f/', '/g/', '/h/', '/dʒ/', '/k/', '/l/', '/m/', '/n/', '/p/', '/r/', '/s/', '/t/', '/v/', '/w/', '/j/', '/z/']
const audio_dir = './public/audio/';
const img_dir = './public/image/';

Echars.push(['This is a car.','This is an orange.','This is an apple.','This is a bee.','This is a cat.']);		//this, is
Echars.push(['That is a book.','That is an umbrella.','That is a boat.','That is an ant.','That is a strawberry.']);	//that, is
Echars.push(['The bee is bored.','The bee is hungry.','The bee is angry.','The bee is sad.','The bee is happy.']);		//the, is
Echars.push(['Where is the eraser?','Where is the pen?','Where is the key?','Where are my shoes?','Where are my socks?']);	//where
Echars.push(['An apple and an orange.','A cat and a bee.','A mouse and a dog.','A flower and a leaf.','An umbrella and a raincoat.']);		//a, an, and


Echars1.push(['car','orange','apple','bee','cat']);
Echars1.push(['book','umbrella','boat','ant','strawberry']);
Echars1.push(['bored_bee','hungry_bee','angry_bee','sad_bee','happy_bee']);
Echars1.push(['eraser','pen','key','shoes','socks']);
Echars1.push(['appleorange','catbee','mousedog','flowerleaf','umbrellaraincoat']);

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
		tmpStrE += `<p  onclick="playSound(0,${index},${i})">${Echars[index][i]}<i class="fa fa-play-circle"></i></p>`;		
	}
	for (var i=0; i<Echars1[index].length; i++){
		tmpStrE1 += `<img src="${img_dir+Echars1[index][i]+".jpg"}"></img>`;
	}
	document.getElementById("learnE").innerHTML = tmpStrE;
	document.getElementById("learnE1").innerHTML = tmpStrE1;
}

function playSound(list,listi,index){	
	var path;
	if (list == 0){
		path = audio_dir+Echars[listi][index].toLowerCase().slice(0,-1)+'.mp3';}
	else if (list == 1){
		path = audio_dir+Echars1[listi][index].toLowerCase().slice(0,-1)+'.mp3';}
	else{
		path = audio_dir+Echars2[listi][index].toLowerCase().slice(0,-1)+'.mp3';}
  var music = new Audio(path);
  music.play();
 }
 
 function playConsonant(name){	
	path = audio_dir+name+'.m4a';
	var music = new Audio(path);
	music.play();
 }

