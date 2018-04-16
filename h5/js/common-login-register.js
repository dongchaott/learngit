
$(function () {
  // const API = "http://47.97.166.210:8079";
  var time = 0;
  var timer;
  var codeToken = '';
  //  获取邀请码
  var inviteCode = getQueryString('inviteCode')
  changeWechatInfo(inviteCode)
  if (inviteCode) {
    $('#inviteCode').val(inviteCode).attr("disabled",true);
    //  根据邀请码获取对应等级
    $.ajax({
      url: API + "/api/invitationCode/obtainGradeByCode",
      method: "post",
      data: {inviteCode: inviteCode},
      dataType: "JSON"
    }).then( function(res){
      function getLevel(grade) {
        var obj = {
          lv: "",
          lvName: ""
        };
        switch (grade) {
          case "gold_code":
            obj.lv = 1;
            obj.lvName = "黄金码";
            break;
          case "black_gold_code":
            obj.lv = 2;
            obj.lvName = "黑金码";
            break;
          case "diamond_code":
            obj.lv = 3;
            obj.lvName = "钻石码";
            break;
          default:
            obj.lv = 1;
            obj.lvName = "黄金码";
            break;
        }
        return obj;
      }

      if (res.code == "000000") {
        $('.js-lv-name').html(getLevel(res.data.codeGrade).lvName);
        $('.js-lv-name').addClass('lv-' + getLevel(res.data.codeGrade).lv);
      } else if (res.code === "500000") {
        showTip("系统错误");
      }
    })
  }

  //  国别号下拉框
  $.ajax({
    url: 'js/area.json',
    method: "GET",
    dataType: 'JSON'
  }).then(function(res){
      var $li = '';
      res.forEach(function(item){
        $li += '<li class="clearfix"> <span class="left">'+ item.area_name+'</span><span class="right">+'+ item.area_code + '</span> </li>';
      });
      $('#areaList').append($li);
      $('#areaList li').on('click', function(e) {
        var selectAeraCode;
        if (e.target.className == 'left') {
          selectAeraCode = e.target.nextElementSibling.innerHTML;
        } else if (e.target.className == 'right') {
          selectAeraCode = e.target.innerHTML;
        } else {
          selectAeraCode = e.target.lastElementChild.innerHTML;
        }
        $('#areaCode').html(selectAeraCode);
        $('#dropDown').removeClass('rotate');
        $('#areaList').removeClass('show');
      })
  })


  //  点击下拉框
  $('#dropDown').click(function(){

    if ($('#areaList').css('display') == 'block') {
      $('#dropDown').removeClass('rotate');
      $('#areaList').removeClass('show');
      return;
    }
    $('#dropDown').addClass('rotate');
    $('#areaList').addClass('show');
    // $('#areaList').fadeIn();
  })

  $('#mobile').focus(function(){
    $('#dropDown').removeClass('rotate');
    $('#areaList').removeClass('show');
  })

  //  获取验证码
  $('#getTestCode').click(function(){
    var areaCode = $('#areaCode').html();
    var mobile = $('#mobile').val();
    if (time > 0) {
      return;
    }
    if (!mobile) {
      showTip('手机号不允许为空');
      return;
    }
    if (!/^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(areaCode + mobile)) {
      showTip("手机号码格式错误");
      return;
    }
    $.ajax({
      url: API + "/api/user/smsCode",
      method: "post",
      data: {account: mobile, countryNum: areaCode, type: 1},
      dataType: "JSON"
    }).done(function (data) {
      if (data.code == "100008") {
        localStorage.removeItem("wl_token");
        window.location.href = window.location.href;
      }
      if (data.code == "000000") {
        codeToken = data.data.result;
        clearDjs()
        time = 60
        timer = setInterval(djs, 1000);
      } else if (data.code == "000006") {
        showTip("参数错误");
      } else if (data.code == "100102") {
        showTip("手机验证码请求频繁");
      } else if (data.code == "100106") {
        showTip("验证码发送失败");
      } else if (data.code == "000004") {
        showTip("用户不存在");
      } else if (data.code == "500000") {
        showTip("系统错误");
      } else {
        showTip(data.msg);
      }
    });
  })

  //  倒计时
  function djs() {
    if (time <= 0) {
      clearDjs()
      return
    }
    time--;
    $('#getTestCode').html(time + 's');
  }

  //  清除倒计时
  function clearDjs() {
    time = -1
    clearInterval(timer);
    $('#getTestCode').html('获取验证码');
  }

  //  显示提示消息
  function showTip(errtext) {
    $('#errtext').addClass('fade').html(errtext);
    setTimeout(function () {
      $('#errtext').removeClass('fade');
    }, 2000)
  }

  //  登录提示
  function showSuccess(errtext) {
    $('#regsuccess').addClass('fade').html(errtext);
    setTimeout(function () {
      $('#regsuccess').removeClass('fade');
    }, 2000)
  }

  //  登陆
  $('#loginBtn').click(function(){
    var areaCode = "+86";
    var mobile = $('#mobile').val();
    var smsCode = $('#smsCode').val();
    try {
      inviteCode = $('#inviteCode').val() || '';
    }
    catch (e) {
      console.log(e)
    }
    if (!mobile) {
      showTip("手机号不允许为空");
      return;
    }
    if (!/^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(areaCode + mobile)) {
      showTip("手机号码格式错误");
      return;
    }
    if (!codeToken) {
      showTip("请获取验证码");
      return;
    }
    if (!smsCode) {
      showTip("验证码不允许为空");
      return;
    }
    $.ajax({
      url: API + "/api/user/code/login",
      method: "post",
      data: {
        countryNum: areaCode,
        phone: mobile,
        code: smsCode,
        invitedCode: inviteCode,
        codeToken: codeToken
      },
      dataType: "JSON"
    }).then(function (res) {
      res = res || {}
      var errtext = null;
      if (res.code === "000000" || res.code === "200006") {
        localStorage.setItem("wl_h5_token", res.data);
        if (res.code === "000000") {
          showSuccess("您已注册");
        } else {
          showSuccess("恭喜,注册成功");
        }
        window.location.href = "invite.html";
      }
      if (res.code === "500000") {
        showTip("系统错误");
      } else if (res.code == "000006") {
        showTip("参数错误");
      } else if (res.code == "100101") {
        showTip("手机验证码错误");
      } else if (res.code == "000004") {
        showTip("用户不存在");
      } else if (res.code == "100107") {
        showTip("账户状态不可用");
      }
    });
  })
})



