function getDecimal(num) {
    var str = "" + num;
    var zeroPos = str.indexOf(".");
    if (zeroPos == -1) return 0;
    str = str.slice(zeroPos);
    return str;
}

function getLeft(object) {
    var rect = object.getBoundingClientRect();
    var left = rect.left + document.body.scrollLeft;
    return left;
}

function addClass(el, className) {
    if (el.classList){
        el.classList.add(className);
    }else{
        el.className += ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    }
    else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

function isHidden(el) {
    return (el.offsetParent === null)
}