var title = document.title;
var page = 1; var disp = ""
switch (title){
	case "Chinese Flash Card":
		page = 1; disp = "Chinese FC"; break;
	case "Simple Arithmetic":
		page = 2; disp = "SA"; break;
	case "Logic Game":
		page = 3; disp = "Logic"; break;
	case "English/Chinese":
		page = 4; disp = "EC"; break;
	case "Sudoku":
		page = 5; disp = "Sudoku"; break;
	case "Spot The Difference":
		page = 6; disp = "SpotDiff"; break;
	case "Jigsaw":
		page = 7; disp = "Jigsaw"; break;
	case "Memory Game":
		page = 8; disp = "Memory"; break;
	case "Maze":
		page = 9; disp = "Maze"; break;
	case "Piano":
		page = 10; disp = "Piano"; break;
	case "Draw":
		page = 11; disp = "Draw"; break;
	case "Clock":
		page = 12; disp = "Clock"; break;		
	case "Read":
		page = 13; disp = "Read"; break;
	case "Slider Game":
		page = 14; disp = "Slider"; break;						
	default:
		page = 1; disp = "Chinese FC"; break;
}

document.write(`
	<button type="button" class="collapsible"><span>${disp}</span><span>+</span></button>
    <ul id="navbar">	  
      <li><a ${page == 1? 'class="active"':''} href="index.html">Chinese FC</a></li>
      <li><a ${page == 2? 'class="active"':''} href="sa.html">SA</a></li>
      <li><a ${page == 3? 'class="active"':''} href="logic.html">Logic</a></li>
      <li><a ${page == 4? 'class="active"':''} href="ec.html">EC</a></li>
      <li><a ${page == 5? 'class="active"':''} href="sudoku.html">Sudoku</a></li>
	  <li><a ${page == 6? 'class="active"':''} href="spotdiff.html">SpotDiff</a></li>
	  <li><a ${page == 7? 'class="active"':''} href="jigsaw.html">Jigsaw</a></li>
	  <li><a ${page == 8? 'class="active"':''} href="memory.html">Memory</a></li>
	  <li><a ${page == 9? 'class="active"':''} href="maze.html">Maze</a></li>
	  <li><a ${page == 10? 'class="active"':''} href="piano.html">Piano</a></li>
	  <li><a ${page == 11? 'class="active"':''} href="draw.html">Draw</a></li>
	  <li><a ${page == 12? 'class="active"':''} href="clock.html">Clock</a></li>
	  <li><a ${page == 13? 'class="active"':''} href="read.html">Read</a></li>
	  <li><a ${page == 14? 'class="active"':''} href="slider.html">Slider</a></li>	 
    </ul>
`
);

var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
	this.classList.toggle("active");
	var content = this.nextElementSibling;
	if (content.style.display === "block") {
	  content.style.display = "none";
	} else {
	  content.style.display = "block";
	}
  });
}	