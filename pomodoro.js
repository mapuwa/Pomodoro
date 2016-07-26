
function timeout(x) {
    var mins = Math.floor(x/60);
    var secs = x % 60;
    document.getElementById("clock").innerHTML = mins + ":" + (secs > 9 ? secs : "0"+ secs);
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

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(x, y, radius, startAngle, endAngle){
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(" ");

    return d;
}

document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 100, 0, 90));