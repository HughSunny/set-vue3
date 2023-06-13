export function checkUrl(sUrl) {
  // var sRegex =
  //   '^((https|http|ftp|rtsp|mms)?://)' +
  //   "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
  //   '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
  //   '|' + // 允许IP和DOMAIN（域名）
  //   "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
  //   '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
  //   '[a-z]{2,6})' + // first level domain- .com or .museum
  //   '(:[0-9]{1,4})?' + // 端口- :80
  //   '((/?)|' + // a slash isn't required if there is no file name
  //   "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  var sRegex =
    '^((https|http|ftp|rtsp|mms)?://)+[A-Za-z0-9]+.[A-Za-z0-9]+[/=?%-&_~`@[]\':+!]*([^<>""])*$';
  var re = new RegExp(sRegex);
  //re.test()
  if (re.test(sUrl)) {
    return true;
  }
  return false;
}

export function checkAnchor(url) {
  var reg = '^#[A-Za-z0-9]+';
  var re = new RegExp(reg);
  if (re.test(url)) {
    return true;
  }
  return false;
}
