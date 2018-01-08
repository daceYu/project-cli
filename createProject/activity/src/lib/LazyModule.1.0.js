// @charset "utf-8";

/*!
 * 
 *   页面模块加载工具 beta
 *   LazyModule.js 依赖于zepto或jQuery
 *   支持懒加载、顺序加载
 *   *核心函数 $.fn.rendModule
 * 
 *   @模板组件规范：
 *   		1.css：在<style></style>标签内
 *   		2.js: 在<script></script>标签内
 *   		3.{{}} 内容会被解析替换
 *       4.{for} ...[param]... {end} 内容将被数组循环解析
 * 
 *   @build time: 2017.06.15
 *   @author: Micheal Wang
 *   @param {Object} options: 加载参数对象
 *   		 {String} type: 加载类型；'onebyone' || 'lazy'
 * 	     {String} srcid: 模块url || dom节点的data-srcid属性值
 *  		 {Object} value: 渲染数值 || dom节点的data-value属性值
 * 		 {Function} callback: 回调函数
 * 		 {Object} animate: 动画 time动画时间
 * 
 *   @return {Object} window.mdUrls: 模板列表缓存
 * 
 *   @example:
 *   		demo：http://testfund.10jqka.com.cn/ifundapp_app/public/lazymodule/example/
 * 
 *   		<div class="j-render" data-srcid="components/top.html">
 *   		<div class="j-render" data-srcid="components/content.html">
 *   		<div class="j-render" data-srcid="components/footer.html">
 * 
 *   		var loader = new LazyModule({
 *   			domclass: '.j-render',
 *   			type: 'lazy'
 *   			rendOption: {
 *   				animate: {
 *   					time: 500
 *   				},
 *   				value: {
 *   					fundname: 'hahhaha',
 *   					bottomcolor: '#f00'
 *   				},
 *   				callback: function ($t) {
 *   					console.log($t, 'ready')
 *   				}
 *   			}
 *   		});
 * 
 *   		loader.init();
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "D:\\build\\dist\\lazymodule\\dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = judge;
/*
* judge components in horizon
*/

var winWidth = $(window).width(),
	winHeight = $(window).height();

var reg = /{{(.*)}}/gi,
	cssreg = /<style>(([\s\S])*?)<\/style>/gi,
	jsreg = /<script>(([\s\S])*?)<\/script>/gi;

var array = /\{for\}([\s\S*]+?)\{end\}/gi,
    arrayreg = /\[(.*)\]/;

/*
* 加载模块，核心
* @param {Object} options: 加载参数
*	     {String} srcid: 模块url || dom节点的data-srcid属性值
* 		 {Object} value: 渲染数值 || dom节点的data-value属性值
*		 {Function} callback: 回调函数
*		 {Object} animate: 动画 time动画时间
* @return {Object} window.mdUrls: 模板列表缓存
*/
;(function ($) {
	if (!$ || typeof ($.fn.rendModule) == 'function') return false; 

    // render html
    // @param {dom Object} $ctn: 渲染节点；
    // @param {String} data: 模板字符串；
    // @param {Object} data: 数据变量对象；
	function renderHTML ($ctn, data, valObj) {
        var _data = data.toString().trim();
        var _js;
        if (valObj) {
            var _obj = valObj;

            // 渲染单独数据
            var regArr = _data.match(reg);
            if (regArr) {
                _data = _data.replace(reg, function (matches, m1) {

                    var _m1 = m1.trim();
                    return _obj[_m1] || ''
                });
            }

            // 渲染数组数据
            var _arrRes = _data.match(array);
            if (_arrRes) {
                var _arrayHtml = '';
                var _html = _arrRes[0].replace(array, function (matches, m1) {
                    return m1;
                });

                var _arrayobj = _html.match(arrayreg);
                if (_arrayobj && _obj[_arrayobj[1]] && _obj[_arrayobj[1]] instanceof Array) {
                    for (var i in _obj[_arrayobj[1]]) {
                        _arrayHtml += _html.replace(arrayreg, _obj[_arrayobj[1]][i]);
                    }
                }
                _data = _data.replace(array, _arrayHtml);
            }

            _js = _data.match(jsreg);
            if (_js) {
                _data = _data.replace(jsreg, '');
            }
        }

        $ctn.html(_data);
        if (_js) $('body').append($(_js[0]));
    }
    $.fn.rendModule = function(options) {
        var $t = $(this);
        if ($t.attr('rendered')) return false;

        var url = $t.attr('data-srcid');
        var valObj = $t.attr('data-value');
        var callback = options ? options.callback : null;
        url = url ? url : (options && options.srcid ? options.srcid : null);
        valObj = valObj ? JSON.parse(valObj) : (options && options.value ? options.value : null);

        if (!url) {
            return
        }

        var _animate = options.animate;
        $t.attr('rendered', true).removeAttr('data-srcid').removeAttr('data-value');

        function fadeIn (callback) {
            $t.css('opacity', 0).animate({'opacity': 1}, _animate.time || 300, callback($t));
        }

        if (window.mdUrls[url]) {
            renderHTML($t, window.mdUrls[url], valObj);
            if (_animate) {
                fadeIn(callback);
            } else if (callback) callback($t);
        } else {
            $.ajax({
                url: url,
                error: function (error) {
                    console.log(error);
                },
                success: function (data) {
                    if (!data) return false;

                    window.mdUrls[url] = data.replace(cssreg, '');

                    renderHTML($t, data, valObj);
                    if (_animate) {
                        fadeIn(callback);
                    } else if (callback) callback($t);
                }
            });
        }
    };
}) ($);


