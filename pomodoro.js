function rev(x) {
    setTimeout(function () {
        x--;
        var mins = Math.floor(x/60);
        var secs = x % 60;
        document.getElementById("clock").innerHTML = (mins > 9 ? mins : "0"+ mins) + ":" + (secs > 9 ? secs : "0"+ secs);
        if (x) rev(x);
        else alert("The end");
    }, 1000);
}
document.getElementById("start").addEventListener("click", function () {
    var x = 13;
    var mins = Math.floor(x/60);
    var secs = x % 60;
    document.getElementById("clock").innerHTML = (mins > 9 ? mins : "0"+ mins) + ":" + (secs > 9 ? secs : "0"+ secs);
    rev(x);
});