/**
 * 测试页面
 */
import '../lib/zepto.min.js';
import '../lib/flexable.js';
// mustache demo
import './components/render.js';

// service
import SERVICE from './function/service.js';
console.log(SERVICE);
// alter
import ALTER from './function/alter.js';
console.log(ALTER);
// opreate
import OPREATE from './function/opreate.js';
console.log(OPREATE);
// 弹框
import DIALOG from './function/dialog.js';
console.log(DIALOG);
var options = { 
    content: "恭喜你，领取成功",
    btns: [ 
        { text: '好的'},
    ]
};
DIALOG.showWindow(options)

// 图片加载
import ImgLoad from '../lib/ImgLoad.1.1.js';
const loader = new ImgLoad({  
    type: 'onebyone', 
    domclass: 'imgload'  
});

/* 加载顶部通知栏 */
import '../lib/LazyModule.1.0.js';
const cpt = new LazyModule({
	type: 'onebyone',
	domclass: '.j-load',
	rendOption: {
		animate: { time: 0 },
		value: {
			noticeText: 'lazyModule'
		},
		callback: function ($t) {
			console.log("template onload ended")
		}
	}
});

;(function () {
	let test = () => {
		console.log("test");
	}
	test();

	loader.init();
	cpt.init();
})()



// 继承
class Point {
    constructor(x, y) {    //constructor 构造方法
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
    }

    toString() {
        console.log( this.color + ' ' + super.toString());
    }
}

var p = new ColorPoint(1, 2, "red");
p.toString();