function judge ($ctns, prevlength, options) {
    var scrollTop = $(window).scrollTop();

    for (var i = 0, clength = $ctns.length; i < clength; i++) {
        var ctnTop = $ctns.eq(i).offset().top,
            ctnHeight = $ctns.eq(i).offset().height;

        if (ctnTop - prevlength <= scrollTop + winHeight && ctnTop + ctnHeight >= scrollTop - prevlength) {
            $ctns.eq(i).rendModule(options);
        }
    }
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export debounce */
/* unused harmony export scrollEnd */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return scrollEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return removeScrollEvent; });
/*
* scroll event
*/

// judge Platform is pc
// @return {Boolean} flag: 是否为pc
/*function isPC () {  
   var userAgentInfo = navigator.userAgent.toLowerCase();
   var Agents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];
   var flag = true;  
   for (var v = 0; v < Agents.length; v++) {  
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return flag;  
}*/


function scrollEnd (func, $ctns, prelength, options) {
	if (!func) throw new Error('Error!no scroll function!');

	var t1 = $(window).scrollTop();

	var timer = setInterval(function () {
		var t2 = $(window).scrollTop();

		if (Math.abs(t1 - t2) < 1.5) {
			clearInterval(timer);
			func($ctns, prelength, options);
		} else {
			t1 = t2;
		}
	}, 35);
}

function scrollEvent (func) {
	if (!func) throw new Error('Error!no scroll function!');

	window.addEventListener('load', function () {
		window.addEventListener('scroll', func, false);
	}, false);
}

function removeScrollEvent (func) {
    if (!func) throw new Error('Error!no scroll function!');

	window.removeEventListener('scroll', func);
}

// 简单的防抖动函数
function debounce (func, wait, immediate) {
    // 定时器变量
    var timeout;
    return function() {
        // 每次触发 scroll handler 时先清除定时器
        clearTimeout(timeout);
        // 指定 xx ms 后触发真正想进行的操作 handler
        timeout = setTimeout(func, wait);
    };
};




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scroll__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__judge__ = __webpack_require__(0);
/*
* entry.js
*/






window.mdUrls = {};
function LazyModule (options) {
	if (!Zepto && !jQuery) return false;
	if (!options.domclass) {
		throw new Error ('Error! No module dom class find!');
		return false;
	}

	this.opts = options;
	this.dom = $(options.domclass);

	this.opts.prelength = options.prelength || 0;
	this.rendOption = options.rendOption || '';
}

LazyModule.prototype = {
	getModule: $.fn.rendModule,
	onebuyone: function () {
		var THIS = this,
			domLength = THIS.dom.length;

		var _callback = THIS.rendOption.callback ? THIS.rendOption.callback : null;
		function load (index) {
			THIS.rendOption.callback = function ($t) {
				if (index >= domLength) return false;

				if (_callback) _callback($t);
				load(index + 1);
			}
			THIS.dom.eq(index).rendModule(THIS.rendOption);
		}

		load(0);
	},
	lazyload: function () {
		var THIS = this;

		var timeout;
		function init () {
			clearTimeout(timeout);
			if (THIS.dom.length === $('[rendered=true]').length) {

				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__scroll__["a" /* removeScrollEvent */])(init);
				return false;
			}

	        timeout = setTimeout(function () {
	        	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__judge__["a" /* default */])(THIS.dom, THIS.opts.prelength, THIS.rendOption)
	        }, 200);
		}

		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__judge__["a" /* default */])(THIS.dom, THIS.opts.prelength, THIS.rendOption);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__scroll__["b" /* scrollEvent */])(init);
	},
	init: function () {
		var THIS = this;
		switch (THIS.opts.type) {
			case 'lazy': THIS.lazyload(); break;
			case 'onebyone': THIS.onebuyone(); break;
		}
	}
};

window.LazyModule = LazyModule;


/***/ })
/******/ ]);