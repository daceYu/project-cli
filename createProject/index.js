/**!
 * project structure
 * author: yugang <yugang@myhexin.com>
 */

const color = require("./lib/util/color");
const startCMD = require("./lib/process/process");
const fsFunc = require("./lib/fs/fsFunc");
const path = require("path");
const fs = require("fs");

const Fetch = require('./common');
let config = require("./config");


let Create = {
	/**
	 * initialize function
	 * param {Object} options: config, relative folder path
	 */
	init: (options) => {
		if (!options.folder || !options.choseTpl || (
				options.choseTpl !== 'A' && options.choseTpl !== 'a' && 
				options.choseTpl !== 'B'&& options.choseTpl !== 'b' && 
				options.choseTpl !== 'C'&& options.choseTpl !== 'c')
			) {
			console.log(color.get("FgRed"), "Error, Please operate according to steps");
			return false;
		}

		Create.deal(options);
	},
	/**
	 * process options
	 * param {Object} options: config, relative folder path
	 */
	deal: (options) => {
		// chose template
		let chosen_tpl = options.choseTpl;
		if (chosen_tpl === "a" || chosen_tpl === "A") {
			let dir = path.join(__dirname, "/land");
			Create.createTree(options.folder, dir);
			return false;
		}
		if (chosen_tpl === "b" || chosen_tpl === "B") {
			let dir = path.join(__dirname, "/activity");
			Create.createTree(options.folder, dir);
			return false;
		}
		if (chosen_tpl === "c" || chosen_tpl === "C") {
			// check input
			if(!options.folder || !options.filename || !options.buildname){
				console.log(color.get('FgRed'),'Error! The input is wrong');
				return false;
			}

			this.dist = path.join(config.pathroot, options.folder);
			this.filename = options.filename;
			this.buildname = options.buildname;

			fsFunc.setFolder(this.dist);

			let dir = path.join(__dirname, "/templates/" + this.filename);
			fsFunc.renderTemplates(dir, Create.buildTemplate);
			return false;
		}
	},
	/**
	 * create folder tree
	 * param {String} folderName: project Name && project root path
	 * param {String} dir: template path
	 */
	createTree: (folderName, dir) => {
		let project_path = path.join(config.pathroot, folderName);
		fsFunc.setFolder(project_path);
		// deepLoop template folder && generate new folder
		fsFunc.deepLoopFolder(project_path, dir, function (pathname) {
			pathname = pathname.replace(/\\/g,"/");  // window & mac Unified format
            let template_path = /createProject\/(.+)/.exec(pathname)[1];
            let relative_path = /[^\/]*(.+)/.exec(template_path)[1];
            let new_path = path.join(project_path,relative_path);
			
			// reader file and create new file
            fs.readFile(pathname, {encoding : 'utf-8'}, function (err, data) {
				if (err) {
					console.log(Color.get('FgRed'), err);
					return false;
				}

				fsFunc.setFile(new_path, data);
			});
		});
	},
	buildTemplate: (data) => {
		/* get css data array && build css */
		let cssArr = Fetch.fetchData(data, Fetch.reg.css);
		cssArr = cssArr ? cssArr.join('') : cssArr;
		fsFunc.setFile(path.join(this.dist, 'css/style.css'), cssArr);
		
		/* get js data array && build js */
		let jsArr = Fetch.fetchData(data, Fetch.reg.js);
		fsFunc.buildJsFile(jsArr, this.dist);

		/* get html data && build html */
		let htmlData = data.replace(Fetch.reg.css, '').replace(Fetch.reg.js, '');
		fsFunc.setFile(path.join(this.dist, this.buildname), htmlData);
	}
}


/* test start */
// startCMD(Create.init);
/* test end */

module.exports = {
	init: (options) => {
		if (options && options.pathroot) {
			config.pathroot = options.pathroot;
		}

		startCMD(Create.init);
	}
}