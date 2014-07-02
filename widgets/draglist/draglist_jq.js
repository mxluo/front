jQuery.fn.dragList = function(par) {
    var def = {
        lineColor: "#f00",
        itemColor: "#4b4b4b"
    }
    var opt = jQuery.extend(def, par);
    
    var obj = $(this);
    //禁止选择
    obj.bind("selectstart",function(){return false;});   

    var items = obj.find('li');
    //事件
    items.mousedown(function(event) {
        if (event.target == this) {
            var self = $(this);
            var self_pos = self.position();
            var self_left = self_pos.left;
            var self_top = self_pos.top;

            var org_m_pos = getMousePos(event);
            //克隆元素
            var copy = self.clone(true, true).css({
                position: 'absolute',
                left: self_left,
                top: self_top,
                width: self.width(),
                height: self.height(),
                backgroundColor: opt.itemColor,
                border: '1px solid ' + opt.itemColor,
                opacity: '0.7'
            }).appendTo(obj);

            var line = createLine(opt.lineColor);
            var is_move = false;

            obj.mousemove(function(event) {
                var m_pos = getMousePos(event);
                copy.css('left', self_left + m_pos.x - org_m_pos.x);
                copy.css('top', self_top + m_pos.y - org_m_pos.y);
                obj.css('cursor', 'move');

                items.each(function() {
                    var item = $(this);
                    var item_pos = item.position();
                    var item_left = item_pos.left;
                    var item_top = item_pos.top;
                    var item_width = item.width();
                    var item_height = item.height();
                    if (m_pos.x > item_left && m_pos.x < item_left + item_width && m_pos.y > item_top && m_pos.y <= item_top + item_height/2) {
                        if (item[0] != self[0]) {
                            is_move = true;
                            item.before(line);                            
                        }
                        
                    } else if (m_pos.x > item_left && m_pos.x < item_left + item_width && m_pos.y > item_top + item_height/2 && m_pos.y <= item_top + item_height) {
                        if (item[0] != self[0]) {
                            is_move = true;
                            item.after(line);                            
                        }
                    }                   
                });
            }).mouseup(function(event) {
                copy.remove();
                if (is_move) {
                    is_move = false;
                    $(line).replaceWith(self);
                }
                obj.unbind('mousemove').unbind('mouseup');
            });
        }
    });
}

//获取鼠标位置
jQuery.getMousePos = function(e) {
    return {
        x : e.originalEvent.x || e.originalEvent.layerX || 0, 
        y : e.originalEvent.y || e.originalEvent.layerY || 0
    }
}
//创建分隔线 
jQuery.createLine = function(co) {
    var div = $('<div>');
    div.css({
        width: '100%',
        height: '1px',
        fontSize: '0',
        backgroundColor: co,
        opacity: '0.5'
    });
    return div;
}