var express = require('express');
var router = express.Router();
var cfg = require("../entity/config");
var path = require("path");

router.post("/base_config", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    console.log(req.body);    
    cfg.save_section(path.join(__dirname, '../file_sync.conf'), "system", req.body);
    res.end();
	
});
router.post("/send_config", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    console.log(req.body);    
    cfg.save_section(path.join(__dirname, '../file_sync.conf'), "send", req.body);
    res.end();
	
});
router.post("/recv_config", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    console.log(req.body);    
    cfg.save_section(path.join(__dirname, '../file_sync.conf'), "recv", req.body);
    res.end();
	
});
router.post("/auth_config", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    console.log(req.body);    
    cfg.save_section(path.join(__dirname, '../file_sync.conf'), "auth", req.body);
    res.end();
	
});
router.post("/adv_config", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    console.log(req.body);    
    cfg.save_section(path.join(__dirname, '../file_sync.conf'), "advanced", req.body);
    res.end();
	
});
router.post("/log_config", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    console.log(req.body);    
    cfg.save_section(path.join(__dirname, '../file_sync.conf'), "logcenter", req.body);
    res.end();
	
});

router.post("/delete_task", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    console.log(req.body);    
    cfg.delete_task(path.join(__dirname, '../file_sync.conf'), req.body.taskid);
    res.end();
	
});
router.post("/modify_task", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    console.log(req.body);    
    cfg.mod_tasklist(path.join(__dirname, '../file_sync.conf'), req.body);    
    res.write( JSON.stringify(cfg.parse_config(path.join(__dirname, '../file_sync.conf'))));
    res.end();
	
});

router.post("/add_task", function(req,res){ 					   // 从此路径检测到post方式则进行post数据的处理操作
    console.log(req.body);    
    cfg.add_tasklist(path.join(__dirname, '../file_sync.conf'), req.body);
    res.write( JSON.stringify(cfg.parse_config(path.join(__dirname, '../file_sync.conf'))));
    res.end();
	
});


module.exports = router;