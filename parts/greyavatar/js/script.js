/* 
 *@description canvas灰白头像
 *@author Vicky Roman
*/
window.onload = function() {
    var avatars = document.getElementsByTagName('img');
    for (var i = 0; i < avatars.length; i++) {
        convertToGS(avatars[i]);        
    };
}
function convertToGS(img) {
    //储存原始彩色版
    img.color = img.src;
    //创建灰度版
    img.grayscale = createGSCanvas(img);
    //切换图片
    var prt = img.parentNode;
    prt.onmouseover = function() {
        img.src = img.color;
    }
    prt.onmouseout = function() {
        img.src = img.grayscale;
    }

    img.src = img.grayscale;
}

function createGSCanvas(img) {

    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var c = ctx.getImageData(0, 0, img.width, img.height);
    for (var i = 0; i < c.height; i++) {
        for (var j = 0; j < c.width; j++) {
            var x = (i*4) * c.width + (j*4);
            var r = c.data[x];
            var g = c.data[x+1];
            var b = c.data[x+2];
            c.data[x] = c.data[x+1] = c.data[x+2] = (r+g+b)/3;
        }
    }

    ctx.putImageData(c, 0, 0, 0, 0, c.width, c.height);

    return canvas.toDataURL();
}