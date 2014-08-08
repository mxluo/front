//计数
var score = 0,
    counter = document.getElementById('count');
function countScore() {
    score ++;
    counter.innerHTML = score;
}
//结束游戏
function gameOver() {
    clearTimeout(timer);
    tbody.innerHTML = '<tr><td>GAME OVER<br><b>' + score + '</b><br><br><a href="javascript:;" onclick="window.location.reload();">重试</a></td></tr>';
    counter.innerHTML = '';
}
//创建块 
function createTd(cla) {
    var td = document.createElement('td');
    td.className = cla;
    return td;
}
//创建一行
function createRow() {
    var tr = document.createElement('tr');
    var blk = Math.floor(Math.random()*4);
    for (var i = 0; i < 4; i++) {
        if (i == blk) {
            td = createTd('b');//创建黑块
            
        } else {
            td = createTd('w');//创建白块
        }

        tr.appendChild(td);
    }
    var first = tbody.getElementsByTagName('tr')[0];
    tbody.insertBefore(tr, first);
}

//向下移动
function goDown(el) {
    el.style.backgroundColor = '#ccc';
    var last = tbody.getElementsByTagName('tr')[3];

    tbody.removeChild(last);//删除最下一行
    createRow();
}

//绑定点击
function bindClick() {
    var blocks = tbody.getElementsByTagName('tr')[2].getElementsByTagName('td');;
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        if (block.className == 'b') {
            block.onclick = function(){//绑定黑块点击事件
                goDown(this);
                countScore();
                bindClick();//绑定下一个块点击事件
            }
        } else {
            block.onclick = function(){//绑定白块点击事件
                this.style.backgroundColor = '#f00';
                setTimeout("gameOver()", 300);
            }
        }
    };
    
}


var tbody = document.getElementById('container').getElementsByTagName('tbody')[0];

//开始
var start = document.getElementById('start');
start.onclick = function() {
    goDown(this);
    bindClick();
    timer = setTimeout(function(){
        counter.innerHTML = '时间到';
        setTimeout("gameOver()", 500);
    }, 30000);//游戏限时30秒
}
//检测设备
// window.onload = function () {
//     var isIPhone = /iPhone/i.test(navigator.userAgent),
//         isIPad = /iPad/i.test(navigator.userAgent),
//         isAndroid = /android/i.test(navigator.userAgent);
//     if (isIPhone || isAndroid) {
//         document.getElementById('container').style.height = window.screen.height/2 + 'px';
//     }
    
// }