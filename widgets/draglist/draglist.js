//获取鼠标位置 
function getMousePos(e) {
    return {
        x: e.pageX || e.clientX + document.body.scrollLeft,
        y: e.pageY || e.clientY + document.body.scrollTop
    }
}
//获取元素位置 
function getElementPos(el) {
    return {
        x: el.offsetParent ? el.offsetLeft + arguments.callee(el.offsetParent)['x'] : el.offsetLeft,
        y: el.offsetParent ? el.offsetTop + arguments.callee(el.offsetParent)['y'] : el.offsetTop
    }
}
//获取元素尺寸 
function getElementSize(el) {
    return {
        width: el.offsetWidth,
        height: el.offsetHeight
    }
}
//创建分隔线 
function createLine(co) {
    var div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = '1px';
    div.style.fontSize = '0';
    div.style.background = co;
    div.style.opacity = '0.5';
    return div;
}


//主函数
function dragList(obj,par) {
    var obj = document.getElementById(obj);
    var def = {lineColor:"#f00", itemColor:"#d4d4d4"};
    if (par == undefined) {
        par = def;
    } else {
        for (var k in def) {
            if (par.k == undefined) {
                par.k = def[k];
            }
        }       
    }
    var div = createLine(par.lineColor);
    //禁止选择 
    obj.onselectstart = function() {
        return false;
    }
    //判断是否有挪动 
    var MOVE = {};
    MOVE.isMove = false;
    //事件
    obj.onmousedown = function(event) {
        //获取列表顺序 
        var lis = obj.getElementsByTagName('li');
        for (var i = 0; i < lis.length; i++) {
            lis[i]['pos'] = getElementPos(lis[i]);
            lis[i]['size'] = getElementSize(lis[i]);
        }
        event = event || window.event;
        var t = event.target || event.srcElement;
        if (t.tagName.toLowerCase() == 'li') {
            var p = getMousePos(event);
            var el = t.cloneNode(true);
            el.style.position = 'absolute';
            el.style.left = t.pos.x + 'px';
            el.style.top = t.pos.y + 'px';
            el.style.width = t.size.width + 'px';
            el.style.height = t.size.height + 'px';
            el.style.border = '1px solid '+ par.itemColor;
            el.style.background = par.itemColor;
            el.style.opacity = '0.7';
            document.body.appendChild(el);

            document.onmousemove = function(event) {
                event = event || window.event;
                var current = getMousePos(event);
                el.style.left = t.pos.x + current.x - p.x + 'px';
                el.style.top = t.pos.y + current.y - p.y + 'px';
                obj.style.cursor = 'move';

                //判断插入点 
                for (var i = 0; i < lis.length; i++) {
                    if (current.x > lis[i]['pos']['x'] && current.x < lis[i]['pos']['x'] + lis[i]['size']['width'] && current.y > lis[i]['pos']['y'] && current.y < lis[i]['pos']['y'] + lis[i]['size']['height'] / 2) {
                        if (t != lis[i]) {
                            MOVE.isMove = true;
                            obj.insertBefore(div, lis[i]);
                        }

                    } else if (current.x > lis[i]['pos']['x'] && current.x < lis[i]['pos']['x'] + lis[i]['size']['width'] && current.y > lis[i]['pos']['y'] + lis[i]['size']['height'] / 2 && current.y < lis[i]['pos']['y'] + lis[i]['size']['height']) {
                        if (t != lis[i]) {
                            MOVE.isMove = true;
                            obj.insertBefore(div, lis[i].nextSibling);
                        }
                    }
                }
            }
            //移除事件 
            document.onmouseup = function(event) {
                event = event || window.event;
                document.onmousemove = null;
                if (MOVE.isMove) {
                    obj.replaceChild(t, div);
                    MOVE.isMove = false;
                }
                document.body.removeChild(el);
                el = null;
                obj.style.cursor = 'normal';
                document.onmouseup = null;
            }
        }
    }
}