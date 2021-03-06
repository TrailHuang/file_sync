var fs = require('fs');
var ini = require("ini");

var regex = /\s+/;


function sendtask2json(taskobj) {
    var list = new Array()
    for (var task in taskobj) {
        var tmp = taskobj[task];
        taskinfo = {
            taskid: tmp[0],
            path: tmp[1],
            workmode: tmp[2],
            backup: tmp[3],
            monitor: tmp[4],
            run: tmp[5],
            first: tmp[6],
            subdir: tmp[7],
            encrypt: tmp[8],
            md5: tmp[9],
            worktime: tmp[10],
            work_direction:"send",
        }
        list.push(taskinfo);
    }
    return list
}
function json2sendtask(obj_list) {
    var list = new Array();
    if (obj_list.work_direction == "sync" || obj_list.work_direction == "send") {
        list.push(obj_list.taskid);
        list.push(obj_list.path);
        list.push(obj_list.workmode);
        list.push(obj_list.backup);
        list.push(obj_list.monitor);
        list.push(obj_list.run);
        list.push(obj_list.first);
        list.push(obj_list.subdir);
        list.push(obj_list.encrypt);
        list.push(obj_list.md5);
        list.push(obj_list.worktime);
        return list;
    }

    return null;
}

function recvtask2json(taskobj) {
    var list = new Array()
    for (var task in taskobj) {
        var tmp = taskobj[task];
        taskinfo = {
            taskid: tmp[0],
            path: tmp[1],
            iscover: tmp[2],
            work_direction:"recv",
        }
        list.push(taskinfo);
    }
    return list
}
function json2recvtask(obj_list) {
    var list = new Array();
    if (obj_list.work_direction == "sync" || obj_list.work_direction == "recv") {
        list.push(obj_list.taskid);
        list.push(obj_list.path);
        list.push(obj_list.iscover);
        return list;
    }
    return null;
}

function parse_config(filename) {
    var config = ini.parse(fs.readFileSync(filename, "utf8"));
    //console.log(config);

    var send = sendtask2json(config.send_tasklist);
    var recv = recvtask2json(config.recv_tasklist);
    var list = send.concat(recv);
    var tasklist = [];

    for (item1 of list) {
        var flag = true;
        for (item2 of tasklist) {  
            if (item1.taskid == item2.taskid) { 
                item2.work_direction = "sync";
                item2.iscover = item1.iscover;
                flag = false;
            }
        }
        if (flag) { 
            tasklist.push(item1);
        }
    }
    //console.log(tasklist);
    config.tasklist = tasklist;
    delete config.send_tasklist;
    delete config.recv_tasklist;

    return config;
}

function save_section(filename, section, item_obj) {
    var config = ini.parse(fs.readFileSync(filename, "utf8"));

    ////console.log(config[section]);
    config[section] = item_obj;
    fs.writeFileSync(filename, ini.stringify(config));

}

function add_tasklist(filename, item_obj) {
    var config = ini.parse(fs.readFileSync(filename, "utf8"));


    var send = json2sendtask(item_obj);
    if (send != null)
        config.send_tasklist[item_obj.taskid] = send;
    var recv = json2recvtask(item_obj);
    if (recv != null)
        config.recv_tasklist[item_obj.taskid] = recv;

    fs.writeFileSync(filename, ini.stringify(config));
}
function mod_tasklist(filename, item_obj) {
    var config = ini.parse(fs.readFileSync(filename, "utf8"));

    delete config.send_tasklist[item_obj.taskid];
    delete config.recv_tasklist[item_obj.taskid];

    var send = json2sendtask(item_obj);
    if (send != null)
        config.send_tasklist[item_obj.taskid] = send;
    var recv = json2recvtask(item_obj);
    if (recv != null)
        config.recv_tasklist[item_obj.taskid] = recv;

    fs.writeFileSync(filename, ini.stringify(config));
}
function delete_task(filename, taskid) {
    var config = ini.parse(fs.readFileSync(filename, "utf8"));

    delete config.send_tasklist[taskid];
    delete config.recv_tasklist[taskid];
    
    fs.writeFileSync(filename, ini.stringify(config));
}
function save_filter(filename, item_obj)
{
    var config = ini.parse(fs.readFileSync(filename, "utf8"));
    ////console.log(item_obj);

    white = item_obj.name_white.split("\r\n");
    black = item_obj.name_black.split("\r\n");

    var white_obj = new Object();
    for (var i = 0; i < white.length; i++) {
        white_obj[white[i]] = Array(white[i]);
    }
    var black_obj = new Object();
    for (var i = 0; i < black.length; i++) {
        black_obj[black[i]] = Array(black[i]);
    }
   
    config.name_white = white_obj;
    config.name_black = black_obj;


    fs.writeFileSync(filename, ini.stringify(config));
}

exports.parse_config = parse_config;
exports.save_section = save_section;
exports.add_tasklist = add_tasklist;
exports.mod_tasklist = mod_tasklist;
exports.delete_task = delete_task;
exports.save_filter = save_filter;