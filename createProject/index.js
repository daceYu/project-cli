/**!
 * project structure
 */

const color = require("./lib/util/color");
const startCMD = require("./lib/process/process");
const fsFunc = require("./lib/fs/fsFunc");
const path = require("path");
const fs = require("fs");

let config = require("./config");


let Create = {
	/**
	 * initialize function
	 * param {Object} options: config, relative folder path
	 */
	init: (options) => {
		if (!options.folder || !options.choseTpl || (options.choseTpl !== 'A' && options.choseTpl !== 'a' && options.choseTpl !== 'B'&& options.choseTpl !== 'b')) {
			console.log(color.get("FgRed"), "Error, Please operate according to steps");
			return false;
		}

		Create.createTree(options);
	},
	/**
	 * create folder tree
	 * param {String} folderName: project Name && project root path
	 */
	createTree: (options) => {
		// 选择模板
		let chosen_tpl = options.choseTpl;
		let dir;
		if (chosen_tpl === "a" || chosen_tpl === "A") {
			dir = path.join(__dirname, "/land");
		}
		if (chosen_tpl === "b" || chosen_tpl === "B") {
			dir = path.join(__dirname, "/activity");
		}

		let project_path = path.join(config.pathroot, options.folder);
		fsFunc.setFolder(project_path);
		// 遍历模板目录 && 生成新的项目
		fsFunc.deepLoopFolder(project_path, dir, function (pathname) {
			pathname = pathname.replace(/\\/,"/");  // window & mac 路径符号统一
            let template_path = /createProject\/(.+)/.exec(pathname)[1];
            let relative_path = /[^\/]*(.+)/.exec(template_path)[1];
            let new_path = path.join(project_path,relative_path);
			
			// 读取文件内容并新建文件
            fs.readFile(pathname, {encoding : 'utf-8'}, function (err, data) {
				if (err) {
					console.log(Color.get('FgRed'), err);
					return false;
				}

				fsFunc.setFile(new_path, data);
			});
		});
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