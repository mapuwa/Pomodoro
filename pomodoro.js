
function timeout(x,y) {
    var mins = Math.floor(x/60);
    var secs = x % 60;
    document.getElementById("clock").innerHTML = mins + ":" + (secs > 9 ? secs : "0"+ secs);
    changeTimer(x,y);
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
    var val = current/whole*100;
    var circle = document.getElementById("bar");
    var r = circle.getAttribute('r');
    var c = Math.PI*(r*2);

    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}

    var pct = ((100-val)/100)*c;

    circle.style.strokeDashoffset = pct;
}


document.getElementById("start").addEventListener("click", function () {
    timeout(13,13);
});

