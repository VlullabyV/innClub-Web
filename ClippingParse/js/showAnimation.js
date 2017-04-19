function showListRespondAnimation(i){
	var $booklist = $("#book-"+i);
	$booklist.css('background-color', '#a9a9a9');
	$booklist.css('color', 'white');
	$booklist.animate({left: "50px"}, 50);
}

function showListReturnAnimation(i){
	var $booklist = $("#book-"+i);
	$booklist.css('background-color', '#272822');
	$booklist.css('color', '#92cfa8');
	$booklist.animate({left: "0px"}, 50);
}

function showBooktitleFadeOutAnimation(clippings,i){
	var bookNum = clippings.booklist.length;
	for(var count=0; count<bookNum; count++){
		if(count != i){	
			$booklist = $("#book-"+count);
			//$booklist.fadeOut("500");
			$booklist.animate({
				top: getBooklistPos(count),
				left: "200px",
				opacity: 0,
			}, 500);
		}
	}
	$booklist = $("#book-"+i);
	var oTop = $booklist.offset().top;
	var sTop = $(window).scrollTop();
	var titleTop = oTop - sTop;
	if(sTop != 0)
		setTimeout("$booklist.css('top','"+titleTop+"px');", 500);
	setTimeout("scrollTo(0,0);", 490);
	setTimeout("$booklist.animate({top: 0}, "+500+");", 600);

}

function showMarkListFadeInAnimation(){
	$(".marklist").animate({
		opacity:1,
	}, 1000);

}

function showBooktitleDownAnimation(clippings,i){
	$booklist = $("#book-"+i);
	$booklist.animate({top: getBooklistPos(i)}, 500);
	setTimeout("showBooktitleFadeInAnimation(clippings,"+i+");", 500);
}

function showBooktitleFadeInAnimation(clippings,i){
	var bookNum = clippings.booklist.length;
	for(var count=0; count<bookNum; count++){
		if(count != i){	
			$booklist = $("#book-"+count);
			$booklist.css('left', '-200px');
			$booklist.animate({
				top: getBooklistPos(count),
				left: "0",
				opacity: 1,
			}, 500);
		}
	}
}