//主函数
jQuery.fn.bcbk = function()
{
    bcbkobj = $(this),
    score = -1,
    counter = $('#count');

    var start = $('#start');
    start.click(function(){
        $(this).blackClick();
        timer = setTimeout(function(){
            counter.innerHTML = '时间到';
            setTimeout(function(){
                bcbkobj.children('table').gameOver();
            }, 500);
        }, 30000);//游戏限时30秒
    });
}
//黑块点击事件
jQuery.fn.blackClick = function() 
{
    var self = $(this),//当前块
        prt = self.parent(),//当前行
        next = prt.next(),//后一行
        prev = prt.prev();//前一行
    self.css({backgroundColor: '#ccc'});
    next.remove();//移除最下一行
    prt.parent().createRow();//最上添加一行
    prev.children('.b').click(function(){
        $(this).blackClick();//黑块点击事件绑定
    });
    prev.children('.w').click(function(){
        $(this).whiteClick();//白块点击事件绑定
    });
    jQuery.countScore();//分数加一
}
//白块点击事件
jQuery.fn.whiteClick = function() 
{
    var self = $(this);
    self.css({backgroundColor: '#f00'});
    setTimeout(function(){
        bcbkobj.children('table').gameOver();
    }, 300);
}
//创建一行
jQuery.fn.createRow = function() 
{
    var tr = $('<tr>');//创建行
    $(this).prepend(tr);//添加行
    var blk = Math.floor(Math.random()*4);
    for (var i = 0; i < 4; i++) {
        var td = $('<td>');//创建块
        if (i == blk) {
            td.addClass('b');
            
        } else {
            td.addClass('w');
        }
        tr.append(td);//添加块
    }
}
//结束游戏
jQuery.fn.gameOver = function() {
    clearTimeout(timer);
    counter.remove();
    $(this).html('<tr><td>GAME OVER<br><b>' + score + '</b><br><br><a href="javascript:;" onclick="window.location.reload();">重试</a></td></tr>');
}
//计数
jQuery.countScore = function() {
    score ++;
    counter.html(score);
}


//执行函数
jQuery(function($){
    //检测设备
    var isIPhone = /iPhone/i.test(navigator.userAgent),
        isIPad = /iPad/i.test(navigator.userAgent),
        isAndroid = /android/i.test(navigator.userAgent);
    if (isIPhone || isAndroid) {
        $('#container').height($(window).height());
    }
    $('#container').bcbk();
});