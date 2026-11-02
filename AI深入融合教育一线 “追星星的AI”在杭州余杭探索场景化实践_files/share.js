$(function () {
  initModel();
});

function showModel(id) {
  var $model = $(".model#" + id);
  if ($model.is(":hidden")) {
    $model.addClass("share-show");
    $model.show();
    setTimeout(function () {
      $model.removeClass("share-show");
    }, 250);
  }
}

function initModel() {
  var title = encodeURIComponent(document.title);
  var url = location.href;

  $("body").append(
    '<div class="model" id="wechat"><div class="model-nav"><h4>Share - Wechat</h4><i class="close"></i></div><div class="model-content" id="qrcode"></div></div>'
  );
  new QRCode(document.getElementById("qrcode"), {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // 防止有多个model
  $(".model").each(function () {
    var width = $(this).width();
    var height = $(this).height();
    $(this).css({
      left: "calc(50% - " + width / 2 + "px)",
      top: "calc(50% - " + height / 2 + "px)",
    });
  });

  $(".model i.close").on("click", function () {
    var $model = $(this).parents(".model");
    if ($model.is(":visible")) {
      $model.addClass("share-hide");
      setTimeout(function () {
        $model.hide();
        $model.removeClass("share-hide");
      }, 250);
    }
  });

  $('[data-share="facebook"]').on("click", function () {
    window.open("https://www.facebook.com/sharer.php?title=" + title + "&u=" + url, "blank");
  });

  $('[data-share="twitter"]').on("click", function () {
    window.open("https://x.com/intent/post?text=" + title + "&url=" + url, "blank");
  });

  $('[data-share="weibo"]').on("click", function () {
    window.open("https://service.weibo.com/share/share.php?title=" + title + "&url=" + url, "blank");
  });

  $('[data-share="linkedin"]').on("click", function () {
    window.open("https://www.linkedin.com/shareArticle?mini=true&title=" + title + "&url=" + url, "blank");
  });

  $('[data-share="wechat"]').on("click", function () {
    showModel("wechat");
  });

  $('[data-share="whatsapp"]').on("click", function () {
    window.open("https://wa.me/?text=" + title + " " + url, "blank");
  });
}
