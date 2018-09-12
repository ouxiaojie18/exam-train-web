function rate(obj, oEvent) {
    // 图片地址设置
    var imgSrc = './img/start.png'; //没有填色的星星
    var imgSrc_2 = './img/start-active.png'; //打分后有颜色的星星,这里的star_full图片时实心的有颜色的五星。
    if (obj.rateFlag) return;
    var e = oEvent || window.event;
    var target = e.target || e.srcElement;
    var imgArray = obj.getElementsByTagName("img");
    for (var i = 0; i < imgArray.length; i++) {
        imgArray[i]._num = i;
        imgArray[i].onclick = function () {
            if (obj.rateFlag) return;
            obj.rateFlag = true;
        };
    }
    if (target.tagName == "IMG") {
        for (var j = 0; j < imgArray.length; j++) {
            if (j <= target._num) {
                imgArray[j].src = imgSrc_2;
            } else {
                imgArray[j].src = imgSrc;
            }
        }
    } else {
        for (var k = 0; k < imgArray.length; k++) {
            imgArray[k].src = imgSrc;
        }
    }
}