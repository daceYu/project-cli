/**!
 * base 
 * explain: folder or file operation
 * author: yugang <yugang@myhexin.com>
 */

const fs = require('fs');
const path = require('path');
const color = require('../util/color');

/**
 * verify file or folder exists
 * param {String} pathname: folder or file path
 * return {Boolean} exist : ture ? false 
 */
function fsExistSync (pathname) {
	try{
		fs.accessSync(pathname,fs.F_OK);
	} catch (e) {
		return false;
	}

	return true;
}

/**
 * find folder, if not exist, build it
 * param {String} pathname: folder path
 */
function setFolder (pathname, flag) {
	if (!fs.existsSync(pathname)) {
		fs.mkdirSync(pathname);
		console.log(color.get('FgCyan'),`${pathname} create folder success`);
	} else {
		if (flag) return false;
		console.log(color.get('FgYellow'),`\r\n${pathname} already exists`);
	}
}

/**
 * find file, if not exist, build it
 * param {String} pathname: create file path with file name
 * param {String} filedata: file contents created
 */
function setFile (pathname, filedata) {
	/* get file path && create folder */
	let dirpath = path.dirname(pathname);
	setFolder(dirpath, true);

	/* handle witd filedata */
	if (!filedata) return;
	if (fsExistSync(pathname)) { 
		/* already has file && write file */
		fs.writeFile(pathname, filedata, {encoding : 'utf-8'}, (err) => {
			if (err) {
				console.log(color.get('FgRed'), err);
				return false;
			}

			console.log(color.get('FgCyan'), `${pathname} create success`);
		})
	}else {
		/* create new file */
		fs.appendFile(pathname, filedata, {encoding : 'utf-8'}, (err) => {
			if (err) {
				console.log(color.get('FgRed'), err);
				return false;
			}

			console.log(color.get('FgCyan'), `${pathname} create success`);
		})
	}
}

/**
 * deep loop folder
 * param {String} project_path: new project path
 * param {String} dir: folder path
 * param {Function} callback
 */
function deepLoopFolder (project_path, dir, callback) {
	fs.readdirSync(dir).forEach( function (filename) {
		let pathname = path.join(dir, filename);

		if (fs.statSync(pathname).isDirectory()) {
			pathname = pathname.replace(/\\/g,"/");  // window & mac Unified format
			let template_path = /createProject\/(.+)/.exec(pathname)[1];
            let relative_path = /[^\/]*(.+)/.exec(template_path)[1];
            let new_path = path.join(project_path,relative_path);

			setFolder(new_path);
			deepLoopFolder(project_path, pathname, callback);
		} else {
			callback(pathname);
		}
	})
}

/**
 * build js file
 * param {String} jsArr: js data
 * param {String} distpath: create file path
 */
function buildJsFile (jsArr, distPath) {
	/* build js folder */
	const folderPath = path.join(distPath, 'js');
	setFolder(folderPath);

	
	let jsname = [];
	let jsArrLength = jsArr.length;

	/* according to regular expression to macth js name */
	let reg = /@@(.*)@@/; 
	for (let i = 0; i < jsArrLength; i++ ) {
		let _d = jsArr[i].match(reg);
		jsname[i] = _d.length > 1 ? _d[1].replace(reg).trim() : '';
	}

	/* No matching to js name or No js module */
	if (!jsname[0]) {
		console.log('No matching to js name or No js module.');
		return false;
	}

	/* according to js name to created js file */
	for (let i = 0; i < jsArrLength; i++ ) {
		const jsPath = path.join(distPath, 'js', jsname[i] + '.js');
		setFile(jsPath, jsArr[i]);
	}
}

/**
 * render templates
 * param {String} srcPath: module page path
 * param {Function} cb: callback function 
 */
function renderTemplates (srcPath,cb) {
	if(!srcPath) return false;
	let folderPath = path.dirname(srcPath);

	// read file and get the data of file
	fs.readFile(srcPath, {encoding : 'utf-8'}, (err,data) => {
		if (err) {
			console.log(color.get('FgRed'),err);
			return false;
		}

		// get translated file of template
		let dataReplace = data.replace(/<link\srel="import"\shref="(.*)">/gi, (matchs, m1) => {
            // read template file that includes components file
            return fs.readFileSync(path.join(folderPath, m1), {
                encoding: 'utf8'
            });
        });

		if (cb) cb(dataReplace);
	})
}




module.exports = {
	fsExistSync,
	setFolder,
	setFile,
	deepLoopFolder,
	buildJsFile,
	renderTemplates
}