var Timer = function(w, callback) {
    var current = w;
    var whole = w;
    var running = true;
    var paused = false;
    var timer = setInterval(function(){ intervalFunc() }, 1000);
    changeTimer(-1);
    displayTime();
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
        var sound = new Audio("gong.wav");
        sound.play();
        current = 0;
        displayTime();
        current = whole;
        changeTimer();
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
            changeTimer(-1);
        }
    };
};

function openInfoModal(text) {
    document.getElementById("info-text").innerHTML = text;
    document.getElementById("info-modal").style.display = "block";
    setTimeout(function () {
        document.getElementById("info-modal").style.opacity = 1;
    }, 1);
}

var timer;
var sessionLength = 25;
var breakLength = 5;

document.getElementById("stopButton").addEventListener("click", function () {
    document.getElementsByTagName("body")[0].setAttribute("timer", "");
    timer.stop();
    timer = null;
    document.getElementById("timer-mins").innerHTML = sessionLength;

    document.getElementById("stopButton").style.opacity = 0;
});
document.getElementById("pauseButton").addEventListener("click", function () {
    if (!timer || timer && !timer.isRunning()) {
        document.getElementsByTagName("body")[0].setAttribute("timer", "session");
        document.getElementById("stopButton").style.opacity = 1;
        timer = Timer(6, function () {
            openInfoModal("Session end <br> Enjoy your break");
        });
    }
    else {
        if (timer.isPaused()) {
            timer.play();
        }
        else {
            timer.pause();
        }
    }
});

document.getElementById("settings-button").addEventListener("click", function () {
    document.getElementById("settings-modal").style.display = "block";
    setTimeout(function () {
        document.getElementById("settings-modal").style.opacity = 1;
    }, 1);
});

document.getElementById("settings-modal-close").addEventListener("click", function () {
    sessionLength = document.getElementById("session-length").valueOf().value;
    breakLength = document.getElementById("break-length").valueOf().value;
    document.getElementById("settings-modal").style.opacity = 0;
    var bodyTimer = document.getElementsByTagName("body")[0].getAttribute("timer");
    if (bodyTimer !== "session" && bodyTimer !== "break") {
        document.getElementById("timer-mins").innerHTML = sessionLength;
    }
    setTimeout(function () {
        document.getElementById("settings-modal").style.display = "none";
    }, 1000);
});

document.getElementById("info-modal-close").addEventListener("click", function () {
    document.getElementById("info-modal").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("info-modal").style.display = "none";
    }, 1000);

    var body = document.getElementsByTagName("body")[0];
    if (body.getAttribute("timer") === "session") {
        body.setAttribute("timer", "break");
        timer = Timer(breakLength * 60, function () {
            openInfoModal("Break ends <br> Good luck in work");
        });
    }
    else if (body.getAttribute("timer") === "break") {
        body.setAttribute("timer", "session");
        timer = Timer(sessionLength * 60, function () {
            openInfoModal("Session ends <br> Enjoy your break");
        });
    }
});