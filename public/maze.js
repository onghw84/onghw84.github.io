var total = 0; var correct = 0;
var level = 0; 
document.getElementById("container1").style.display = "none"; 
var focus = '';

const grid1 = ['A_1','A_2','A_3','A_4',
			  'B_1','B_2','B_3','B_4',
			  'C_1','C_2','C_3','C_4',
			  'D_1','D_2','D_3','D_4'];
			  
const grid2 = ['A1','A2','A3','A4','A5','A6','A7','A8','A9',
			  'B1','B2','B3','B4','B5','B6','B7','B8','B9',
			  'C1','C2','C3','C4','C5','C6','C7','C8','C9',
			  'D1','D2','D3','D4','D5','D6','D7','D8','D9',
			  'E1','E2','E3','E4','E5','E6','E7','E8','E9',
			  'F1','F2','F3','F4','F5','F6','F7','F8','F9',
			  'G1','G2','G3','G4','G5','G6','G7','G8','G9',
			  'H1','H2','H3','H4','H5','H6','H7','H8','H9',
			  'I1','I2','I3','I4','I5','I6','I7','I8','I9'];
			  
var grid = grid2;

document.getElementById("newGame").addEventListener("click", ()=>{genGame()});
document.getElementById("one").addEventListener("click", answerHandler);
document.getElementById("two").addEventListener("click", answerHandler);
document.getElementById("three").addEventListener("click", answerHandler);
document.getElementById("four").addEventListener("click", answerHandler);
document.getElementById("five").addEventListener("click", answerHandler);
document.getElementById("six").addEventListener("click", answerHandler);
document.getElementById("seven").addEventListener("click", answerHandler);
document.getElementById("eight").addEventListener("click", answerHandler);
document.getElementById("nine").addEventListener("click", answerHandler);
document.getElementById("kids").addEventListener("click", function(){
	level = 0; reset(); this.style.backgroundColor = "pink";
	document.getElementById("container0").style.display = "flex"; 
	document.getElementById("container1").style.display = "none";
	document.getElementById("five").style.display = "none";
	document.getElementById("six").style.display = "none";
	document.getElementById("seven").style.display = "none";
	document.getElementById("eight").style.display = "none";
	document.getElementById("nine").style.display = "none";
	document.getElementById("digit").style.width = "200px";
})
document.getElementById("easy").addEventListener("click", function(){
	level = 1; reset(); this.style.backgroundColor = "pink";
	document.getElementById("container0").style.display = "none";
	document.getElementById("container1").style.display = "flex";
})
document.getElementById("medium").addEventListener("click", function(){
	level = 2; reset(); this.style.backgroundColor = "pink";
	document.getElementById("container0").style.display = "none";
	document.getElementById("container1").style.display = "flex";	
})
document.getElementById("hard").addEventListener("click", function(){
	level = 3; reset(); this.style.backgroundColor = "pink";
	document.getElementById("container0").style.display = "none";
	document.getElementById("container1").style.display = "flex";	
})

document.getElementById("total").innerHTML = total;
var answer = new Array(grid.length).fill(0);
let reward = new Reward();
let sudokuSolver = new SudokuSolver(9);
let sudokuSolver0 = new SudokuSolver(4);
genGame();


//var test = ['.', '.', '.', '.', '.', '.', 6, '.', '.', '.', '.', '.', '.', '.', 5, '.', '.', '.', 6, '.', '.', 7, '.', '.', 5, '.', '.', '.', '.', 2, '.', 3, '.', '.', '.', '.', '.', '.', '.', 1, '.', '.', '.', 7, 9, '.', 9, 6, '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 8, '.', '.', '.', '.', 5, 7, '.', '.', '.', 6, '.', '.', '.', '.', '.', '.', '.', 2, '.', '.', 4, '.'];
//var puzzleAnswer = sudokuSolver.solve(test);
//console.log(puzzleAnswer);

function gridListener(event){
	if (focus != ""){
		document.getElementById(focus).style.backgroundColor = "white";
	}
	focus = event.currentTarget.myParam;
	event.currentTarget.style.backgroundColor = "yellowgreen";		
}

