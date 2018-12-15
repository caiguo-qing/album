const express = require('express');
const app = express();
const router = require('./controller');


// 加载静态资源
app.use('/static', express.static('static'));
app.use(express.static('uploads'));

// 设置ejs模板
app.set('view engine', 'ejs');

app.get('/', router.showIndex);//首页
app.get('/:album', router.showAlbum);//相册页
app.get('/up',router.showUp);//上传页
app.post('/up',router.doPost)//上传图片接口
app.get('/mkdir',router.showMkdir);//创建新相册页
app.post('/mkdir',router.doMkdir);//创建文件夹接口
app.use((req,res) => {//404
	res.render('404');
});



app.listen(3000);