
function changeTimer(current, whole) {
    var value = current / whole ;
    if (value < 0)  value = 0;
    else if (value > 1) value = 1;

    var circle = document.getElementById("bar");
    var r = circle.getAttribute('r');

    circle.style.strokeDashoffset = (1 - value) * Math.PI*(r * 2);
}

var Timer = function(w, callback) {
    var current = w;
    var whole = w;
    var running = true;
    var timer = setInterval(function(){ intervalFunc() }, 1000);

    changeTimer(current - 1, whole);

    function intervalFunc() {
        current--;
        var mins = Math.floor(current / 60);
        var secs = current % 60;
        document.getElementById("clock").innerHTML = mins + ":" + (secs > 9 ? secs : "0" + secs);
        changeTimer(current - 1, whole);
        if (current === 0) stopTimer();
    }

    function stopTimer() {
        clearInterval(timer);
        running = false;
        callback();
    }

    return {
        getCurrent: function () {
            return current;
        },
        isRunning: function () {
            return running;
        },
        stop: function () {
            stopTimer();
        }
    };

};
var timer;
document.getElementById("startButton").addEventListener("click", function () {
    document.getElementsByTagName("body")[0].setAttribute("timer", "on");
    var timer = Timer(12, function () {
        console.log("A");
    });

});

