const audio_dir = './public/audio/piano/';
const keys = document.querySelectorAll("[data-note]");
var music = Array(keys.length);
var keyArray = Array(keys.length);
var sheet = document.getElementById("sheet");
var playing = Array(keys.length).fill(0);
var count = 0;
var selectedSong = 0;
const sheetLen = 8;
const altNames = {'A#0': 'Bb0','C#1': 'Db1','D#1': 'Eb1','F#1': 'Gb1','G#1': 'Ab1','A#1': 'Bb1','C#2': 'Db2','D#2': 'Eb2','F#2': 'Gb2','G#2': 'Ab2','A#2': 'Bb2','C#3': 'Db3',
  'D#3': 'Eb3','F#3': 'Gb3','G#3': 'Ab3','A#3': 'Bb3','C#4': 'Db4','D#4': 'Eb4','F#4': 'Gb4','G#4': 'Ab4','A#4': 'Bb4','C#5': 'Db5','D#5': 'Eb5','F#5': 'Gb5','G#5': 'Ab5',
  'A#5': 'Bb5','C#6': 'Db6','D#6': 'Eb6','F#6': 'Gb6','G#6': 'Ab6','A#6': 'Bb6','C#7': 'Db7','D#7': 'Eb7','F#7': 'Gb7','G#7': 'Ab7','A#7': 'Bb7'};

