/*@charset "utf-8"*/

/*!
 * 
 * ImgLoad.js  图片加载
 * *针对图片过多或过大的页面，可使用该插件选择合适的图片加载方式。目前支持顺序加载、延时加载以及懒加载。
 * *兼容：
 * 	PC端—IE6+（IE6不支持base64格式图片）；移动端。
 * @v2.2新增：支持webp格式；（如设置window._NOWEBP = true，则不启动webp）
 * 
 * @author: Micheal Wang
 * @update time: 2017.06.03
 * 
 * @example: 
 * 	var loader = new ImgLoad({  type: “lazy”, domclass: “lazyImg”  });
 * 	Lader.init();
 * 
 * @参数
 * 	@param {String} type（配置options），必选：onebyone顺序加载 || timeout延时加载 || lazy懒加载；
 * 	@param {String} domclass（配置options），必选: 图片检索class；
 * 	@param {dom Object} container（配置options），可选：加载容器；
 *  	@param {String} param（可选）：
 * 		type为”lazy”时，param表示页面加载完时最多渲染图片的数量；
 * 		type为”timeout”时，param表示延时的时间间隔；
 * 
 * @方法
 * 	init()函数 触发加载器；
 * 	justrender()函数单加载某张图片；
 * 		@param {dom Object} obj：需要加载的img节点；
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define("ImgLoad", [], factory);else if (typeof exports === 'object') exports["ImgLoad"] = factory();else root["ImgLoad"] = factory();
})(this, function () {
	return (/******/function (modules) {
			// webpackBootstrap
			/******/ // The module cache
			/******/var installedModules = {};

			/******/ // The require function
			/******/function __webpack_require__(moduleId) {

				/******/ // Check if module is in cache
				/******/if (installedModules[moduleId])
					/******/return installedModules[moduleId].exports;

				/******/ // Create a new module (and put it into the cache)
				/******/var module = installedModules[moduleId] = {
					/******/exports: {},
					/******/id: moduleId,
					/******/loaded: false
					/******/ };

				/******/ // Execute the module function
				/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

				/******/ // Flag the module as loaded
				/******/module.loaded = true;

				/******/ // Return the exports of the module
				/******/return module.exports;
				/******/
			}

			/******/ // expose the modules object (__webpack_modules__)
			/******/__webpack_require__.m = modules;

			/******/ // expose the module cache
			/******/__webpack_require__.c = installedModules;

			/******/ // __webpack_public_path__
			/******/__webpack_require__.p = "./dist/imgload/dist/";

			/******/ // Load entry module and return exports
			/******/return __webpack_require__(0);
			/******/
		}(
		/************************************************************************/
		/******/[
		/* 0 */
		/***/function (module, exports) {

			var dpr = window.devicePixelRatio > 1 ? 2 : 1;
			var suffix = '_' + dpr + 'x.';
			var winHeight = parseInt(window.innerHeight || document.documentElement.clientHeight),
			    winWidth = parseInt(window.innerWidth || document.documentElement.clientWidth);
			var scTop = document.documentElement.scrollTop || document.body.scrollTop;
			scTop = parseInt(scTop);

			// support webp?
			// @param {Function} callback: callback function
			// window._NOWEBP 不启用webp
			// window._WEBP webView是否支持webp
			function supportWebp(callback) {
				var _img = new Image();
				_img.onload = function () {
					window._WEBP = window._NOWEBP ? 0 : 1;
					if (callback) callback();
				};
				_img.onerror = function () {
					window._WEBP = 0;
					if (callback) callback();
				};
				_img.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vuUAAA=";
			}

			// judge Platform is pc
			// @return {Boolean} flag: 是否为pc
			function isPC() {
				var userAgentInfo = navigator.userAgent.toLowerCase();
				var Agents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];
				var flag = true;
				for (var v = 0; v < Agents.length; v++) {
					if (userAgentInfo.indexOf(Agents[v]) > 0) {
						flag = false;break;
					}
				}
				return flag;
			}

			// render image
			// @param {dom Object} objidx: 图片对象
			// @param {Function} callback: callback function
			function rendNewImg(objidx, callback) {
				var _ori = objidx.getAttribute('data-original');
				var _fm = objidx.getAttribute('data-format');

				if (!_ori) {
					console.warn('error!(Cannot find "data-original")');
					return false;
				}

				var src = _fm ? _ori + suffix + _fm : _ori;
				if (window._WEBP && _ori.indexOf('.') < 0) {
					src = _ori + '.webp';
				}
				var _img = new Image();
				_img.onload = function () {
					objidx.setAttribute('src', _img.src);
					objidx.removeAttribute('data-original');
					objidx.removeAttribute('data-format');
					if (callback) {
						callback.call(this, objidx);
					}
				};
				_img.src = src;
			}

			// document.getElementsByClassName (Compatible with IE8)
			if (!document.getElementsByClassName) {
				document.getElementsByClassName = function (className, element) {
					var children = (element || document).getElementsByTagName('*');
					var elements = [];
					for (var i = 0; i < children.length; i++) {
						var child = children[i];
						var classNames = child.className.split(' ');
						for (var j = 0; j < classNames.length; j++) {
							if (classNames[j] == className) {
								elements.push(child);
								break;
							}
						}
					}
					return elements;
				};
			}

			// add event listener (Compatible with IE8)
			// @param {dom Object} object: 绑定对象
			// @param {String} type: 事件类型
			// @param {Function} handler: 绑定方法
			function addEvent(object, type, handler, remove) {
				if (typeof object != 'object' || typeof handler != 'function') return;
				try {
					object[remove ? 'removeEventListener' : 'addEventListener'](type, handler, false);
				} catch (e) {
					var xc = '_' + type,
					    l;

					object[xc] = object[xc] || [];
					if (remove) {
						l = object[xc].length;
						for (var i = 0; i < l; i++) {
							if (object[xc][i].toString() === handler.toString()) object[xc].splice(i, 1);
						}
					} else {
						l = object[xc].length;
						var exists = false;
						for (var k = 0; k < l; k++) {
							if (object[xc][k].toString() === handler.toString()) exists = true;
						}
						if (!exists) object[xc].push(handler);
					}
					object['on' + type] = function () {
						var l = object[xc].length;
						for (var i = 0; i < l; i++) {
							object[xc][i].apply(object, arguments);
						}
					};
				}
			}

			// remove event listener
			// @param {dom Object} object: 绑定对象
			// @param {String} type: 事件类型
			// @param {Function} handler: 绑定方法
			function removeEvent(object, type, handler) {
				addEvent(object, type, handler, true);
			}

			/*
   *	options:
   *	@type: onebyone || timeout || lazy
   */
			function ImgLoad(options) {
				if (!options.type) {
					console.warn('error!(Cannot find load type)');
					return false;
				}

				this.type = options.type;
				var domclass = this.domclass = options.domclass;
				this.container = options.container || document;
				this.oriImgs = this.container.getElementsByClassName(domclass);
			}

			//load one by one
			ImgLoad.prototype.onebyone = function () {
				var THIS = this;
				function loading(objidx, index) {
					objidx.className = objidx.className.replace(THIS.domclass, '');

					if (THIS.oriImgs.length > 0) {
						rendNewImg(THIS.oriImgs[0], loading);
					}
				}
				rendNewImg(THIS.oriImgs[0], loading);
			};

			//timeout
			ImgLoad.prototype.timeout = function (time) {
				var THIS = this;
				function loading(objidx, index) {
					//console.log(THIS.oriImgs.length);
				}
				function _func(i) {
					return function () {
						rendNewImg(THIS.oriImgs[i], loading);
					};
				}
				for (var i = 0; i < THIS.oriImgs.length; i++) {
					var _time = i * (time || 400);

					setTimeout(_func(i), _time);
				}
			};

			//lazy
			ImgLoad.prototype.lazyload = function (length) {
				var THIS = this;

				var bool = true;
				function scrollend(func) {
					bool = false;
					var t1 = document.documentElement.scrollTop || document.body.scrollTop;

					var timer = setInterval(function () {
						var t2 = document.documentElement.scrollTop || document.body.scrollTop;
						if (Math.abs(t1 - t2) < 1.5) {
							clearInterval(timer);
							func();
							bool = true;
						} else {
							t1 = t2;
						}
					}, 35);
				}

				function render(length) {
					scTop = document.documentElement.scrollTop || document.body.scrollTop;
					scTop = parseInt(scTop);
					function loading(objidx) {
						objidx.className = objidx.className.replace(THIS.domclass, '');
					}

					for (var i = 0; i < (length || THIS.oriImgs.length); i++) {
						var _height = THIS.oriImgs[i].offsetHeight;
						var _top = parseInt(THIS.oriImgs[i].offsetTop);

						if (_top <= scTop + winHeight + _height && _top >= scTop - _height) {
							rendNewImg(THIS.oriImgs[i], loading);
						}
					}

					return scTop;
				}

				function init() {
					if (THIS.oriImgs.length < 1) {
						removeEvent(window, 'scroll', init);
						return false;
					}
					scrollend(render);
				}
				render(length);
				addEvent(window, 'load', function () {
					if (isPC) {
						addEvent(window, 'scroll', init);
					} else {
						addEvent(window, 'touchmove', init);
					}
				});
			};

			//just render
			ImgLoad.prototype.justRender = function (obj) {
				rendNewImg(obj);
			};

			//init
			ImgLoad.prototype.init = function (param) {
				var THIS = this;
				function init() {
					switch (THIS.type) {
						case 'lazy':
							THIS.lazyload(param);break;
						case 'timeout':
							THIS.timeout(param);break;
						case 'onebyone':
							THIS.onebyone();break;
						default:
							console.log('error!(Unsupported type)');
					}
				}

				supportWebp(init);
			};

			module.exports = ImgLoad;

			/***/
		}
		/******/])
	);
});
;