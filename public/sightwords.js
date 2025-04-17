var Echars = [];
var Echars1 = [];
const sightwords = ['this, is','that, is','the, is','where, is, are','a, an, and','I, am','He, is','She, is','They, are','We, are','do'];
//not, it, to, in, on, of, but, for, his, her, our, my, me, can, here, there, see, go, have, make, play, what, please
const audio_dir = './public/audio/';
const img_dir = './public/image/';
const learnE = document.getElementById("learnE");
var selIndex = 0;

Echars.push(['This is a car.','This is an orange.','This is an apple.','This is a bee.','This is a cat.']);		//this, is
Echars.push(['That is a book.','That is an umbrella.','That is a boat.','That is an ant.','That is a strawberry.']);	//that, is
Echars.push(['The bee is bored.','The bee is hungry.','The bee is angry.','The bee is sad.','The bee is happy.']);		//the, is
Echars.push(['Where is the eraser?','Where is the pen?','Where is the key?','Where are my shoes?','Where are my socks?']);	//where
Echars.push(['An apple and an orange','A cat and a bee','A mouse and a dog','A flower and a leaf','An umbrella and a raincoat']);		//a, an, and
Echars.push(['I am a student.','I am happy.','I am sad.','I am running.','I am Mary.']);		//I, am
Echars.push(['He is a student.','He is happy.','He is running.','He is angry.','He is at school.']);		//he, is
Echars.push(['She is a student','She is happy.','She is jumping.','She is excited.','She is at home.']);		//she, is
Echars.push(['They are students','They are happy.','They are dancing.','They are hungry.','They are at the zoo.']);		//they, are
Echars.push(['We are students','We are happy.','We are dancing.','We are hungry.','We are at the zoo.']);		//we, are
Echars.push(['I do the laundry','Yes, I do.','Where do we go?','Do you like ice cream?','Do you want to play?']);		//do

Echars1.push(['car','orange','apple','bee','cat']);
Echars1.push(['book','umbrella','boat','ant','strawberry']);
Echars1.push(['bored_bee','hungry_bee','angry_bee','sad_bee','happy_bee']);
Echars1.push(['eraser','pen','key','shoes','socks']);
Echars1.push(['appleorange','catbee','mousedog','flowerleaf','umbrellaraincoat']);
Echars1.push(['student_f','happy','sad','running','girl']);
Echars1.push(['student_m','happy','running','angry_m','school']);
Echars1.push(['student_f','happy','jumping','excited','home']);
Echars1.push(['students','happy','dancing','hungry','zoo']);
Echars1.push(['students','happy','dancing','hungry','zoo']);
Echars1.push(['laundry','thumbsup','car','ice cream','play']);

genLearn(0);

//generate select
for (var i = 0; i < sightwords.length; i++){
	selSet.options[selSet.options.length] = new Option(`${sightwords[i]}`,i);
}

selSet.onchange = function() {
	selIndex = this.value;
	genLearn(this.value);
}

function genLearn(index){
	tmpStrE = ''; tmpStrE1 = ''; tmpStrhl = '';
	for (var i=0; i<Echars[index].length; i++){
		tmpStrE += `<p  onclick="playSound(0,${index},${i})">${Echars[index][i]}<i class="fa fa-play-circle"></i></p>`;		
	}
	for (var i=0; i<Echars1[index].length; i++){
		tmpStrE1 += `<img src="${img_dir+Echars1[index][i]+".jpg"}"></img>`;
	}
	learnE.innerHTML = tmpStrE;
	document.getElementById("learnE1").innerHTML = tmpStrE1;

	const swArray = sightwords[index].split(", ");
	for (var i=0; i < swArray.length; i++){
		tmpStrhl += `<p  onclick="playSound(1,${index},${i})">${swArray[i]}<i class="fa fa-play-circle"></i></p>`;		
	}		
	document.getElementById("highlight").innerHTML = tmpStrhl;
}

function playSound(list,listi,index){	
	var path;
	if (list == 0){
		path = audio_dir+Echars[listi][index].toLowerCase().replace(/[\,|\.|\?|\!]/g,'')+'.mp3';}
	else{
		const swArray = sightwords[listi].split(", ");
		path = audio_dir+swArray[index].toLowerCase()+'.mp3';
		highlight(swArray[index]);
	}
  var music = new Audio(path);
  music.play();
 }
 
 function playConsonant(name){	
	path = audio_dir+name+'.m4a';
	var music = new Audio(path);
	music.play();
 }

function highlight(word){
	//reset 
	tmpStrE = ''; 
	for (var i=0; i<Echars[selIndex].length; i++){
		tmpStrE += `<p  onclick="playSound(0,${selIndex},${i})">${Echars[selIndex][i]}<i class="fa fa-play-circle"></i></p>`;		
	}
	learnE.innerHTML = tmpStrE;
	var lc = learnE.children;
	for (var i = 0; i < lc.length; i++){
		var text = lc[i].innerHTML.slice(0,-33);
		let regex = new RegExp(`\\b${word}\\b`, 'gi');
		let match = [...text.matchAll(regex)];
		for (var j = match.length-1; j >= 0; j--){
			text = text.slice(0,match[j].index).concat(`<span class="highlight">${text.slice(match[j].index,match[j].index+word.length)}</span>`,text.slice(match[j].index+word.length)).concat(lc[i].innerHTML.slice(text.length));
		}
		lc[i].innerHTML = text;
	}
}