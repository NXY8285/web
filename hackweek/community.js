function $(id) {
    return document.getElementsByClassName(id);
}
function f() {
    document.getElementsByClassName('apply')[0].classList.toggle('joined');
    if (document.getElementsByClassName('apply')[0].classList.contains('joined')) {
        setTimeout(function() {
            document.getElementsByClassName('apply')[0].textContent="已关注";
        }, 500)
    } else {
        document.getElementsByClassName('apply')[0].textContent="关注"
    }
}
function g() {
    
    if (document.getElementsByClassName('sort-type')[0].classList.contains('hotest')) {
        document.getElementsByClassName('sort-type')[0].classList.toggle('hotest');
        document.getElementsByClassName('sort-type')[0].textContent="最新";
    } 
    else {
        document.getElementsByClassName('sort-type')[0].classList.toggle('hotest');
        document.getElementsByClassName('sort-type')[0].textContent="最热"
    }
}