function answerHandler(){    
  const value = this.innerHTML;
  if (focus == ""){
	return;
  }
  else {
	  document.getElementById(focus).innerHTML = value;
	  
	  const index = grid.indexOf(focus);
	  if (answer[index] == value){
		document.getElementById(focus).style.color = "blue";
		correct += 1;
		if (correct == emptyGrid.length){	//all correct
			if (level == 0){
				document.getElementById("container0").style.backgroundColor = "pink";
			}
			else {
				document.getElementById("container1").style.backgroundColor = "pink";
			}
			document.getElementById(focus).style.backgroundColor = "white";
			document.getElementById("digit").style.display = "none";
			total += 1;
			document.getElementById("total").innerHTML = total;
			reward.showReward(total, 1);			
		}
	  }
	  else {
		  if (document.getElementById(focus).style.color == "blue"){
			  correct -= 1;
		  }
		  document.getElementById(focus).style.color = "red";
	  }
	  return;
  }
}

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

function genBoard(){	
	var index;
	var value;
	var puzzle = new Array(grid.length).fill('.');
	var i = 0;	
	
	if (level == 0){
		//TODO: generate 4x4 board		
		while (i < 4){
			index = Math.floor(Math.random()*grid.length);
			value = Math.ceil(Math.random()*Math.sqrt(grid.length));
			row = grid[index][0]; column = grid[index][2];
			if (!sudokuSolver0.isInvalid(puzzle, row, column, value)){
				puzzle[index] = value;
				i += 1;			
			}
		}
		var puzzleAnswer0 = sudokuSolver0.solve(puzzle);	//TODO: solve sometimes stuck
		if (puzzleAnswer0.error){
			console.log(puzzleAnswer0.error);
			return [-1];
		}
		else {
			return puzzleAnswer0.solution;
		}		
	}
	else {
		//generate 9*9 board
		while (i < 20){
			index = Math.floor(Math.random()*grid.length);
			value = Math.ceil(Math.random()*Math.sqrt(grid.length));
			row = grid[index][0]; column = grid[index][1];
			if (!sudokuSolver.isInvalid(puzzle, row, column, value)){
				puzzle[index] = value;
				i += 1;			
			}
		}
		var puzzleAnswer = sudokuSolver.solve(puzzle);	//TODO: solve sometimes stuck
		if (puzzleAnswer.error){
			console.log(puzzleAnswer.error);
			return [-1];
		}
		else {
			return puzzleAnswer.solution;
		}
	}
}

function genGame(){	
	document.getElementById("container0").style.backgroundColor = "white";
	document.getElementById("container1").style.backgroundColor = "white";
	document.getElementById("digit").style.display = "flex";
	if (focus != ""){
		document.getElementById(focus).style.background = "white";
	}
	correct = 0;
	
	//generate empty grid;
	if (level == 0){
		grid = grid1;
	}
	else {grid = grid2;}
		
	answer = genBoard();	//generate new game (answer)
	while (answer.length == 1){
		answer = genBoard();
	}	
	
	emptyGrid = []; var emptyIndex = 0;
	for (var i = 0; i < (level*2+1)*5; i++){
		emptyIndex = (emptyIndex + Math.ceil(Math.random()*10))%grid.length;
		emptyGrid.push(grid[emptyIndex]);
	}
	emptyGrid = removeDuplicates(emptyGrid);

	//fill in grid
	for (var i = 0; i < grid.length; i++) {
		if (emptyGrid.includes(grid[i])){
			document.getElementById(grid[i]).style.fontWeight = "normal";
			document.getElementById(grid[i]).style.fontStyle = "italic";
			document.getElementById(grid[i]).addEventListener("click", gridListener, false);
			document.getElementById(grid[i]).myParam = grid[i];
			document.getElementById(grid[i]).innerHTML = "";
		}
		else {
			document.getElementById(grid[i]).removeEventListener("click", gridListener);
			document.getElementById(grid[i]).style.fontWeight = "bold";
			document.getElementById(grid[i]).style.fontStyle = "normal";
			document.getElementById(grid[i]).innerHTML = answer[i];
		}
	}
}

function reset(){
	genGame();
	document.getElementById("digit").style.width = "400px";
	document.getElementById("five").style.display = "flex";
	document.getElementById("six").style.display = "flex";
	document.getElementById("seven").style.display = "flex";
	document.getElementById("eight").style.display = "flex";
	document.getElementById("nine").style.display = "flex";	
	document.getElementById("kids").style.backgroundColor = "white";
	document.getElementById("easy").style.backgroundColor = "white";
	document.getElementById("medium").style.backgroundColor = "white";
	document.getElementById("hard").style.backgroundColor = "white";
}

document.getElementById("song").addEventListener("click", function (){
  total = 0;
  document.getElementById("total").innerHTML = total;
  reward.showReward(total, 1);
});