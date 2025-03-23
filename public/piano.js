const audio_dir = './public/audio/piano1/';

const keys = document.querySelectorAll("[data-note]");
var music = Array(keys.length);
var keyArray = Array(keys.length);
var sheet = document.getElementById("sheet");
var playing = Array(keys.length).fill(0);
var count = 0;
const sheetLen = 20;

var selectedSheet = ["C2", "C2", "G2", "G2", "A2", "A2", "G2", "F2", "F2", "E2", "E2", "D2", "D2", "C2", "G2", "G2", "F2", "F2", "E2", "E2", "D2", "G2", "G2", "F2", "F2",
 "E2", "E2", "D2", "C2", "C2", "G2", "G2", "A2", "A2", "G2", "F2", "F2", "E2", "E2", "D2", "D2", "C2"];
document.querySelectorAll(`[data-note='${selectedSheet[0]}']`)[0].classList.add("highlight1");
var currentKey = selectedSheet[0];
 
genSheet(0); 

function genSheet(start){
	var text = '';
	for (var i = start; i < Math.min(selectedSheet.length, start+sheetLen); i++){
		text += `<span class="sheet-note" data-sheetNote=${i}>${selectedSheet[i].substr(0, selectedSheet[i].length - 1)}</span>`;
	}
	sheet.innerHTML = text;	
	document.querySelectorAll(`[data-sheetNote='${start}']`)[0].classList.add("highlight");
}

for (var i = 0; i < keys.length; i++){	
	keyArray[i] = keys[i].getAttribute("data-note");
	music[i] = new Audio(audio_dir+keyArray[i]+'.mp3');
	music[i].volume = 0.5;
	keys[i].addEventListener("mousedown", function(e){		
		playSound(e.currentTarget);
	});
	keys[i].addEventListener("mouseup", function(e){
		stopSound(e.currentTarget);
	});
	keys[i].addEventListener("touchstart", function(e){		
		playSound(e.currentTarget);
	});
	keys[i].addEventListener("touchend", function(e){
		stopSound(e.currentTarget);
	});	
}

function playSound(item){
  const note = item.getAttribute("data-note");
  music[keyArray.indexOf(note)].currentTime = 0;
  music[keyArray.indexOf(note)].play();
  playing[keyArray.indexOf(note)] = 1;
  //if (currentKey.indexOf(note)!= -1){
  if (currentKey == note){
	  count +=1;
	  document.querySelectorAll(`[data-sheetNote='${count-1}']`)[0].classList.remove("highlight");	  
	  document.querySelectorAll(`[data-note='${selectedSheet[count-1]}']`)[0].classList.remove("highlight1");
	  document.querySelectorAll(`[data-note='${selectedSheet[count]}']`)[0].classList.add("highlight1");
	  currentKey = selectedSheet[count];
	  if (count%sheetLen == 0){
		  genSheet(count);
	  }
	  else {
		  document.querySelectorAll(`[data-sheetNote='${count}']`)[0].classList.add("highlight");
	  }
  }
}

async function stopSound(item){	
  const note = item.getAttribute("data-note");
  playing[keyArray.indexOf(note)] = 0;
  await new Promise(resolve => setTimeout(resolve, 500));
  if (playing[keyArray.indexOf(note)] == 0 && music[keyArray.indexOf(note)].currentTime > 0.3){
	music[keyArray.indexOf(note)].pause();
  }
}