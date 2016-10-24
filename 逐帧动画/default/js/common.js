
$(function(){
	var win_h = $(window).height();//屏幕高度
	var	top_h = $(".rooms").height();

  $(window).bind('load resize',function(){
    var win_h = $(window).height();//屏幕高度
    if(win_h<720){
      win_h=720;
    }
    var top_h = $(".rooms").height();
    $(".chat-box").css({'height':win_h-top_h-12-6});

    $("#tabs-content").css({'height':win_h-15-15-15-78-72-50-4-6-6});
    $("#room-groups").css({'height':win_h-78-15-26-4-40-51-50-27-4-6-6});
  })
  // $(".chat-box").css({'height':win_h-top_h});
	// console.log(top_h);
	//$("#room-groups").css({'height':win_h-78-15-26-4-40-51-50-27});
});
Date.prototype.format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 

//播放音频特效
function audios(i){
  var au_box = document.getElementById("audio");
  au_box.pause();
  var url = 'default/sound/'+i+'.mp3';
  au_box.setAttribute('src',url);
  au_box.play();
};
/**
 * 声音标签说明
 * 1~~~18：1号玩家请发言~~~18号玩家请发言
 * night：天黑了
 * sheriff：选警长
 * vote：开始投票
 * gameOver：游戏结束
 * day_to_night：白天过渡到夜晚（有狼叫）
 * click：鼠标点击按钮的音效
 * hover：鼠标掠过按钮的音效
 * night_to_day：夜晚过度到白天
 * cricket(1-3):夜晚蛐蛐叫随机播放
 * a1:狼人杀人
 * a6:猎人开枪
 * a3m:女巫下毒
 * a3n:女巫治疗
 * a4:先知查探
 */

/**
 * 音效[点击]
 */
$("*").bind('click',function(){
  audios('click');
})
/**
 * 游戏声音控制
 */
function voice(id,cod,x){
  //id:外框ID，cod:默认位置,x:(1,游戏音量;2,话筒音量)
  //小数转百分比
    Number.prototype.toPercent = function(){
    return (Math.round(this * 10000)/100).toFixed(1);
  }
    //动态参数
    var $box = $('#'+id);
    var $bg = $box.find('.drags'),$bgcolor = $box.find('.bgcolor'),$btn = $box.find('.bgt');
    var statu = false;
    var percent = cod //位置百分比
    var left = (percent/100)*380;
    var bgleft = (percent/100)*380;
    var ox = 0;
    var lx = 0;
    $btn.css('left',percent+'%');
    $bgcolor.css('width',percent+'%')
    if(x===1){
      document.getElementById("audio").volume = percent/100;
      document.getElementById("a-music").volume = percent/100;
    }
    $btn.mousedown(function(e){
      lx = $btn.offset().left;
      ox = e.pageX - left;
      statu = true;
    });
  $(document).mouseup(function(){
      statu = false;
  });
    $box.mousemove(function(e){
      if(statu){
         left = e.pageX - ox;
         if(left < 0){
          left = 0;
         }
         if(left > 380){
          left = 380;
         }
         $btn.css('left',left);
         $bgcolor.width(left);
         if(x===1){
          document.getElementById("audio").volume = left/380;
          document.getElementById("a-music").volume = left/380;
        }
      }
    });
    $bg.click(function(e){
      if(!statu){
       bgleft = $bg.offset().left;
       left = e.pageX - bgleft;
       if(left < 0){
        left = 0;
       }
       if(left > 380){
        left = 380;
       }
       $btn.css('left',left);
       $bgcolor.stop().animate({width:left},100);
       if(x===1){
        document.getElementById("audio").volume = left/380;
        document.getElementById("a-music").volume = left/380;
        }
      }
   });
}
/**
 * 特效动画
 * gif 全局动画 day night
 * gif2 a1:狼人杀人 a6:猎人开枪 a3m:女巫下毒 a3n:女巫治疗 a4:先知查探
 */
function gif(e){
  var url = '<img src="default/images/gif/'+e+'.gif" alt="">';
  $("body").append('<div class="gif" id="gif"><p>'+url+'</p></div>')
  setTimeout(function(){
    $("#gif").remove();
  },2000)
}
function gif2(e,t,time){
  var url = '<img src="default/images/gif/'+e+'.gif" alt="">';
  $(t).parents('.players-box').append('<div class="gif-small"><p>'+url+'</p></div>')
  setTimeout(function(){
    $(".gif-small").remove();
  },time)
}