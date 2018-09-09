var express = require('express');
var router = express.Router();

/* GET login page. */
router.get("/", function(req,res){    // 到达此路径则渲染login文件，并传出title值供 login.html使用
	res.render("index",{title:'User Login'});
})
module.exports = router;
