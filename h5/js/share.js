function changeWechatInfo(inviteCode) {
  function is_weixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      $("#rs").text("微信浏览器");
      return true;
    } else {
      return false;
    }
  }
  function start(success) {
      if (inviteCode) {
        $.ajax({
          url: API + "/api/invitationCode/obtainGradeAndRewardInfo",
          method: "post",
          data: {inviteCode: inviteCode, batchNo: batchNo},
          dataType: "JSON"
        }).then(function(res){
          document.title = '我是第' + res.data.ranking + '位雪豹矿工,邀请您一起挖矿!';

          if (window.location.pathname.indexOf('invite') !== -1) {
            $('#rewardInfo').html(res.data.discountsNum + '*' + res.data.discountsCash)
          }
          success(res.data)
        })
      } else {
        document.title = '我是第1024位雪豹矿工,邀请您一起挖矿!';
        var data = {
          codeGrade: false,
          ranking: 1024
        }
        success(data)
      }
  }
  start(function(res){
    $.ajax({
      url: API + "/api/wechat/getShareParam.open",
      method: "post",
      data: {
        url: location.href.split("#")[0]
      },
      dataType: "JSON"
    }).then(function (data) {
      data.sharedata = res;
      if(is_weixin()){
        shareWechat(data);
      }
    })
  })

  function shareWechat(data) {
    var sharedata = {
      imgUrl: window.location.origin + "/static/h5/images/90x90.jpg",
      title: '我是第' + data.sharedata.ranking + '位雪豹矿工,邀请您一起挖矿!',
      desc: (inviteCode && data.sharedata.grade) ? '点击立购，每台矿机可优惠' + data.sharedata.discountsCash + '元！49T超高算力，挖矿速率和收益爽到飞起！' : '',
      link: inviteCode ? window.location.origin + "/static/h5/register.html?inviteCode=" + inviteCode : window.location.origin + "/static/h5/register.html"
    };


    wx.config({
      debug: false,
      appId: data.data.appId,
      timestamp: data.data.timestamp,
      nonceStr: data.data.noncestr,
      signature: data.data.signature,
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "onMenuShareQZone"
      ]
    });
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: sharedata.title,
        link: sharedata.link,
        imgUrl: sharedata.imgUrl
      });
      wx.onMenuShareAppMessage({
        desc: sharedata.desc, // 分享描述
        title: sharedata.title,
        link: sharedata.link,
        imgUrl: sharedata.imgUrl,
        type: "link", // 分享类型,music、video或link，不填默认为link
        dataUrl: "" // 如果type是music或video，则要提供数据链接，默认为空
      });
      wx.onMenuShareQQ({
        desc: sharedata.desc, // 分享描述
        title: sharedata.title,
        link: sharedata.link,
        imgUrl: sharedata.imgUrl
      });

      wx.onMenuShareWeibo({
        desc: sharedata.desc, // 分享描述
        title: sharedata.title,
        link: sharedata.link,
        imgUrl: sharedata.imgUrl
      });
      wx.onMenuShareQZone({
        desc: sharedata.desc, // 分享描述
        title: sharedata.title,
        link: sharedata.link,
        imgUrl: sharedata.imgUrl
      });
    })
  }
}


// new VConsole()
