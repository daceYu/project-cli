/**
 * 交互
 * Author: yugang <yugang@myhexin.com>
 */

if (!$) throw new Error('Error! need Zepto or jQuery.');

/**!
 * @ 控制浮动按钮的显示
 * @ param fixDom: 浮动对象
 * @ param specDom: 浮动条件对象
 */
let setFixBtn = (fixDom,specDom) => {
    ;(function() {
        var win_height = specDom.offset().top + specDom.height() || $(window).height();
        var $fix = fixDom;
        var _top = $(window).scrollTop();
        
        if (_top >= win_height) {
            $fix.removeClass('z-hide');
        } else {
            $fix.addClass('z-hide');
        }

        $(window)[0].addEventListener('scroll', function() {
            var _top = $(window).scrollTop();
            if (_top >= win_height) {
                $fix.removeClass('z-hide');
            } else {
                $fix.addClass('z-hide');
            }
        })
    }());
}

/**
 * 滚动效果实现(用背景图实现)
 * param {Boolean} isBegin => 是否在滚动中  true:是 false:否
 * param {Number} objHeight => 每个滚动元素的高度(单位为px)
 * param {Number} objNum => 一共有多少个滚动元素
 * param {Number} result => 滚动的最终位置.  
 *            eg: 
 *                 111 => 表示每个元素都滚动到第二个元素
 *                 323 => 表示第一、第三个滚动对象滚动到第4个元素
 *                            第二个滚动对象滚动到第3个元素
 * param {Function} cb => 滚动结束的回调函数
 */
let scroll = (isBegin, objHeight, objNum, result, cb) => {
    if (isBegin) return false;
    isBegin = true;

    result = (result + '').split('');
    var $dom = $(".lhj-goods a");

    $dom.each(function(index){
        var $t = $(this);
        var loc = (objHeight * 10 * objNum - (objHeight * result[index])) + "px";
        setTimeout(function(){
            $t.animate({
                backgroundPosition: 'center ' +  loc
            },{
                duration: objNum * 1000 + index * 3000,
                easing: "ease",
                complete: function(){
                    if ( index == $dom.length - 1 ) {
                        isBegin = false;
                        cb();
                    }
                }
            });
        }, index * 300);
    });
}


export default {
    setFixBtn,
    scroll
}