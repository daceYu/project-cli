/**!
 * base 
 * explain: process operation
 */
const { Steps, templateCStep } = require("./step");
const color = require("../util/color");

let TipTxt = [];  // save hint content
let Result = {};  // save Enter content
let _resArr = []; // save Steps

// get Common steps && operate according to it
for(let i in Steps){
	Result[i] = null;
	TipTxt[i] = Steps[i];
	_resArr.push(i);
}

/**!
 * @ start process
 * @ param {Function} cb: callback function
 */
function startCMD (cb) {
	console.log(color.get('FgGreen'),TipTxt[_resArr[0]]);
	// Input Chinese may garbled, Set stream encoding
	process.stdin.setEncoding('utf-8');
	// The default is pause, call the following code to resume
	process.stdin.resume();
	//Listen input data
	process.stdin.on('data', (data) => {
		dealCMD(data,cb);
	})
}

/**!
 * @ deal width process result
 * @ param {Stream} data: process return
 * @ param {Function} cb: callback function
 */
function dealCMD (data, cb) {
	// Delete the spaces at the beginning and end of data
	let _result = data.toString().trim();
	// no process in
	if (!_result) {
		console.log(color.get('FgGreen'),TipTxt[_resArr[0]]);
		return false;
	}

	// record result
	let stepName = _resArr.shift();
	Result[stepName] = _result;

	// chose template C need more steps to create file
	if (_result === "C" || _result === "c" && stepName === "choseTpl") {
		for(let i in templateCStep){
			Result[i] = null;
			TipTxt[i] = templateCStep[i];
			_resArr.push(i);
		}
	}

	// proceed to Next step ?
	if (_resArr.length) {
		console.log(color.get('FgGreen'),TipTxt[_resArr[0]]);
	} else {
		process.stdin.pause();
		cb(Result);
	}
}

module.exports = startCMD;

// test
/*startCMD(function (data) {
	console.log(data);
})*/
// test end