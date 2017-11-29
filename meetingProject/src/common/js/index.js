var unitFun = {

  phone:'15826177123',
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
}
export default unitFun;