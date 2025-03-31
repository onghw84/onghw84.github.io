var title = document.title;
var page = 1;
switch (title){
	case "Chinese Flash Card":
		page = 1; break;
	case "Simple Arithmetic":
		page = 2; break;
	case "Logic Game":
		page = 3; break;
	case "English/Chinese":
		page = 4; break;
	case "Sudoku":
		page = 5; break;
	case "Spot The Difference":
		page = 6; break;
	case "Jigsaw":
		page = 7; break;
	case "Memory Game":
		page = 8; break;
	case "Maze":
		page = 9; break;
	case "Piano":
		page = 10; break;
	case "Draw":
		page = 11; break;
	default:
		page = 1; break;
}

document.write(`
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
    </ul>
`
);