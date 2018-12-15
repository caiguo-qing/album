const read = require('../model/read');
const formidable = require('formidable')
const path = require('path');
const fs = require('fs')
// 显示首页-路由函数
exports.showIndex = function(req, res, next) {
	read.getFiles('/uploads', (err, albums) => {
		if (err) {
			next();
			return
		}
		res.render('index', {
			"files": albums
		});
	});

}

// 显示相册页-路由函数
exports.showAlbum = function(req, res, next) {

	read.getImages(`/uploads/${req.params.album}`, (err, images) => {
		if (err) {
			next();
			return;
		}
		res.render('album', {
			images: images,
			albumName: req.params.album
		})
	})

}

// 显示上传页面
exports.showUp = function(req, res, next) {
	read.getFiles('/uploads', (err, albums) => {
		if (err) {
			next();
			return;
		}
		res.render('up', {
			albums
		})
	})
}

// 上传图片接口
exports.doPost = function(req, res, next) {
	var form = new formidable.IncomingForm();

	// 改变图片上传路径-中转路径
	form.uploadDir = path.join(__dirname, '../midImages');

	form.parse(req, function(err, fields, files) {

		if (files.tupian.size > 12000) {
			res.send('图片尺寸过大');
			fs.unlink(files.tupian.path, function() {}); //删除中转路径中的图片
			return
		}

		let tt = new Date().getTime().toString(); //时间戳
		let file = fields.wenjianjia; //需要上传的文件夹
		let extname = path.extname(files.tupian.name); //图片扩展名
		let baseName = tt + extname
		let oldPath = files.tupian.path; //图片之前的路径
		let newPath = path.join(__dirname, '../uploads/', file, baseName);
		fs.rename(oldPath, newPath, (err) => {
			if (err) {
				res.send('改名失败')
				return;
			}
			fs.unlink(files.tupian.path, function() {}); //删除中转路径中的图片
			res.send('成功')

		})

	});
}

// 创建文件夹页面
exports.showMkdir = function(req, res, next) {
	res.render('mkdir');
}


// 创建文件夹接口
exports.doMkdir = function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		let file = fields.filename;
		fs.mkdir(path.join(__dirname,'../uploads',file),err=>{
			if(err){
				res.send('文件夹已经存在了！！！');
				return;
			}
			res.send('创建成功');
		})

	});
}












