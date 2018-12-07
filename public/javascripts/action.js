function submit_base_form() {
    var form_data = $('#form_base').serialize();
    $.ajax({
        url: "action/base_config",
        data: form_data,
        type: "post",
        success: function(data) {
            $('#changeBase').modal('hide');
			location.reload();
        },
        error: function() {
            alert('修改失败!');
        }
    });

    return false;
}
function submit_send_form() {
    var form_data = $('#form_send').serialize();
    $.ajax({
        url: "action/send_config",
        data: form_data,
        type: "post",
        success: function(data) {
            $('#changeSend').modal('hide');
			location.reload();
        },
        error: function() {
            alert('修改失败!');
        }
    });

    return false;
}
function submit_recv_form() {
    var form_data = $('#form_recv').serialize();
    $.ajax({
        url: "action/recv_config",
        data: form_data,
        type: "post",
        success: function(data) {
            $('#changeRecv').modal('hide');
			location.reload();
        },
        error: function() {
            alert('修改失败!');
        }
    });

    return false;
}
function submit_auth_form() {
    var form_data = $('#form_auth').serialize();
    $.ajax({
        url: "action/auth_config",
        data: form_data,
        type: "post",
        success: function(data) {
            $('#changeAuth').modal('hide');
			location.reload();
        },
        error: function() {
            alert('修改失败!');
        }
    });

    return false;
}
function submit_adv_form() {
    var form_data = $('#form_adv').serialize();
    $.ajax({
        url: "action/adv_config",
        data: form_data,
        type: "post",
        success: function(data) {
            $('#changeAdv').modal('hide');
			location.reload();
        },
        error: function() {
            alert('修改失败!');
        }
    });

    return false;
}
function submit_log_form() {
    var form_data = $('#form_log').serialize();
    $.ajax({
        url: "action/log_config",
        data: form_data,
        type: "post",
        success: function(data) {
            $('#changeLog').modal('hide');
			location.reload();
        },
        error: function() {
            alert('修改失败!');
        }
    });

    return false;
}
function delete_task(taskid, tasklist){
    for (var ix = 0; ix < tasklist.length; ix++) {
        if (tasklist[ix].taskid == taskid) {
            tasklist.splice(ix, 1);
            break;
        }
    }   

}

function submit_filter_form() {
    var form_data = $('#form_filter').serialize();
    $.ajax({
        url: "action/filter_config",
        data: form_data,
        type: "post",
        success: function(data) {
            $('#changeFilter').modal('hide');
			location.reload();
        },
        error: function() {
            alert('修改失败!');
        }
    });

    return false;
}
function submit_virus_form() {
    var form_data = $('#form_virus').serialize();
    $.ajax({
        url: "action/virus_config",
        data: form_data,
        type: "post",
        success: function(data) {
            $('#changeVirus').modal('hide');

        },
        error: function() {
            alert('修改失败!');
        }
    });

    return false;
}

