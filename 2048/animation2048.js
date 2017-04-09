function showNumAnimation(i, j, num){
	// 生成新格子动画
	var numberCell = $("#number-cell-" + i + "-" + j);

	numberCell.css('background-color', getNumberCellBgColor(num));
	numberCell.css('color', getNumberCellColor(num));
	numberCell.text(num);

	numberCell.animate({
		width: "100px",
		height: "100px",
		top: getTopPos(i, j),
		left: getLeftPos(i, j),
	}, 50);
}

function showMoveAnimation(fromX, fromY, toX, toY){
	// 格子移动动画
	var numberCell = $("#number-cell-" + fromX + "-" + fromY);
	numberCell.animate({
		top: getTopPos(toX, toY),
		left: getLeftPos(toX, toY),
	}, 100);
}

function showAddedAnimation(i, j){
	// 被加的格子响应动画
	var numberCell = $("#number-cell-" + i + "-" + j);
	numberCell.animate({
		width: "120px",
		height: "120px",
		fontSize: "70px",
		lineHeight: "120px",
		top: getTopPos(i, j) - 10,
		left: getLeftPos(i, j) - 10,
	}, 50);
	numberCell.animate({
		width: "100px",
		height: "100px",
		fontSize: "60px",
		lineHeight: "100px",
		top: getTopPos(i, j),
		left: getLeftPos(i, j),
	}, 50);
}

function updateScore(score){
	// 更新分数
	$('#score').text(score);
}