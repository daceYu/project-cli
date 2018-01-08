/**
 * mustache 渲染
 */
import TPL from './tpl.js';
import DATA from './data.js';
import Mustache from "../../lib/mustache.min.js";

;(function () {
	let render = {
		render () { /* 渲染模板 */
			this.html = Mustache.to_html(TPL.goods,DATA);
		},
		show (id) { /* 操作DOM，添加数据 */
			this.obj = document.getElementById(id);
			this.obj.innerHTML += this.html; 
		},
		init () {  /* 初始化 */
			this.render();
			this.show("render");
		}
	};

	$(function(){
		render.init();
	})
})()