/**
 * mustache 模板
 */
export default {
	goods: '{{#data}}' + 
		'<section class="goods-tab g-fs24 j-des" data-code="{{code}}">' + 
			'<header class="goods-title u-w">' + 
				'<p class="name g-fs38">{{name}}</p>' + 
				'<p class="label g-fs22 f-tc"><span>{{label1}}</span><span>{{label2}}</span></p>' + 
			'</header>' + 
			'<article class="wrapper u-w u-flex">' + 
				'<section class="u-flex">' + 
					'<article class="profit-left f-tl">' + 
						'<header class="g-fs32"><span class="g-fs68 f-bold" data-profit="{{code}}">--</span>%</header>' + 
						'<p class="g-fs22">近7日年化收益</p>' + 
					'</article>' + 
					'<p class="profit-center"></p>' + 
					'<article class="profit-right f-tc">' + 
						'<header class="g-fs32"><span class="g-fs68 f-bold">{{fixProfit}}</span>%</header>' + 
						'<p class="g-fs22">{{fixTxt}}</p>' + 
					'</article>' + 
				'</section>' + 
				'<a class="f-tc g-fs30 j-buy" data-code="{{code}}">立即购买</a>' + 
			'</article>' + 
			'<article class="progress u-w" data-search="{{code}}">' + 
				'<p class="container"><span></span></p>' + 
				'<p class="text g-fs22">剩余额度: --万</p>' + 
			'</article>' + 
		'</section>' + 
		'{{/data}}'
}