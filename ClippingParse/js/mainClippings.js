var clippings = parseMarkTxt(sourceStr);

$(document).ready(function(){showBooklist(clippings);});

function showBooklist(clippings){

	var bookNum = clippings.booklist.length;
	var markNum = clippings.mark.length;
	for(var i=0; i<bookNum; i++){
		$("#listContainer").append('<div class="booklist" id="book-'+i+'"></div>');
		$("#book-"+i).css('top',getBooklistPos(i));
		$("#book-"+i).append('<p class="booktitle" id="booktitle-'+i+'"></p>');
		$("#booktitle-"+i).text(clippings.booklist[i]);
		for(var j=0; j<markNum; j++){
			if(clippings.booklist[i] == clippings.mark[j].title)
				break;
		}
		$("#book-"+i).append('<p class="author" id="author-'+i+'"></p>');
		$("#author-"+i).text(clippings.mark[j].author);
		$("#listContainer").append('<div onmouseenter="javascript:showListRespondAnimation('+i+');"'
			+' onmouseleave="showListReturnAnimation('+i+');" '
			+' onclick="showMark(clippings,'+i+');" '
			+'class="mouseEvent" id="mouseEvent-'+i+'"></div>');
		$("#mouseEvent-"+i).css('top',getBooklistPos(i));
	}
}

function showMark(clippings,i){
	
	var bookNum = clippings.booklist.length;
	var markNum = clippings.mark.length;
	var bookTitle = clippings.booklist[i];
	$(".mouseEvent").css('display','none');
	showBooktitleFadeOutAnimation(clippings,i);

	$("#listContainer").append('<div onmouseenter="javascript:showListRespondAnimation('+i+');"'
			+' onmouseleave="showListReturnAnimation('+i+');" '
			+' onclick="hideMark(clippings,'+i+');" '
			+'class="nextMouseEvent" id="nextMouseEvent-'+i+'"></div>');
	$("#nextMouseEvent-"+i).css('top',0);


	// 显示笔记
	for(var count=0,matchNum=0,maxBottom=0; count<markNum; count++){
		if(clippings.mark[count].title == bookTitle){
			$("#markContainer").append('<div class="marklist" id="mark-'+matchNum+'"></div>');
			$("#mark-"+matchNum).append('<p class="content" id="content-'+matchNum+'"></div>');
			$("#mark-"+matchNum).append('<p class="position" id="position-'+matchNum+'"></div>');
			$("#mark-"+matchNum).append('<p class="time" id="time-'+matchNum+'"></div>');
			$("#content-"+matchNum).text(clippings.mark[count].content);
			$("#position-"+matchNum).text('您在位置 \#'+clippings.mark[count].position+' 的标注');
			$("#time-"+matchNum).text(clippings.mark[count].time);

			matchNum++;
		}
	}
	var leftBottom=80,rightBottom=80;
	for(var count=0; count<matchNum; count++){
		if(leftBottom<=rightBottom){
			$("#mark-"+count).css('left','133px');
			$("#mark-"+count).css('top',leftBottom+40);
			leftBottom += $("#mark-"+count).height()+40;
		}
		else{
			$("#mark-"+count).css('left','666px');
			$("#mark-"+count).css('top',rightBottom+40);
			rightBottom += $("#mark-"+count).height()+40;
		}
	}

	setTimeout("showMarkListFadeInAnimation()", 1100);
}

function hideMark(clippings,i){
	var bookNum = clippings.booklist.length;
	$(".nextMouseEvent").css('display','none');
	$(".marklist").fadeOut("1000");
	setTimeout("showBooktitleDownAnimation(clippings,"+i+")",500);
	setTimeout("$('.mouseEvent').css('display','block');",1000);
}

function getBooklistPos(i){
	return i*100;
}