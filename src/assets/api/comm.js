let env = process.env.NODE_ENV
let $domain = ''
if (env === 'development') {
  // 开发模式
  $domain = '/restapi/'
} else {
  // 发布模式
  $domain = '/Site/admin/'
}

$.ajaxSetup({timeout:10000,cache:false})

$(document).ajaxSend(function(e,xhr,opt) {
  layer.load(2);
	opt.url = $domain + opt.url
});

$(document).ajaxSuccess(function(e,xhr,opt){
  layer.closeAll('loading');
	var data = JSON.parse(xhr.responseText);
	switch(Number(data.Error)){
		case 200:
			console.log('ok')
			break;
    case 706:
      layer.msg(data.Message,{
        time: 1500
      },function () {
        window.location.href = '/'
      });
      break;
		  default:
		    layer.msg(data.Message,{
          time: 1500
        });
	}
});

$(document).ajaxError(function(e,xhr,opt){
  layer.msg('网络链接错误，请检查您的网络或刷新重试！');
  // console.log('请求连接失败！')
  setTimeout(function(){
    layer.closeAll('loading');
  }, 2000);
});

$(document).ajaxComplete(function(e,xhr,opt){
  // console.log('请求完成！')
  layer.closeAll('loading');
});

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
window.Date.prototype.Format = function(format) {
	var o = {
    //month
		"M+": this.getMonth() + 1,
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
	return format;
}
