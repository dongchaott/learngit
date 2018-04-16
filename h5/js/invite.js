$(function () {
  // var API = 'http://47.97.166.210:8079';
  var className = 'active';
  var token = localStorage.getItem('wl_h5_token');
  var shareLink;

  $('table:first-child').addClass(className);
  invitePeopleStatus(1, $('table:first-child'));

  //  显示提示消息
  function showTip(errtext) {
    $('#errtext').addClass('fade').html(errtext);
    setTimeout(function () {
      $('#errtext').removeClass('fade');
    }, 2000)
  }

  //  获取邀请码
  $.ajax({
    url: API + "/api/invitationCode/obtainCodeConnection",
    method: "post",
    data: {
      token: token
    },
    dataType: "JSON"
  }).then(function(res){
    setInfo(res)
    setWechatInfo(res)
  })

  function setWechatInfo(res) {
    var inviteCode = res.data
    changeWechatInfo(inviteCode)
  }


  function setInfo(res) {
    var inviteCode = res.data;
    $('.js-invite-code').html(inviteCode);
    //  我的邀请码
    $.ajax({
      url: API + "/api/invitationCode/obtainCodeAndRanking",
      method: "post",
      data: {
        token: token
      },
      dataType: "JSON"
    })
      .then(function (res) {
        function getLevel(grade) {
          var obj = {
            lv: "",
            lvName: ""
          };
          switch (grade) {
            case "gold_code":
              obj.lv = 1;
              obj.lvName = "黄金";
              break;
            case "black_gold_code":
              obj.lv = 2;
              obj.lvName = "黑金";
              break;
            case "diamond_code":
              obj.lv = 3;
              obj.lvName = "钻石";
              break;
            default:
              obj.lv = 1;
              obj.lvName = "黄金";
              break;
          }
          return obj;
        }

        if (res.code == "000000") {
          shareLink = window.location.origin + '/static/h5/register.html?inviteCode=' + res.data.code;
          console.log(shareLink)
          $('.js-lv-name').html(getLevel(res.data.codeGrade).lvName);
          $('.js-invite-code').addClass('lv-' + getLevel(res.data.codeGrade).lv);
        }
        if (res.code === "500000") {
          showTip("系统错误");
        }
      })
  }

  //  查看我的二维码
  $('#lookQRcode').click(function(){
    $('#qrcode').html('');
    new QRCode(document.getElementById('qrcode'), shareLink);
    $('#qrcodeBox').show();
  })

  $('.qrcode-bg').click(function(){
    $('#qrcodeBox').hide();
  })

  //  返现余额
  $.ajax({
    url: API + "/api/invitationCode/obtainBalanceAndRanking",
    method: "post",
    data: {
      token: token
    },
    dataType: "JSON"
  })
    .then(function (res) {
      if (res.code == "000000") {
        $('.js-cash-back-ok').html(Number(res.data.alreadyCashBack).toFixed(2));
        $('.js-cash-back-frozen').html(Number(res.data.cashBackFreezeMoney).toFixed(2));
        $('.js-cash-back-total').html(Number(res.data.totalCashBack).toFixed(2));
      }
      if (res.code === "500000") {
        showTip("系统错误");
      }
    })

  $('.type li').click(function () {
    $('.type li').removeClass(className);
    $(this).addClass(className);
    var type = parseInt($(this).data('type'));
    $('.tips').removeClass(className);
    $('.tips:nth-child(' + (type + 1) + ')').addClass(className);

    $('table').removeClass(className);
    var $table = $('table:nth-child(' + (type + 1) + ')');
    $table.addClass(className);

    invitePeopleStatus(type, $table)
  });

  //  被邀请人状态码状态查询
  function invitePeopleStatus(type, $table) {
    $.ajax({
      url: API + "/api/invitationCode/invitePeopleStatus",
      method: "post",
      data: {
        token: token,
        status: type,
        currentPage: 1,
        pageSize: 10
      },
      dataType: "JSON"
    })
      .then(function (res) {
        if (res.code === '000000') {
          if (res && res.data) {
            var tableData = res.data.data || [];
            if (tableData.length < 1) {
              return;
            }
            var html = '';
            for (var i = 0; i < tableData.length; i++) {
              var item = tableData[i];
              html += '<tr>';
              if (type === 0) {
                html += '<td>' + item.mobile + '</td>';
                html += '<td>' + moment(item.time).format('YYYY-MM-DD HH:mm:ss') + '</td>';
              }
              if (type === 1) {
                html += '<td>' + item.mobile + '</td>';
                html += '<td>' + item.orderNumber + '</td>';
                html += '<td>' + moment(item.time).format('YYYY-MM-DD HH:mm:ss') + '</td>';
              }

              if (type === 2) {
                html += '<td>' + item.mobile + '</td>';
                html += '<td>' + item.orderNumber + '</td>';
                html += '<td>' + item.couponMoney + "元 *" + item.number + '</td>';
              }
              html += '</tr>'
            }
            $table.find('tbody').html(html)
          }
        } else if (res.code === '100008') {
          showTip("token过期重新登录");
        } else if (res.code === '500000') {
          showTip("系统错误");
        }
      })
  }
});
