var board = new Array();	// 二维数组 存储数字
var isadded = new Array();	// 二维数组 用于判断格子是否已经相加过一次
var score = 0;

$(document).ready(function(){NewGame();});

function NewGame(){
	// 初始化网格
	init();
	// 随机在两个格子里生成数字2或4
	addRandomNum();
	addRandomNum();

}

function init(){
	// 初始化网格样式
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getTopPos(i, j)); 		// 设置网格top初值
			gridCell.css('left',getLeftPos(i, j));		// 设置网格left初值
		}
	// 初始化二维数组	
	for(var i=0; i<4; i++){
		board[i] = new Array();
		isadded[i] = new Array();
		for(var j=0; j<4; j++){
			board[i][j] = 0;
			isadded[i][j] = false;
		}
	}

	score = 0;            // 分数清零
	updateScore(score);
	updateBoardView();	
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var numberCell = $("#number-cell-"+i+"-"+j);

			if(board[i][j] == 0){ 
				// 值为0时，不显示，宽高均为0
				numberCell.css('width','0px');
				numberCell.css('height','0px'); 
				numberCell.css('top',getTopPos(i, j)+50);
				numberCell.css('left',getLeftPos(i, j)+50);
			}
			else{
				// 值不为0时，统一宽高为100px,定位和父元素一样
				numberCell.css('width','100px');
				numberCell.css('height','100px');
				numberCell.css('top',getTopPos(i, j));
				numberCell.css('left',getLeftPos(i, j));
				// 背景颜色不一样
				numberCell.css('background-color',getNumberCellBgColor(board[i][j]));
				numberCell.css('color',getNumberCellColor(board[i][j]));
				numberCell.text(board[i][j]);
			}
			
			isadded[i][j] = false;
		}
}

function addRandomNum(){
	// 没有空格子不操作
	if(noSpace(board))
		return false;  

	// 随机出位置
	var randomX = parseInt(Math.floor(Math.random() * 4));
	var randomY = parseInt(Math.floor(Math.random() * 4));
	var count = 0;
	while(count < 100){
		// 最多随机生成100次，否则人工生成
		if(board[randomX][randomY] == 0)
			break;
		randomX = parseInt(Math.floor(Math.random() * 4));
		randomY = parseInt(Math.floor(Math.random() * 4));
	}
	
	// 随机出数字，生成2的概率75%，生成4的概率25%
	var randomNum = Math.random() < 0.75 ? 2 : 4;

	// 在随机位置显示随机数字
	board[randomX][randomY] = randomNum;
	showNumAnimation(randomX, randomY, randomNum);

	return true;
}

$(document).keydown(function(event) {
	switch(event.keyCode){
		case 37:  		// 左方向键
		case 65:  		// 字母A键
			if(moveLeft()){
				setTimeout("addRandomNum()", 110);
				setTimeout("isGameOver()", 200);
			}
			break;
		case 38: 		// 上方向键
		case 87: 		// 字母W键
			if(moveUp()){
				setTimeout("addRandomNum()", 110);
				setTimeout("isGameOver()", 200);
			}
			break;
		case 39: 		// 右方向键
		case 68: 		// 字母D键
			if(moveRight()){
				setTimeout("addRandomNum()", 110);
				setTimeout("isGameOver()", 200);
			}
			break;
		case 40: 		// 下方向键
		case 83: 		// 字母S键
			if(moveDown()){
				setTimeout("addRandomNum()", 110);
				setTimeout("isGameOver()", 200);
			}
			break;
		default: 		// 其他按键无效
			break;
	}
});

function moveLeft(){
	// 左移一次
	if(!canMoveLeft(board))
		return false;

	for(var i=0; i<4; i++)
		for(var j=1; j<4; j++){
			if(board[i][j] != 0){
				for(var k=0; k<j; k++){
					if(board[i][k] == 0 && noBarrierHorizontal(i, k, j, board)){
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && 
						noBarrierHorizontal(i, k, j, board) &&
						!isadded[i][k]){
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;

						score += board[i][k];
						updateScore(score);

						isadded[i][k] = true;
						continue;
					}
				}
			}
		}
	// 延时执行update使动画演算完毕
	setTimeout("updateBoardView()",100);
	return true;
}

function moveUp(){
	// 上移一次
	if(!canMoveUp(board))
		return false;

	for(var i=1; i<4; i++)
		for(var j=0; j<4; j++){
			if(board[i][j] != 0){
				for(var k=0; k<i; k++){
					if(board[k][j] == 0 && noBarrierVertical(j, k, i, board)){
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && 
						noBarrierVertical(j, k, i, board) &&
						!isadded[k][j]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						updateScore(score);

						isadded[k][j] = true;
						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()",100);
	return true;
}

function moveRight(){
	// 右移一次
	if(!canMoveRight(board))
		return false;

	for(var i=0; i<4; i++)
		for(var j=2; j>=0; j--){
			if(board[i][j] != 0){
				for(var k=3; k>j; k--){
					if(board[i][k] == 0 && noBarrierHorizontal(i, j, k, board)){
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && 
						noBarrierHorizontal(i, j, k, board) &&
						!isadded[i][k]){
						showMoveAnimation(i, j, i, k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						
						score += board[i][k];
						updateScore(score);

						isadded[i][k];
						continue;

					}
				}
			}
		}

	setTimeout("updateBoardView()",100);
	return true;
}

function moveDown(){
	// 上移一次
	if(!canMoveDown(board))
		return false;
	for(var j=0; j<4; j++)
		for(var i=2; i>=0; i--){
			if(board[i][j] != 0){
				for(var k=3; k>i; k--){
					if(board[k][j] == 0 && noBarrierVertical(j, i, k, board)){
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && 
						noBarrierVertical(j, i, k, board) &&
						!isadded[k][j]){
						showMoveAnimation(i, j, k, j);
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						updateScore(score);

						isadded[k][j];
						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()",100);	
	return true;
}

function isGameOver(){
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++)
			if(board[i][j] == 2048)
				youWin();
	if(noSpace(board) && !canMove(board)){
		gameOver();
	}
}

function youWin(){
	alert('You Win!');
}

function gameOver(){
	alert('Game Over');
}
