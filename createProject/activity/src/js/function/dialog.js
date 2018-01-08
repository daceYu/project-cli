/**
 * 提示弹框
 * 依赖 dialog.css样式
 * Author: yugang <yugang@myhexin.com>
 */

if (!$) throw new Error('Error! need Zepto or jQuery.');

/**!
 * @ 显示提示弹框
 * @ param  {Object} options -> 弹框配置
 * @ Example :
 *	{ title: 'sfsdfsd', content: 'ewwaegsd',btns: [ 
 *		{ text: 'sure', callback: function () { console.log(1) } },
 *  	{ text: 'go', callback: function () { console.log(2) } }
 * 	]}
 */
let showWindow = (options) => {
    // 按钮html
    function getBtnHtml (btnArr) {
        return (btnArr ?
                    '<p class="t-w_btn u-line">' +
                        '<a class="u-btn_il ' + (btnArr[1] ? 'u-w50' : 'u-w t-w_btnc') + ' j-sure" href="javascript:void(0)">' + btnArr[0].text + '</a>' +
                        (btnArr[1] ? '<a class="t-w_btnc u-w50 j-go" href="javascript:void(0)">' + btnArr[1].text + '</a>' : '' ) +
                    '</p>'
                : '' );
    }
    // 按钮事件
    function btnEvent ($win) {
        $win.find('.j-sure').on('click', function () {
            if (options.btns[0].callback) options.btns[0].callback();
            else hideWindow();
        });
        if (options.btns[1]) {
            $win.find('.j-go').on('click', function () {
                if (options.btns[1].callback) options.btns[1].callback();
                else hideWindow();
            });
        }
    }
    if (!$('.t-win').length) {
        if (!options.title && !options.content) throw new Error('Error! no title or no content');

        var _html = '<div class="t-win_bg"></div>' +
                    '<div class="t-win">' +
                        '<h4 class="t-tit">' + (options.title ? options.title : '') + '</h4>' +
                        '<p class="t-w_p">' + (options.content ? options.content : '') + '</p>' +
                        getBtnHtml(options.btns) +
                    '</div>';

        var $win = $(_html);
        btnEvent($win);
        $('body').append($win);
    } else {
        if (options) {
            if (!options.title && !options.content) throw new Error('Error! no title or no content');
            var $win = $('.t-win');
            $win.find('.t-tit').text(options.title ? options.title : '');
            $win.find('.t-w_p').text(options.content ? options.content : '');
            if (options.btns) {
                var $btns = getBtnHtml(options.btns);
                
                $win.find('.t-w_btn').html($btns);
                btnEvent($win);
            }
        }
        $('.t-win, .t-win_bg').removeClass('z-hide');
    }
    // 弹框禁止滚动
	$(".t-win_bg,.t-win").on("touchmove",function (e) {
		e.preventDefault();
	})
};

/**!
 * @ 关闭提示弹框
 */
let hideWindow = () => {
    $('.t-win, .t-win_bg').addClass('z-hide');
}


export default {
    showWindow,
    hideWindow
}