/**
 * 获取用户信息
 * 依赖 客户端
 * Author: yugang <yugang@myhexin.com>
 */

if (!$) throw new Error('Error! need Zepto or jQuery.');

/**!
 * @ 判断访问来源
 * @ return  {String} ths || ifund || browser
 */
let getPlat = () => {
    var _sys = location.pathname.split('/');
    if (_sys.indexOf('public') > -1) {
        _sys = _sys[_sys.indexOf('public') - 1].split('_')[0];
    }
    switch (_sys) {
        case 'scym':
            platform = 'ths';
            break;
        case 'ifundapp':
            platform = 'ifund';
            break;
        default:
            platform = 'browser';
    }
    return platform;
}

/**
 * 区分用户是否登录
 * param {Object} data => 回调函数所需部分参数
 * param {Boolean} flag => 未登录是否需要调登录  true:不调用  false:调用
 * param {Function} cb => 已登录的回调函数
 */
let isLogin = (data, cb, flag) => {
    var sys = getPlat();
    if(sys == "ths"){
        if(getAccount() == 0){
            if (!flag) {
                var timer = setInterval(function () { //手炒登录以后刷新页面
                    if(getAccount() != 0){
                        window.location.reload();
                    }
                },1000);
                location.href = "http://eqhexin/changeUser";
            }
        }else{
            data.scuid = getUserid("userid");
            cb(data);
        }
    }else{
        /*window.userinfo = {
            // 老用户
            custId: '100100008782',
            encryptionCustId: '5905900518239'
            // 新用户 已体验
            // custId: '100100009325',
            // encryptionCustId: '5905900550276'
            // 新用户 未体验
            // custId: '100100009327',
            // encryptionCustId: '5905900550394'
        }*/
        ifundBasic.getUserinfo(function(){
            data.custid = window.userinfo.custId;
            data.encryptcustid = window.userinfo.encryptionCustId;
            cb(data);
        }, flag);
    }
}

/**
 * post方法
 * param {String} url => 请求地址
 * param {Object} data => 发送的数据
 * param {Function} successfunc => 发送成功的回调函数
 * param  {Function} errorfunc -> 请求失败的回调函数
 */
let ajaxPost = (url, data, successfunc, errorfunc) => {
    // loading
    var timer = setTimeout(function () {$.fundLoading();}, 400); 
    $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (info) {
            $.hideFundLoading();    // loading end
            clearTimeout(timer);
            successfunc.call(this, info);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.hideFundLoading();    // loading end
            clearTimeout(timer);
            if (errorfunc) {
                errorfunc();
                return false;
            }
            // alert('系统错误：' + XMLHttpRequest.status + ',' + XMLHttpRequest.readyState + '.' + textStatus);
        }
    });
};

export default {
    getPlat,
    isLogin,
    ajaxPost
}