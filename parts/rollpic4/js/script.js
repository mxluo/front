/* 
 *@description 可向四个方向滚动的图片
 *@author Vicky Roman
*/
jQuery(document).ready(function($) {

    $('.goright').click(function() {
        var current = $('img.current');
        var imgs = current.parent().children();
        if (imgs.last().hasClass('current')) {
            var next_img = imgs.first();
        } else {
            var next_img = current.next('img');
        }
        next_img.css({
            'left': '100%',
            'top': 0,
            'display': 'block'
        });
        current.animate({left:'-100%'}, function() {
            current.removeClass('current');
            current.css('display', 'none');
        });
        next_img.animate({left:0}, function() {
            next_img.addClass('current');          
        });
    });


    $('.goleft').click(function() {
        var current = $('img.current');
        var imgs = current.parent().children();
        if (imgs.first().hasClass('current')) {
            var next_img = imgs.last();
        } else {
            var next_img = current.prev('img');
        }
        next_img.css({
            'left': '-100%',
            'top': 0,
            'display': 'block'
        });
        current.animate({left:'100%'}, function() {
            current.removeClass('current');
            current.css('display', 'none');
        });
        next_img.animate({left:0}, function() {
            next_img.addClass('current');          
        });
    });


    $('.gotop').click(function() {
        var current = $('img.current');
        var imgs = current.parent().children();
        if (imgs.first().hasClass('current')) {
            var next_img = imgs.last();
        } else {
            var next_img = current.prev('img');
        }
        next_img.css({
            'top': '-100%',
            'left': 0,
            'display': 'block'
        });
        current.animate({top:'100%'}, function() {
            current.removeClass('current');
            current.css('display', 'none');
        });
        next_img.animate({top:0}, function() {
            next_img.addClass('current');          
        });
    });


    $('.gobottom').click(function() {
        var current = $('img.current');
        var imgs = current.parent().children();
        if (imgs.last().hasClass('current')) {
            var next_img = imgs.first();
        } else {
            var next_img = current.next('img');
        }
        next_img.css({
            'top': '100%',
            'left': 0,
            'display': 'block'
        });
        current.animate({top:'-100%'}, function() {
            current.removeClass('current');
            current.css('display', 'none');
        });
        next_img.animate({top:0}, function() {
            next_img.addClass('current');          
        });
    });
});