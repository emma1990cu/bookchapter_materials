const shareUrl = 'https://www.alsolife.com/dh-publicity-web'
const path = `https://www.alsolife.com/api/wx/mp/jsapi/getConfig/wx7318166330c9cba4?url=${window.location.href}`;
const imgLink = 'https://mmbiz.qpic.cn/sz_mmbiz_png/ld6XziaxdzkN1Q1kicEQWENmXtgHia92icjWwC4TOxTLZ6icvk32v4cCibLesKJhHJvVUdZo5GNINhwwDicHaO3ugnkOg/640?wx_fmt=png'
// const path = `http://xauat.alsoaba.com/api/wx/mp/jsapi/getConfig/wx6dc0660bba3d1303?url=${window.location.href}`
// const imgLink = 'https://mmbiz.qpic.cn/mmbiz_png/MMnmDCAKfHsWt1CiaeZPkFmuOEM3SWHNy5THCJXTff8mTvhjwgTyWglcNtia39fMxI4wMRiaXkibsibr1NzkMobPAGA/640?wx_fmt=png'
// const shareUrl = 'http://xauat.alsoaba.com/dh-publicity-web'
var xhr = new XMLHttpRequest();
xhr.open("GET", path, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // JSON文件已成功加载
      const jsonData = JSON.parse(xhr.responseText);
      console.log("🚀 ~ file: weChat.js:9 ~ jsonData:", jsonData);
      const data = jsonData.data;
      console.log(data);
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          "chooseWXPay",
          "updateAppMessageShareData",
          "updateTimelineShareData",
        ],
      });
      wx.ready(function () {
        console.log(
          "console log ~ file: wx-pay-common.js ~ line 25 ~ wx",
          "注册成功"
        );
        // 分享朋友圈和朋友
        wx.updateAppMessageShareData({
          title: "AI个训机器人白皮书",
          desc: "数字疗法+人工干预，康复效果更显著",
          link: encodeURI(shareUrl),
          imgUrl: imgLink,
          success: function () {
            console.log("分享朋友");
          },
        });
        wx.updateTimelineShareData({
          title: "AI个训机器人白皮书",
          link: encodeURI(shareUrl),
          imgUrl: imgLink,
          success: function () {
            console.log("分享朋友圈");
          },
        });
      });
    } else {
      // 请求失败
    }
  }
};
xhr.send();