const sheets = [
["C2/1", "C2/1", "G2/1", "G2/1", "A2/1", "A2/1", "G2/2", "F2/1", "F2/1", "E2/1", "E2/1", "D2/1", "D2/1", "C2/2", "G2/1", "G2/1", "F2/1", "F2/1", "E2/1", "E2/1", "D2/2", "G2/1", "G2/1", "F2/1", "F2/1",
 "E2/1", "E2/1", "D2/2", "C2/1", "C2/1", "G2/1", "G2/1", "A2/1", "A2/1", "G2/2", "F2/1", "F2/1", "E2/1", "E2/1", "D2/1", "D2/1", "C2/2"],
["G2/1","E2/1","E2/2","F2/1","D2/1","D2/2","C2/1","D2/1","E2/1","F2/1","G2/1","G2/1","G2/2","G2/1","E2/1","E2/2","F2/1","D2/1","D2/2","C2/1","E2/1","G2/1","G2/1","E2/4","D2/1","D2/1","D2/1","D2/1","D2/1","E2/1","F2/2",
"E2/1","E2/1","E2/1","E2/1","E2/1","F2/1","G2/2","G2/1","E2/1","E2/2","F2/1","D2/1","D2/2","C2/1","E2/1","G2/1","G2/1","C2/4"],
["C2/2", "D2/2", "F2/2", "G2/2", "A2/2", "A2/1", "G2/1", "F2/4", "D2/2", "F2/2", "F2/1", "D2/1", "F2/1", "D2/1", "F2/2", "F2/1", "D2/1", "C2/4", "C3/2", "A2/2", "A2/1", "F2/1", "G2/1", "G2/1", "F2/4"],
["C2/1", "C2/1", "D2/2", "C2/2", "F2/2", "E2/4", "C2/1", "C2/1", "D2/2", "C2/2", "G2/2", "F2/4", "C2/1", "C2/1", "C3/2", "A2/2", "F2/2", "E2/2", "D2/4", "Bb2/1", "Bb2/1", "A2/2", "F2/2", "G2/2", "F2/4"],
["E2/1", "D2/1", "C2/1", "D2/1", "E2/1", "E2/1", "E2/2", "D2/1", "D2/1", "D2/2", "E2/1", "E2/1", "E2/2", "E2/1", "D2/1", "C2/1", "D2/1", "E2/1", "E2/1", "E2/1", "E2/1", "D2/1", "D2/1", "E2/1", "D2/1", "C2/4"],
["D2/3", "F2/1", "D3/2", "C3/5", "Bb2/1", "D2/3", "F2/1", "Bb2/2", "A2/6", "Eb2/3", "F2/1", "Eb3/2", "D3/5", "Bb2/1", "C3/2", "Bb2/2", "G2/2", "F2/6", "D2/3", "F2/1", "D3/2", "C3/5", "Bb2/1", "D2/3", "F2/1", "Bb2/2", "A2/6", "G2/1", "F2/3", "Bb2/1", "Eb3/2", "D3/5", "Bb2/2", "C3/2", "G2/2", "A2/2", "Bb2/6"],
["G2/2", "E2/2", "G2/4", "G2/2", "E2/2", "G2/4", "A2/2", "G2/2", "F2/2", "E2/2", "D2/2", "E2/2", "F2/2", "E2/1", "F2/1", "G2/2", "C2/2", "C2/2", "C2/2", "C2/1", "D2/1", "E2/1", "F2/1", "G2/4", "G2/2", "D2/2", "D2/2", "F2/2", "E2/2", "D2/2", "C2/2"],
["D2/1", "E2/1", "G2/1", "A2/1", "B2/4", "A2/1", "G2/1", "F#2/1", "E2/1", "D2/4", "F#2/1", "E2/1", "F#2/1", "A2/1", "B2/1", "D3/1", "D3/1", "B2/1", "A2/1", "F#2/1", "E2/1", "D2/1", "E2/4", "F#2/1", "A2/1", "F#2/1", "A2/1", "B2/4", "F#2/1", "A2/1", "F#2/1", "E2/1", "D2/4", "D2/2", "D3/1", "B2/1", "A2/1", "G2/1", "F#2/1", "E2/1", "D2/4"],
["G2/3", "Bb1/1", "G2/3", "Bb1/1", "Bb1/1", "Ab2/2", "G2/2", "F2/4", "F2/3", "Bb1/1", "F2/3", "Bb1/1", "Bb1/1", "G2/2", "Ab2/2", "Bb2/4", "G2/2", "Bb2/2", "Bb2/2", "G2/2", "F2/2", "Ab2/2", "F2/4", "Ab2/1", "Ab2/1", "Ab2/1", "Ab2/1", "Ab2/2", "G2/1", "F2/1", "Eb2/4"],
["F2/1", "F2/1", "F2/1", "C2/1", "D2/1", "D2/1", "C2/2", "A2/1", "A2/1", "G2/1", "G2/1", "F2/3", "C2/1", "F2/1", "F2/1", "F2/1", "C2/1", "D2/1", "D2/1", "C2/2", "A2/1", "A2/1", "G2/1", "G2/1", "F2/4", "C2/1", "C2/1", "F2/1", "F2/1", "F2/1", "C2/1", "C2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "F2/1", "C2/1", "D2/1", "D2/1", "C2/2", "A2/1", "A2/1", "G2/1", "G2/1", "F2/4"],
["C2/2", "F2/2", "F2/1", "G2/1", "F2/1", "E2/1", "D2/2", "D2/2", "D2/2", "G2/2", "G2/1", "A2/1", "G2/1", "F2/1", "E2/2", "C2/2", "C2/2", "A2/2", "A2/1", "Bb2/1", "A2/1", "G2/1", "F2/2", "D2/2", "C2/2", "D2/2", "G2/2", "E2/2", "F2/4", 
"C2/2", "F2/2", "F2/2", "F2/2", "E2/4", "E2/2", "F2/2", "E2/2", "D2/2", "C2/4", "G2/2", "A2/2", "G2/1", "G2/1", "F2/1", "F2/1", "C3/2", "C2/2", "C2/1", "C2/1", "D2/2", "G2/2", "E2/2", "F2/4"],
["C2/2", "F2/2", "C2/2", "A1/3", "Bb1/1", "C2/6", "C2/1", "C2/1", "D2/2", "C2/2", "Bb1/3", "A1/1", "G1/8", "F2/2", "F2/2", "F2/4", "D2/3", "F2/1", "E2/3", "G2/1", "G2/2", "F2/2"],
["G1/2", "C2/2", "C2/1", "C2/1", "C2/2", "E2/2", "G2/2", "E2/2", "C2/4", "D2/2", "B1/2", "G1/4", "G2/2", "E2/2", "C2/4", "G1/2", "C2/2", "C2/1", "C2/1", "C2/2", "E2/2", "G2/2", "E2/2", "C2/4", "D2/4", "G1/2", "G1/2", "C2/4"]
]

const sheetsName = ["ABC","Bee","Angel","Birthday","Little Lamb","Lullaby","I love you","Lamp","Deepavali","O' Macdonald","Xmas NewYear","HippieVan1","Wheel on the bus"];
var selSong = document.getElementById("selSong");
var selectedSheet;
var selectedSheet1;
var currentKey;

for (var i = 0; i < sheetsName.length; i++){
	selSong.options[selSong.options.length] = new Option(sheetsName[i],i);
}
selSong.onchange = function() {
	if (selSong.value != -1){
		reset();
		selectedSheet1 = sheets[selSong.value];
		selectedSheet = sheets[selSong.value].map((el) => {return el.includes('#')? altNames[el.substr(0, el.length - 2)]:el.substr(0, el.length - 2)})
		
		document.querySelectorAll(`[data-note='${selectedSheet[0]}']`)[0].classList.add("highlight1");
		currentKey = selectedSheet[0];
		genSheet(0);
	}
	else {
		reset();
	}
}

function genSheet(start){
	var text = '';
	for (var i = start; i < Math.min(selectedSheet1.length, start+sheetLen); i++){
		var pulse = parseInt(selectedSheet1[i][selectedSheet1[i].length-1]);
		text += `<span class="sheet-note" data-sheetNote=${i} style="padding-right: ${pulse*15}px; background-size: 200% 100%; animation-duration: ${pulse*0.3}s;">${selectedSheet1[i].substr(0, selectedSheet1[i].length - 3).replace('b','♭')}</span>`;
	}
	sheet.innerHTML = text;	
	document.querySelectorAll(`[data-sheetNote='${start}']`)[0].classList.add("highlight");
}

for (var i = 0; i < keys.length; i++){	
	keyArray[i] = keys[i].getAttribute("data-note");
	music[i] = new Audio(audio_dir+keyArray[i]+'.mp3');
	music[i].volume = 0.5;
	keys[i].addEventListener("pointerdown", function(e){		//pointerdown
		playSound(e.currentTarget);
	});
	keys[i].addEventListener("pointermove", function(e){		//pointermove
		stopSound(e.currentTarget);
	});	
	keys[i].addEventListener("pointerup", function(e){		//pointerup
		stopSound(e.currentTarget);
	});
}

function playSound(item){
  const orinote = item.getAttribute("data-note");
  const note = orinote.includes('#')? altNames[orinote]:orinote;
  
  music[keyArray.indexOf(note)].currentTime = 0;
  music[keyArray.indexOf(note)].play();
  playing[keyArray.indexOf(note)] = 1;
  if (currentKey == note){
	document.querySelectorAll(`[data-sheetNote='${count}']`)[0].classList.add("highlightSlide");
	console.log("animate");
  }
}

async function celebrate(){
	document.getElementById("bee").style.visibility = "visible";
	sheet.innerHTML = "";
	selSong.value = -1;
	await new Promise(resolve => setTimeout(resolve, 3000));
	document.getElementById("bee").style.visibility = "hidden";
}

async function stopSound(item){	
  const note = item.getAttribute("data-note");
  if (playing[keyArray.indexOf(note)] == 1){
	  if (currentKey == note){
		  count +=1;
		  document.querySelectorAll(`[data-sheetNote='${count-1}']`)[0].classList.remove("highlight");
		  document.querySelectorAll(`[data-note='${selectedSheet[count-1]}']`)[0].classList.remove("highlight1");
		  if (count < selectedSheet.length){
			document.querySelectorAll(`[data-note='${selectedSheet[count]}']`)[0].classList.add("highlight1");
		  }
		  currentKey = selectedSheet[count];
		  if (count%sheetLen == 0){
			  genSheet(count);
		  }
		  else {
			  if (count < selectedSheet.length){
				document.querySelectorAll(`[data-sheetNote='${count}']`)[0].classList.add("highlight");
			  }
		  }
		  if (count == selectedSheet.length){
			  celebrate();
		  }
	  }
	  playing[keyArray.indexOf(note)] = 0;
	  await new Promise(resolve => setTimeout(resolve, 300));
	  
	  if (playing[keyArray.indexOf(note)] == 0){// && music[keyArray.indexOf(note)].currentTime > 0.1){
		music[keyArray.indexOf(note)].pause();
	  }
  }
}

function reset(){
	document.getElementById("bee").style.visibility = "hidden";
	count = 0; sheet.innerHTML = "";
	const highlighted = document.querySelectorAll(".highlight1");
	for (var i = 0; i < highlighted.length; i++){		
		highlighted[i].classList.remove("highlight1");
	}
}