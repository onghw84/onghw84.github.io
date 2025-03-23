const audio_dir = './public/audio/piano/';

const keys = document.querySelectorAll("[data-note]");
var music = Array(keys.length);
var keyArray = Array(keys.length);

for (var i = 0; i < keys.length; i++){	
	keyArray[i] = keys[i].getAttribute("data-note");
	music[i] = new Audio(audio_dir+keyArray[i]+'.mp3');
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

console.log(keyArray);
//document.querySelectorAll("[data-note='A2']");

function playSound(item){	
  const note = item.getAttribute("data-note");
  music[keyArray.indexOf(note)].currentTime = 0;
  music[keyArray.indexOf(note)].play();
}

async function stopSound(item){	
  await new Promise(resolve => setTimeout(resolve, 200));
  const note = item.getAttribute("data-note");
  music[keyArray.indexOf(note)].pause();
  music[keyArray.indexOf(note)].pause();
}