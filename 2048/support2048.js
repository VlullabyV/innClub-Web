function getTopPos(i, j){
	return 20 + i*120;
}

function getLeftPos(i, j){
	return 20 + j*120;
}

function getNumberCellBgColor(num){
	switch(num) {
		case 2: return "#eee4da"; break;
		case 4: return "#ede0c8"; break;
		case 8: return "#f2b179"; break;
		case 16: return "#f59563"; break;
		case 32: return "#f67e5f"; break;
		case 64: return "#f65e3b"; break;
		case 128: return "#edcf72"; break;
		case 256: return "#edcc61"; break;
		case 512: return "#eeb422"; break;
		case 1024: return "#eec900"; break;
		case 2048: return "#ee0"; break;
		case 4096: return "#a6c"; break;
		case 8192: return "#93c"; break;
	}
	return "black";
}

function getNumberCellColor(num){
	if(num==2 || num==4)
		return "#776e65";

	return "white";
}


function noSpace(board){
	// 判断是否还有空格，没有返回true，有返回false
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++)
			if(board[i][j] == 0)
				return false;

	return true;
}

function canMoveLeft(board){
	// 判断是否能向左移动，能返回true，不能返回false
	for(var i=0; i<4; i++)
		for(var j=1; j<4; j++)
			if(board[i][j] != 0)	
				if(board[i][j-1] == 0 || board[i][j] == board[i][j-1])
					return true;

	return false;
}

function canMoveUp(board){
	// 判断是否能向上移动，能返回true，不能返回false
	for(var i=1; i<4; i++)
		for(var j=0; j<4; j++)
			if(board[i][j] != 0)
				if(board[i-1][j] == 0 || board[i][j] == board[i-1][j])
					return true;

	return false;
}

function canMoveRight(board){
	// 判断是否能向右移动，能返回true，不能返回false
	for(var i=0; i<4; i++)
		for(var j=2; j>=0; j--)
			if(board[i][j] != 0)		
				if(board[i][j+1] == 0 || board[i][j] == board[i][j+1])
					return true;

	return false;
}

function canMoveDown(board){
	// 判断是否能向下移动，能返回true，不能返回false
	for(var j=0; j<4; j++)
		for(var i=2; i>=0; i--)
			if(board[i][j] != 0)
				if(board[i+1][j] == 0 || board[i][j] == board[i+1][j])
					return true;

	return false;
}

function noBarrierHorizontal(row, col1, col2, board){
	// 判断在同一水平方向的两个网格之间是否有不为0的网格，没有返回true，有返回false
	for(var i=col1+1; i<col2; i++)
		if(board[row][i] != 0)
			return false;

	return true;
}

function noBarrierVertical(col, row1, row2, board){
	// 判断在同一竖直方向的两个网格之间是否有不为0的网格，没有返回true，有返回false
	for(var i=row1+1; i<row2; i++)
		if(board[i][col] != 0)
			return false

	return true;
}

function canMove(board){
	// 判断能否移动，能移动返回true，不能移动返回false
	if(canMoveLeft(board) ||
		canMoveRight(board) ||
		canMoveUp(board) ||
		canMoveDown(board))
		return true;

	return false;
}