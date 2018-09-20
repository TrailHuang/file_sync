var express = require('express');
var router = express.Router();
var cfg = require("../entity/config")
var path = require('path');

router.get("/",function(req,res){ 
	if(!req.session.user){ 					//到达/home路径首先判断是否已经登录
		req.session.error = "请先登录"
		res.redirect("/");				//未登录则重定向到 /login 路径
	} else {
		var config = cfg.parse_config(path.join(__dirname, '../file_sync.conf'));
		res.render("home",{title:'Home', config: JSON.stringify(config)});         //已登录则渲染home页面
	}
	
});

module.exports = router;