class SudokuSolver {

  constructor(number) {  // Constructor
    this.num = number;
	if (number == 4){
		this.region = [['A1','A2','B1','B2'],
					  ['A3','A4','B3','B4'],
					  ['C1','C2','D1','D2'],
					  ['C3','C4','D3','D4']];
		this.rows = 'ABCD';		
	}
	else if (number == 9){
		this.region = [['A1','A2','A3','B1','B2','B3','C1','C2','C3'],
					  ['A4','A5','A6','B4','B5','B6','C4','C5','C6'],
					  ['A7','A8','A9','B7','B8','B9','C7','C8','C9'],
					  ['D1','D2','D3','E1','E2','E3','F1','F2','F3'],
					  ['D4','D5','D6','E4','E5','E6','F4','F5','F6'],
					  ['D7','D8','D9','E7','E8','E9','F7','F8','F9'],
					  ['G1','G2','G3','H1','H2','H3','I1','I2','I3'],
					  ['G4','G5','G6','H4','H5','H6','I4','I5','I6'],
					  ['G7','G8','G9','H7','H8','H9','I7','I8','I9']];	 
		this.rows = 'ABCDEFGHI';		
	}
	else {
		return {"error":"invalid number"}
	}
  }  
	
  isInvalid(puzzle, row, column, value) {
    const coord = row+column;
    const roi = this.region[this.region.findIndex(el => el.includes(coord))];	
    for (var i = 1; i < this.num+1; i++){
      if (value == this.getNumber(puzzle, row+i.toString())){
        return true;
      }
      if (value == this.getNumber(puzzle, this.rows[i-1]+column.toString())){
        return true;
      }
      if (value == this.getNumber(puzzle, roi[i-1])){
        return true;
      }	  
    }    
    return false;	  
  }

  getCoord(index){    
    return this.rows[Math.floor(index/this.num)]+(index%this.num+1).toString();
  }

  getNumber(puzzle, coord){
    return puzzle[this.rows.indexOf(coord[0])*this.num + parseInt(coord[1]) - 1];
  }

  solveOne(testString, resultMatrix){ 
	var fullSol = Array(this.num**2);
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
          testString[j] = validNum[0];
        }
		fullSol[j] = validNum;
		
      }
	  else {
		  fullSol[j] = [testString[j]];
	  }
    }
    return {"solution": fullSol};	
  }

  solve(puzzle) {
	var count = 0;	

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
		if (count > 2000){
			return { "error": "more than 2000 iterations" };
		}		

      var solObj = this.solveOne(testString, resultMatrix);	  	  
	  var resultLenMatrix = Array(this.num**2).fill(100);
	  for (var j = 0; j < this.num**2; j++){
		  if (solObj.solution[j].length == 1){
			  testString[j] == solObj.solution[j][0];
		  }
		  else {
			  resultLenMatrix[j] = solObj.solution[j].length;			  
		  }		  
	  }    
	  resultMatrix = solObj.solution;
		//console.log(testString);
      const minResult = Math.min(...resultLenMatrix);
      if ( minResult == 0){
        if (backTrack.length == 0){
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
			  "resultMatrix":backSol.resultMatrix
			  });
          }
        }
      }
	
      //if all tests has more than 1 answer, use the one with least answer
      if (minResult > 1){		
        var fillIndex = resultLenMatrix.indexOf(minResult);
        backTrack.push({"solution": testString.slice(0), "fillIndex": fillIndex, 
		"resultMatrix1":resultMatrix[fillIndex].slice(1),
		"resultMatrix":resultMatrix
		});
        testString[fillIndex] = resultMatrix[fillIndex][0];        
      }
    }
	console.log(count);
    return { "solution":  testString};                  
    
  }
}

