/**!
 * configuration and method 
 * explain: Use these to analyze and extract
 * author: yugang <yugang@myhexin.com>
 */
require('./lib/util/util');

/* regular expression */
let reg = {
	css: /<style>(([\s\S])*?)<\/style>/gi,
	js: /<script>(([\s\S])*?)<\/script>/gi
};

/**
 * fetch file data with regular expression
 * param {String} data: file content
 * param {reg value} reg: regular expression
 * return {Array} file data array
 */
function fetchData (data, reg) {
	/* Match the date that meets the requirements */
	let styleArr = data.match(reg);

	if (!styleArr) return '';

	/* remove duplicate data */
	styleArr = styleArr.unique();
	
	/* remove label */
	let styleArrLength = styleArr.length;
	for (let i = 0; i < styleArrLength; i++ ) {
		styleArr[i] = styleArr[i].replace(reg, (matchs, m1) => {
			return m1;
		})
	}

	return styleArr;
}


module.exports = {
	reg,
	fetchData
}