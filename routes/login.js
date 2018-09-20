var express = require('express');
var router = express.Router();

router.post("/", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
    var user = "admin";
    var pass = "123456";

    console.log(req.body.uname);
    if (req.body.uname != user){
        req.session.error = "用户名或密码错误";
        res.status(404).send("用户名或密码错误");
    }else if (req.body.upwd != pass){ 	//查询到匹配用户名的信息，但相应的password属性不匹配
        req.session.error = "用户名或密码错误";        
        res.status(404).send("用户名或密码错误");        
    }else { 					
        req.session.user = {name:req.body.uname};
        res.send(200);
    }
	
});

module.exports = router;