class SudokuSolver {

  constructor(number) {  // Constructor
    this.num = number;
	this.numsq = Math.sqrt(number);
  }  
	
  isInvalid(puzzle, row, column, value) {
    const coord = row+column;
    const row_start = Math.floor(row/this.numsq) * this.numsq;
    const col_start = Math.floor(column/this.numsq) * this.numsq;
	var roi = [];
	for (var i = row_start; i < row_start + this.numsq; i++){
		for (var j = col_start; j < col_start + this.numsq; j++){
			roi.push([i,j]);
		}
	}
    for (var i = 0; i < this.num; i++){
      if (value == this.getNumber(puzzle, row, i)){
        return true;
      }
      if (value == this.getNumber(puzzle, i, column)){
        return true;
      }	 
      if (value == this.getNumber(puzzle, roi[i][0], roi[i][1])){
        return true;
      }
    }
    return false;	  
  }
  
  getCoord(index){    
    return [Math.floor(index/this.num),index%this.num];
  }

  getNumber(puzzle, row, column){
    return puzzle[row*this.num + column];
  }

  solveOne(testString, resultMatrix){ 
	var fullSol = Array(this.num**2); var improve = false;
    for (var j = 0; j < this.num**2; j++){
      if (testString[j] == '.'){
        var coord = this.getCoord(j);
        var validNum = [];
        for (var i = 0; i < resultMatrix[j].length; i++){
          if (!(this.isInvalid(testString, coord[0], coord[1], resultMatrix[j][i]))){
                validNum.push(resultMatrix[j][i]);
          } 
        }
        if (validNum.length == 1){                
          testString[j] = validNum[0]; improve = true;
        }
		fullSol[j] = validNum;
		
      }
	  else {
		  fullSol[j] = [testString[j]];
	  }
    }
    return {"solution": fullSol, "improve": improve};	
  }

  solve(puzzle) {
	var count = 0;	
	var resultMatrix = Array(this.num**2).fill(Array(this.num).fill(0).map((el,index)=>{return index+1;})); 
    for (var i = 1; i <= this.num; i++){
      if (puzzle.filter(x => x==i).length > this.num){
        return { "error": "Puzzle cannot be solved" };
      }
    } 

    //STUPID method
    var testString = [...puzzle];
    var backTrack = [];
	var resultMatrix = Array(this.num**2).fill(Array(this.num).fill(0).map((el,index)=>{return index+1;}));
    while (testString.includes('.')){
		count += 1;
		if (count > 5000){
			return { "error": "more than 5000 iterations" };
		}		
	
	  resultMatrix = Array(this.num**2).fill(Array(this.num).fill(0).map((el,index)=>{return index+1;}));
	  var solObj = this.solveOne(testString, resultMatrix);
	  var resultLenMatrix = Array(this.num**2).fill(100);
	  
	  if (!solObj.improve){
		  resultMatrix = solObj.solution;
		  resultLenMatrix = solObj.solution.map((el)=>{return el.length == 1? 100:el.length});
		  const minResult = Math.min(...resultLenMatrix);
		  if ( minResult == 0){
			if (backTrack.length == 0){
			  console.log(count);
			  return { "error": "Puzzle cannot be solved" };
			  break;
			}
			else {
			  //perform backtrack here
			  var backSol = backTrack.pop();
			  testString = backSol.solution.slice(0);
			  testString[backSol.fillIndex] = backSol.resultMatrix1[0];
			  resultMatrix = backSol.resultMatrix;		  
			  if (backSol.resultMatrix1.length > 1){
				backTrack.push({"solution": backSol.solution.slice(0), 
				  "fillIndex": backSol.fillIndex, 
				  "resultMatrix1":backSol.resultMatrix1.slice(1),
				  "resultMatrix":backSol.resultMatrix.slice(0)
				  });
			  }
			}
		  }
		
		  //if all tests has more than 1 answer, use the one with least answer
		  if (minResult > 1){		
			var fillIndex = resultLenMatrix.indexOf(minResult);
			backTrack.push({"solution": testString.slice(0), "fillIndex": fillIndex, 
			"resultMatrix1":resultMatrix[fillIndex].slice(1),
			"resultMatrix":resultMatrix.slice(0)
			});
			testString[fillIndex] = resultMatrix[fillIndex][0];        
		  }
      }
    }
	console.log(count);
    return { "solution":  testString};                  
    
  }
}

