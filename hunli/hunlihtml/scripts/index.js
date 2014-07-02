jQuery(document).ready(function($) {

    //banner 菜单切换
    $('.monthly .active').bannerUp();
    $('.monthly li').click(function(event) {
        $(this).bannerUp();
    });
    $('.monthly .prev').click(function(event) {
        var now = $(this).siblings('.now');
        var sbl = $(this).siblings('li');
        var fst = sbl.first();
        if (fst.hasClass('now')) {
            sbl.last().bannerUp();
        } else {
            now.prev('li').bannerUp();
        }
    });
    $('.monthly .next').click(function(event) {
        var now = $(this).siblings('.now');
        var sbl = $(this).siblings('li');
        var lst = sbl.last();
        if (lst.hasClass('now')) {
            sbl.first().bannerUp();
        } else {
            now.next('li').bannerUp();
        }
    });

    //图片案例ie8lastchild
    $('.photo-list ul li:last').css('margin-left', '-100%');
    
    //团队图片切换
    $('.team-list ul .active').teamChange();
    $('.team-list ul li').click(function(event) {
        $(this).teamChange();
    });
    $('.team-list .prev').click(function(event) {
        var active = $('.team-list ul .active');
        var lis = $('.team-list ul li');
        var fst = lis.first();
        if (fst.hasClass('active')) {
            lis.last().teamChange();
        } else {
            active.prev('li').teamChange();
        }
    });
    $('.team-list .next').click(function(event) {
        var active = $('.team-list ul .active');
        var lis = $('.team-list ul li');
        var lst = lis.last();
        if (lst.hasClass('active')) {
            lis.first().teamChange();
        } else {
            active.next('li').teamChange();
        }
    });
    //wiki切换
    $('.wiki-list .prev').click(function(event) {
        var prt = $(this).parent();
        var num = prt.children('li').length;
        var mar = parseInt(prt.css('margin-left'));
        if (mar >= 0) {
            prt.animate({marginLeft: -240*(num-1),},400);
        } else {
            prt.animate({marginLeft: mar+240,},400);
        }
    });
    $('.wiki-list .next').click(function(event) {
        var prt = $(this).parent();
        var num = prt.children('li').length;
        var mar = parseInt(prt.css('margin-left'));
        if (mar <= -240*(num-1)) {
            prt.animate({marginLeft: 0,},400);
        } else {
            prt.animate({marginLeft: mar-240,},400);
        }
    });
});
//banner 菜单切换
jQuery.fn.bannerUp = function() {
    var self = $(this);
    var cl = self.children('.clone');
    self.siblings('li').each(function() {
        sb = $(this);
        if (sb.hasClass('now')) {
            sb.removeClass('now');
            sb.children('.clone').hide();
        }
    });
    if (cl.length == 0) {
        self.clone().css({
            position: 'absolute',
            left: self.position().left,
            bottom: 0,
            backgroundColor: '#d33937',
            color: '#fff'
        }).addClass('clone').appendTo(self).hide().children('.info').show().end().slideDown();
        self.addClass('now');

    } else {
        cl.slideDown();
        self.addClass('now');
    }
}
//团队图片切换
jQuery.fn.teamChange = function() {
    var self = $(this);
    self.siblings('li').removeClass('active');
    $('#team').empty();
    self.addClass('active').children('.team-person').clone(false, true).appendTo('#team');
}