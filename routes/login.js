var express = require('express');
var router = express.Router();


router.post("/", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
    var user = "admin"
    var pass = "123456"

    if (req.body.uname != user){
        req.session.error = "用户名或密码错误";
        res.send(404);
    	res.redirect("/index");
    }else if (req.body.upwd != pass){ 	//查询到匹配用户名的信息，但相应的password属性不匹配
        req.session.error = "用户名或密码错误";
        res.send(404);
    	res.redirect("/index");
    }else { 									//信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
        req.session.user = {user:user, pass:pass};
        res.send(200);
    	res.redirect("/home");
    }
	
});

module.exports = router;