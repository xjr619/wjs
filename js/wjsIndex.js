$(function(){
  // 标签页头部ul宽度重置
  var label_title_box = $(".wjs_label_pages .nav-tabs");
  var label_titles = label_title_box.find("li");
  var totalWidth = 0;
  label_titles.each(function(index,element){
    totalWidth += $(element).innerWidth();
  });
// 长度由每个li的宽度相加
  label_title_box.width(totalWidth);
  //iscrool
  var myScroll = new IScroll('.title_box',{
    scrollX:true,
    freeScroll: true
  });
  var isPC = true;
  //得到数据
  var getData = function(callback){
    $.ajax({
      url:"./js/imgData.json",
      dataType:"json",
      success:function(res){
        callback && callback(res);
      }
    });
  };
  //渲染函数
  function render(){
    getData(function(res){
      var windowW = $(window).width();
      if(windowW > 768){
       isPC = true;
      }else{
       isPC = false;
      }
      var imgHTml = template("imgTemp",{"items":res,"isPC":isPC});
      var indicatorHtml = template("indicator",{"items":res});
      $(".wjs_banner .carousel-indicators").html(indicatorHtml);
      $(".wjs_banner .carousel-inner").html(imgHTml);
    })
  };
  //调用渲染函数
  render();
  //窗口发生尺寸变化时重新调用渲染函数
  $(window).on("resize",function(){
    var windowW = $(window).width();
    if(isPC == true && windowW <=768 || isPC == false || windowW > 768){
      render();
    }
  });
  // 工具提示
  $('[data-toggle="tooltip"]').tooltip();
});
// function addHtml(res){
//   var isPC = true;
//   var windowW = $(window).width();
//   if(windowW > 768){
//    isPC = true;
//   }else{
//    isPC = false;
//   }
//   var imgHTml = template("imgTemp",{"items":res,"isPC":isPC});
//   var indicatorHtml = template("indicator",{"items":res});
//   $(".wjs_banner .carousel-indicators").html(indicatorHtml);
//   $(".wjs_banner .carousel-inner").html(imgHTml);
// };