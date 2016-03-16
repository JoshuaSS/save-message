var getUrl = "";
var addUrl = "/";
var postUrl = addUrl;

//清空信息框内容
$("#msgClear").click(function() {
  $("#msgText").val("");
});

$("#msgGet").click(function() {
  if ($("#textGet").val() == null || $("#textGet").val() == "") {
    if ($.support.leadingWhitespace) {
      $.toaster({ priority: 'warning', title: '警告', message: '编号不能为空！'});
      return;
    } else {
      alert("警告：编号不能为空！");
      return;
    }
  }
  handleGet();
});


$("#msgSave").click(function () {
  if ($("#msgText").val() == null || $("#msgText").val() == "") {
    if ($.support.leadingWhitespace) {
      $.toaster({  priority: 'warning',title: '警告', message: '内容不能为空！'});
      return;
    } else {
      alert("警告：内容不能为空！");
      return;
    }
  }
  handlePost();
});

function handleGet() {
  waitingDialog.show();
  $.ajax({
    async: true,
    url: '/api/' + $('#textGet').val(),
    type: 'get',
    dataType: 'text',
    timeout: 15000,
    success: function(data) {
      setTimeout(function() {
        waitingDialog.hide();
        if (data != "error") {
          $("#msgText").val(data);
        } else {
          if ($.support.leadingWhitespace) {
            $.toaster({ priority: 'info', title: '信息', message: '没有对应数据！'});
            return;
          } else {
            alert("信息：没有对应数据！");
            return;
          }
        }
      }, 400);
    },
    error: function(data) {
      setTimeout(function() {
        waitingDialog.hide();
        if ($.support.leadingWhitespace) {
          $.toaster({ priority: 'danger', title: '错误', message: '系统错误，请稍后重试！'});
          return;
        } else {
          alert("错误：系统错误，请稍后重试！");
          return;
        }
      }, 400);
    },
  });
}

function handlePost() {
  waitingDialog.show();
  $.ajax({
    async: true,
    url: "/api",
    type: 'post',
    data: {message: $('#msgText').val()},
    dataType: 'text',
    timeout: 15000,
    success: function(data) {
      setTimeout(function() {
        waitingDialog.hide();
        $("#textGet").val(data);
      }, 400);
    },
    error: function() {
      setTimeout(function() {
        waitingDialog.hide();
        if ($.support.leadingWhitespace) {
          $.toaster({ priority: 'danger', title: '错误', message: '系统错误，请稍后重试！'});
          return;
        } else {
          alert("错误：系统错误，请稍后重试！");
          return;
        }
      }, 400)
    }
  });
}

//提示框样式
$.toaster({ settings :
{
    toaster        :
    {
        'id'        : 'toaster',
        'container' : 'body',
        'template'  : '<div></div>',
        'class'     : 'toaster',
        'css'       :
        {
            'position' : 'fixed',
            'top'      : '10px',
            'right'    : '35%',
            'width'    : '300px',
            'zIndex'   : 50000
        }
    }
}});

$(document).ready(function () {
  //生成“阅后即焚”选择框
  $("[name='once']").bootstrapSwitch();
});
