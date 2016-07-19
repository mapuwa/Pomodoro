function rev(x) {
    setTimeout(function () {
        x--;
        document.getElementById("clock").innerHTML = x;
        if (x) rev(x);
    }, 1000);
}
document.getElementById("start").addEventListener("click", function () {
    var x = 360
    rev(x);
});