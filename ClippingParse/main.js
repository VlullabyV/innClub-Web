function parseMarkTxt(sourceStr){ // 主函数
    
    var tempStr = sourceStr;
    var clippings = {
        booklist:[],
        mark:[]
    };

    // 预处理文本
    tempStr = preprocessStr(tempStr);
    // 获取书单
    getBookList(clippings.booklist,tempStr);
    // 获取标注的具体信息
    getMarkInfo(clippings.mark,tempStr);

    return clippings;
}


function preprocessStr(sourceStr){
    // 匹配中文情况的Location
    var reg1 = /您在位置 \#(\d{1,4})-\d{1,4}的标注/g;
    while(reg1.exec(sourceStr))
        sourceStr = sourceStr.replace(reg1,"$1");
    var reg1 = /您在第 \d+ 页（位置 \#(\d+)-\d+）的标注/g;
    while(reg1.exec(sourceStr))
        sourceStr = sourceStr.replace(reg1,"$1");
    // 匹配英文情况的Location
	var reg2 = /Your Highlight on Location (\d{1,4})-\d{1,4}/g;
    while(reg2.exec(sourceStr))
        sourceStr = sourceStr.replace(reg2,"$1");
    // 匹配中文情况的time
    var reg3 = /添加于 (\d{1,4})年(\d{1,2})月(\d{1,2})日星期. (.)午(\d{1,2}):(\d{1,2}):(\d{1,2})/g;
    while(reg3.exec(sourceStr))
        sourceStr = sourceStr.replace(reg3,function(match, g1, g2, g3, g4, g5, g6, g7, index, origin){
            switch(g1.length){
                case 1: g1 += '000';break;
                case 2: g1 += '00';break;
                case 3: g1 += '0';break; 
            }
            if(g2.length == 1)
                g2 += '0';
            if(g3.length == 1)
                g3 += '0';
            if(g4 == '下')
                g5 = parseInt(g5, "10") + 12;
            if(g5.length == 1)
                g5 += '0';
            if(g6.length == 1)
                g6 += '0';
            if(g7.length == 1)
                g7 += '0';
            return g1+'-'+g2+'-'+g3+' '+g5+':'+g6+':'+g7;
            });
    // 匹配英文情况的time
    var reg4 = /Added on \w+, (\w+) (\d{1,2}), (\d{1,4}) (\d{1,2}):(\d{1,2}):(\d{1,2}) (\w)M/g;
    while(reg4.exec(sourceStr))
        sourceStr = sourceStr.replace(reg4,function(match, g1, g2, g3, g4, g5, g6, g7, index, origin){
            switch(g3.length){
                case 1: g3 += '000';break;
                case 2: g3 += '00';break;
                case 3: g3 += '0';break; 
            }
            switch(g1){
                case 'January':   g1 = '01';break;
                case 'February':  g1 = '02';break;
                case 'March':     g1 = '03';break;
                case 'April':     g1 = '04';break;
                case 'May':       g1 = '05';break;
                case 'June':      g1 = '06';break;
                case 'July':      g1 = '07';break;
                case 'August':    g1 = '08';break;
                case 'September': g1 = '09';break;
                case 'October':   g1 = '10';break;
                case 'November':  g1 = '11';break;
                case 'December':  g1 = '12';break;
        	}
            if(g3.length == 1)
                g3 += '0';
            if(g7 == 'P')
                g4 = parseInt(g4, "10") + 12;
            if(g4.length == 1)
                g4 += '0';
            if(g5.length == 1)
                g5 += '0';
            if(g6.length == 1)
                g6 += '0';
            return g3+'-'+g1+'-'+g2+' '+g4+':'+g5+':'+g6;
            });
    return sourceStr;
}

function getBookList(booklist,sourceStr){
    var count = 0;
    // 匹配书名 相同书名不重复匹配
    var reg1 = /(^(.+) \([^\(\)]+(?: \(.+\))?\)\n)(?!(.+\n\n(.+)?\n.+\n.+\n){0,}.+\n\n.+\n.+\n\1)/gm;
    var preprocessedBookList;
    while(preprocessedBookList = reg1.exec(sourceStr))
        booklist[count++] = preprocessedBookList[2];
}

function getMarkInfo(mark,sourceStr){
    var count = 0;
    // 匹配所有相关信息并分组
    var reg1 = /(.+) \(([^\(\)著]+)(?: \(.+\))?(?:著)?\)\n- (\d+) \| (.+)\n\n(.+)?/g;
    var preprocessedMark;
    while(preprocessedMark = reg1.exec(sourceStr)){
        if(preprocessedMark[5] != null){
            mark[count] = {
                title:preprocessedMark[1],
                author:preprocessedMark[2],
                position:preprocessedMark[3],
                time:preprocessedMark[4],
                content:preprocessedMark[5]
            };
            count++;
        }
    }
}

console.log(parseMarkTxt(sourceStr));
