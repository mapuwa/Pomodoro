
function timeout(x,y) {
    var mins = Math.floor(x/60);
    var secs = x % 60;
    document.getElementById("clock").innerHTML = mins + ":" + (secs > 9 ? secs : "0"+ secs);
    changeTimer(x - 1, y);
    setTimeout(function () {
        x--;
        if (x)
            timeout(x,y);
        else {
	    	document.getElementById("clock").innerHTML = "00:00";
            changeTimer(0,y);
		alert("Short break");
		timeout(5*60, 5*60);
	}
    }, 1000);
}


function changeTimer(current, whole) {
    var value = current / whole ;
    if (value < 0)  value = 0;
    else if (value > 1) value = 1;

    var circle = document.getElementById("bar");
    var r = circle.getAttribute('r');

    var dashOfsset = (1 - value) * Math.PI*(r*2);

    circle.style.strokeDashoffset = dashOfsset;
}


document.getElementById("start").addEventListener("click", function () {
    timeout(12,12);
});

