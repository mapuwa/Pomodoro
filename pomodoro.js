
function timeout(x) {
    var mins = Math.floor(x/60);
    var secs = x % 60;
    document.getElementById("clock").innerHTML = (mins > 9 ? mins : "0"+ mins) + ":" + (secs > 9 ? secs : "0"+ secs);
    setTimeout(function () {
        x--;
        if (x) timeout(x);
        else {
	    	document.getElementById("clock").innerHTML = "00:00"
		alert("Short break");
		timeout(5*60);
	}
    }, 1000);
}
document.getElementById("start").addEventListener("click", function () {
    timeout(13);
});
