const fs = require('fs');
const path = require('path');

// 获取文件夹函数
exports.getFiles = (pathP, callback) => {
	fs.readdir(path.join(__dirname, '../', pathP), (err, files) => {
		if (err) { //如果文件夹不存在-显示错误-404
			callback(err, null);
			return;
		}
		let albums = []; //返回的文件夹数组
		(function interator(i) { //自执行迭代函数
			if (i == files.length) { //迭代结束-返回回调
				callback(null, albums);
				return
			}
			// 判断当前文件是否是文件夹
			fs.stat(path.join(__dirname, '../', pathP, files[i]), (err, stats) => {
				if (stats.isDirectory()) {
					albums.push(files[i])
				}
				interator(i + 1)
			})
		}(0))
	})
}

// 获取图片函数
exports.getImages = function(pathP, callback) {
	fs.readdir(path.join(__dirname,'../',pathP),(err,files) => {
		if(err){
			callback(err,null);
			return;
		}
		callback(null,files);
	})
}