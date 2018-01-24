var unitFun = {

  phone: '15826177123',
  QueryString: function (val) {
    var uri = window.location.href;
    var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
    return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
  },


  /**
* 时间格式化函数
* format 时间格式 (EG:  format="yyyy-MM-dd hh:mm:ss"), date 需要格式时间
* safari 不支持yyyy-mm-dd格式 需将时间转化为yyyy/mm/dd格式
* 默认显示年月日
*/
  format: function (date, format) {
    var date = parseInt(date);
    var format = format || 'yyyy-MM-dd', date = new Date(date);
    var o = {
      "M+": date.getMonth() + 1, // month
      "d+": date.getDate(), // day
      "h+": date.getHours(), // hour
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
      "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
      "S": date.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  },
  formatMsgTime(stime, ntime) {


    var milliseconds;
    var timeSpanStr;

    milliseconds = ntime - stime;
    if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚';
    }
    else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟';
    }
    else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时';
    }
    else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天';
    }
    return timeSpanStr;
  },

  //汉字转Unicode
  zhToUnicode: function (zh) {
    return escape(zh).toLocaleLowerCase().replace(/%u/gi, '\\u');
  },

  //Unicode转汉字
  unicodeToZh: function (unicode) {
    return unescape(unicode.replace(/\\u/gi, '%u'));
  },
  //截取后缀名
  cutPostfix: function (str) {
    var str = str;
    var index1 = str.lastIndexOf(".");
    var index2 = str.length;
    var suffix = str.substring(index1 + 1, index2);//后缀名
    return suffix
  },
  //图片上传
  fileChange: function () {
    imgChange(0);
    debugger
    function imgChange(index) {
      var Cnv = document.getElementById('myCanvas');
      var Cntx = Cnv.getContext('2d');//获取2d编辑容器
      var imgss = new Image();
      var agoimg = document.getElementById("ago");

      var imgFile = new FileReader();
      imgFile.readAsDataURL(img.files[index]);
      imgFile.onload = function (e) {
        url = e.target.result;
        imgss.src = url;
        agoimg.src = url;
        agoimg.onload = function () {
          //等比缩放
          var m = imgss.width / imgss.height;
          Cnv.height = 1000;//该值影响缩放后图片的大小
          Cnv.width = 1000 * m;
          //img放入画布中
          //设置起始坐标，结束坐标
          Cntx.drawImage(agoimg, 0, 0, 1000 * m, 1000);

          var imgData = Cnv.toDataURL("image/png");

          // 去除多余，写入页面
          $(".pic").append("<li><img src=" + imgData + " /><a class='close'></a></li>");
          $(".pic li").height($(".pic li").width());
          $(".close").click(function () {
            $(this).parent().remove();
            $("#fileBtn").val("");
          })
          if ($(".pic li").length > 9) {
            $(".addBtn").hide();
            window.AppJsObj.appAlert("最多只能选择5张图片！");
            return;
          }

          agoimg.src = "";
          Cntx.clearRect(0, 0, 1000 * m, 1000);
          j = index + 1;
          imgChange(j);
        }
      }
    }
  },
  //按照分号换行
  splitWords: function (str) {
    if (str) {
      var strs = str.split("；");
      return strs;

    } else {
      return false
    }
  },
  //截取base64码
  cutBase64: function (str) {
    if (str) {
      return str.substring(23);
    }
  },
  /**
 * [isMobile 判断平台]
 * @param test: 0:iPhone    1:Android
 */
  ismobile: function (test) {
    var u = navigator.userAgent, app = navigator.appVersion;
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
      if (window.location.href.indexOf("?mobile") < 0) {
        try {
          if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
            return '0';
          } else {
            return '1';
          }
        } catch (e) { }
      }
    } else if (u.indexOf('iPad') > -1) {
      return '0';
    } else {
      return '1';
    }
  }
}
export default unitFun;