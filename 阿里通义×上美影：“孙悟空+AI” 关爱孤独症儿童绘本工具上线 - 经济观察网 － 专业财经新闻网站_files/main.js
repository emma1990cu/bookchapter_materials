if($(window).width()>1020){

    $(".head .user p span").remove()
  $(".head .user a:visible:not(:last-child)").after("<span>|</span>");
  $(".head .user a:hidden").prev("span").hide()
  //固定导航
  $(window).scroll(function(){
      var top=$(window).scrollTop();
      // console.log(top);
      if(top>($(".head").offset().top+86)){
      $(".nav").addClass("navfix")
      }else{
      $(".nav").removeClass("navfix")
      }
  })
}
var datenow=new Date;
$("#thisYear").text(datenow.getFullYear())
$(".nav_btn").click(function(){
$(".nav").animate({ left:0},500);
$(".mask_bg").show();
//alert("111111")
})

function closeNav(){
  $(".mask_bg").hide();
  $(".nav").animate({ left:-50 + "%" },500);//手机版收起导航
}


//二级导航
$(".sub_nav").each(function () {
  console.log(".sub_nav",$(this).closest("li.text").offset().left);
  $(this).css({"marginLeft":-$(this).closest("li.text").offset().left,"width":$('body').width()})
})

//选项卡
$(".tabs_click li").click(function () {
  var index=$(this).index()
  $(this).siblings("li").removeClass("on");
  $(this).addClass("on");
  $(this).closest(".tabs_click").siblings(".tab_contents").find(".tab_content").hide();
  $(this).closest(".tabs_click").siblings(".tab_contents").find(".tab_content").eq(index).show()
})

