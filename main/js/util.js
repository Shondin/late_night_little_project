function getDecimal(num) {
  var str = "" + num;
  var zeroPos = str.indexOf(".");
  if (zeroPos == -1) return 0;
  str = str.slice(zeroPos);
  return str;
}

function getLeft(object){
    var rect = object.getBoundingClientRect();
    var left =  rect.left + document.body.scrollLeft;
    return left;
}