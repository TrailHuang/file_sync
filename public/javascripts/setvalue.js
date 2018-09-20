function set_radio(_name, max, str){
    for (i = 0; i<max; i++){
        if ($("input[name="+_name+"]").eq(i).val() == str ){
            $("input[name="+_name+"]").eq(i).prop("checked", true);
        }
    }
}

function set_radio_model(model, _name, max, str) {
    for (i = 0; i<max; i++){
        if ($(model + " input[name="+_name+"]").eq(i).val() == str ){
            $(model + " input[name="+_name+"]").eq(i).prop("checked", true);
        }
    }

}

wdir = {
    "sync": "双向传输",
    "recv": "单向接收",
    "send": "单向发送",
}
wmode = {
    "append": "增量更新",
    "identical": "完全一致",
    "delete":"源端删除",
    "move":"源端移动",
}

wmonitor = {
    "scanner":"扫描模式",
    "notify":"触发模式"
}
wrun = {
    "yes":"运行",
    "no" :"不运行"
}

function set_tasklist(tasklist)
{
    $("#task_list").empty();
    for (var ix = 0; ix < tasklist.length; ix ++) {
        var parentdiv=$('<div></div>');        //创建一个父div
        parentdiv.addClass('row_list');    //添加css样式
        parentdiv.prop('id',"taskdiv" + tasklist[ix].taskid);
        
        $('<div></div>').addClass("col-xs-1").html(tasklist[ix].taskid).appendTo(parentdiv);
        $('<div></div>').addClass("col-xs-2").html(wdir[tasklist[ix].work_direction]).appendTo(parentdiv);
        $('<div></div>').addClass("col-xs-2").html(tasklist[ix].path).appendTo(parentdiv);
        $('<div></div>').addClass("col-xs-2").html(wmode[tasklist[ix].workmode]).appendTo(parentdiv); 
        $('<div></div>').addClass("col-xs-1").html(wmonitor[tasklist[ix].monitor]).appendTo(parentdiv);
        $('<div></div>').addClass("col-xs-2").html(wrun[tasklist[ix].run]).appendTo(parentdiv);        
        $('<div></div>').addClass("col-xs-2").html('<button class="btn btn-success btn-xs" data-toggle="modal" data-target="#reviseTask" data-taskid=' + tasklist[ix].taskid +'>修改</button>' +
        '<button class="btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteTask" data-taskid=' + tasklist[ix].taskid + '>删除</button>').appendTo(parentdiv);
        
        parentdiv.appendTo($('#task_list'));
    }

}

function set_html_value(cfg)
{
    //system
    $('select[name="direction"]').val(cfg.system.direction);
    set_radio("tmptype", 2,  cfg.system.tmptype );
    $('input[name="tmpname"]').val(cfg.system.tmpname);
    set_radio("encode", 2, cfg.system.encode);

    //send
    $('input[name="gap_addr"]').val(cfg.send.gap_addr);
    $('input[name="gap_port"]').val(cfg.send.gap_port);
    
    $('input[name="retry_intvl"]').val(cfg.send.retry_intvl);
    $('input[name="retry_max"]').val(cfg.send.retry_max);
    $('input[name="scann_intvl"]').val(cfg.send.scann_intvl);
    $('input[name="trans_delay"]').val(cfg.send.trans_delay);
    $('select[name="trans_order"]').val(cfg.send.trans_order);
    $('input[name="trans_ext"]').val(cfg.send.trans_ext);

    //recv
    $('input[name="listen_port"]').val(cfg.recv.listen_port);
    $('input[name="listen_addr"]').val(cfg.recv.listen_addr);
    $('input[name="idle_timeout"]').val(cfg.recv.idle_timeout);

    //auth
    $('input[name="auth_addr"]').val(cfg.auth.auth_addr);
    $('input[name="auth_port"]').val(cfg.auth.auth_port);
    $('input[name="username"]').val(cfg.auth.username);
    $('input[name="password"]').val(cfg.auth.password);
    $('input[name="certificate"]').val(cfg.auth.certificate);

    //adv
    
    $('select[name="indexer"]').val(cfg.advanced.indexer);
    $('input[name="database"]').val(cfg.advanced.database);
    $('input[name="snapshot"]').val(cfg.advanced.snapshot);
    $('input[name="local_addr"]').val(cfg.advanced.local_addr);
    $('input[name="local_port"]').val(cfg.advanced.local_port);
    $('input[name="local_level"]').val(cfg.advanced.local_level);
    $('input[name="keepalive_idle_time"]').val(cfg.advanced.keepalive_idle_time);
    $('input[name="keepalive_check_intvl"]').val(cfg.advanced.keepalive_check_intvl);
    $('input[name="keepalive_retry_cnt"]').val(cfg.advanced.keepalive_retry_cnt);

    //log
    $('select[name="storage_type"]').val(cfg.logcenter.storage_type);
    $('input[name="storage_path"]').val(cfg.logcenter.storage_path);
    set_radio("forward", 2, cfg.logcenter.forward)
    $('input[name="forward_addr"]').val(cfg.logcenter.forward_addr);
    $('input[name="forward_port"]').val(cfg.logcenter.forward_port);

    set_tasklist(cfg.tasklist)
}

function set_modify_task(tasklist, taskid){

    tasklist.forEach(element => {
    if (element.taskid == taskid) {
        $('#reviseTask input[name="taskid"]').val(element.taskid);
        $('#reviseTask select[name="work_direction"]').val(element.work_direction);
        $('#reviseTask input[name="path"]').val(element.path);
        $('#reviseTask select[name="workmode"]').val(element.workmode);
        $('#reviseTask input[name="backup"]').val(element.backup);
        $('#reviseTask select[name="monitor"]').val(element.monitor);
        set_radio_model("#reviseTask", "run", 2 , element.run);
        set_radio_model("#reviseTask", "first", 2 , element.first);
        set_radio_model("#reviseTask", "subdir", 2 , element.subdir);
        $('#reviseTask select[name="encrypt"]').val(element.encrypt);
        $('#reviseTask input[name="worktime"]').val(element.worktime);
        if (element.work_direction == "sync") {
            $('#mod_recv_t').show();
            $('#mod_send_t').show();
        } else if (element.work_direction == "recv") {
            $('#mod_recv_t').show();
            $('#mod_send_t').hide();
        } else {
            $('#mod_recv_t').hide();
            $('#mod_send_t').show();
        }
        if (element.workmode == "move"){            
			$('#mod_backup').show();
        } else {
            $('#mod_backup').hide();
        }
    }
    });
}


