jQuery.fn.progressbar = function(par) {
    //默认值
    var def = {
        width: '100%',
        height: '20px',
        initValue: '20%',
        barColor: '#428bca',
        bgColor: '#f5f5f5',
        borderRadius: '4px',
        striped: false,
        active: false,
        autoIncrease: false,
        speed: 2000
    };
    var opt = jQuery.extend(def, par);

    //外元素样式
    var out_bar = $(this);
    out_bar.css({
        width: opt.width,
        height: opt.height,
        backgroundColor: opt.bgColor,
        borderRadius: opt.borderRadius,
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
    });
    //内元素样式
    var bar = $('<div>');
    bar.css({
        width: opt.initValue,
        height: '100%',
        backgroundColor: opt.barColor,
        borderTopLeftRadius: 'inherit',
        borderBottomLeftRadius: 'inherit'
    });
    if (opt.initValue == '100%') {
        bar.inhRadius();
    }
    //条纹
    if (opt.striped) {
        var bg_img = 'linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)';
        bar.css({
            backgroundImage: bg_img,
            backgroundSize:'40px 40px'
        });
        //动态条纹
        if (opt.active) {
            bar.css('background-position-x', '40px');
            setInterval(function(){
                var bpx = bar.css('background-position-x');
                bar.css('background-position-x', (parseInt(bpx) - 1) + 'px');
                if (bpx == '0') {
                    bar.css('background-position-x', '40px');
                }
            }, 50);
        }
    }

    bar.appendTo(out_bar);

    //自动前进
    if (opt.autoIncrease) {
        bar.animate({width: '100%'}, opt.speed, function () {
            bar.inhRadius();
        });
    }
}
//继承右侧圆角
jQuery.fn.inhRadius = function(){
    $(this).css({
            borderTopRightRadius: 'inherit',
            borderBottomRightRadius: 'inherit'
        });
}