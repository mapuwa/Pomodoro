
var Timer = function(w, callback) {
    var current = w;
    var whole = w;
    var running = true;
    var paused = false;
    var timer = setInterval(function(){ intervalFunc() }, 1000);

    changeTimer(-1);

    function displayTime() {
        var mins = Math.floor(current / 60);
        var secs = current % 60;
        document.getElementById("timer-mins").innerHTML = mins ;
        document.getElementById("timer-secs").innerHTML = (secs > 9 ? secs : "0" + secs);
    }
    function changeTimer(correction) {
        if (!correction)  correction = 0;
        var value = (current + correction) / whole ;
        if (value < 0)  value = 0;
        else if (value > 1) value = 1;

        var circle = document.getElementById("bar");
        var r = circle.getAttribute('r');
        circle.style.strokeDashoffset = (1 - value) * Math.PI*(r * 2);
    }
    function intervalFunc() {
        if (paused) return;
        current--;
        displayTime();
        changeTimer(-1);
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
        isPaused: function () {
            return paused;
        },
        stop: function () {
            stopTimer();
        },
        pause: function () {
            paused = true;
            changeTimer(0);
        },
        play: function () {
            paused = false;
        }

    };

};
var timer;
document.getElementById("startButton").addEventListener("click", function () {
    document.getElementsByTagName("body")[0].setAttribute("timer", "break");
    timer = Timer(6, function () {
        console.log("A");
    });
});
document.getElementById("pauseButton").addEventListener("click", function () {
    if (timer && timer.isRunning()) {
        if (timer.isPaused()) {
            timer.play();
        }
        else {
            timer.pause();
        }
    }
});
