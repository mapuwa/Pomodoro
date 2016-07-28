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
        isRunning: function () { return running; },
        isPaused: function () { return paused; },
        stop: function () { stopTimer(); },
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

Notification.requestPermission();

var timer;
var sessionLength = 25;
var breakLength = 5;

/* Helping info functions */
function notify(message) {
    if ("Notification" in window && Notification.permission === "granted") {
        var notification = new Notification(message);
    }
}
/* Timers factories */
function createSessionTimer() {
    document.getElementsByTagName("body")[0].setAttribute("timer", "session");
    return Timer(6, function () {
        openInfoModal("Session ends <br> Enjoy your break");
        notify("Session ends!");
    });
}
function  createBreakTimer() {
    document.getElementsByTagName("body")[0].setAttribute("timer", "break");
    return Timer(breakLength * 60, function () {
        openInfoModal("Break ends <br> Good luck in work");
        notify("Break ends!");
    });
}

/* Control buttons */
function pauseButtonHandler() {
    if (!timer || timer && !timer.isRunning()) { // When pomodoro is not running, run session timer
        // Display stop button
        document.getElementById("stopButton").style.display = "inline-block";
        document.getElementById("stopButton").style.opacity = 1;
        timer = createSessionTimer();
    }
    else { // When pomodoro is running, pause or resume timer
        if (timer.isPaused()) timer.play();
        else timer.pause();
    }
}
function stopButtonHandler() {
    timer.stop();
    document.getElementsByTagName("body")[0].setAttribute("timer", "");
    document.getElementById("timer-mins").innerHTML = sessionLength; // Init session timer
    document.getElementById("stopButton").style.opacity = 0; // Hide stop button
    document.getElementById("stopButton").style.display = "none";
}
document.getElementById("stopButton").addEventListener("click", stopButtonHandler);
document.getElementById("pauseButton").addEventListener("click", pauseButtonHandler);

/* Modal windows */
function openInfoModal(text) {
    document.getElementById("info-text").innerHTML = text;
    document.getElementById("info-modal").style.display = "block";
    setTimeout(function () {
        document.getElementById("info-modal").style.opacity = 1;
    }, 1);
}
function closeInfoModal() {
    /* Close info modal window */
    document.getElementById("info-modal").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("info-modal").style.display = "none";
    }, 1000);
    /* Start next pomodoro timer */
    var bodyTimer = document.getElementsByTagName("body")[0].getAttribute("timer");
    if (bodyTimer === "session")
        timer = createBreakTimer();
    else if (bodyTimer === "break")
        timer = createSessionTimer();
}

function openSettingsModal() {
    document.getElementById("settings-modal").style.display = "block";
    setTimeout(function () {
        document.getElementById("settings-modal").style.opacity = 1;
    }, 1);
}
function closeSettingsModal() {
    /* Update pomodoro lengths */
    sessionLength = document.getElementById("session-length").valueOf().value;
    breakLength = document.getElementById("break-length").valueOf().value;
    /* Update session length, when pomodoro is not running */
    var bodyTimer = document.getElementsByTagName("body")[0].getAttribute("timer");
    if (bodyTimer !== "session" && bodyTimer !== "break") {
        document.getElementById("timer-mins").innerHTML = sessionLength;
    }
    /* Close settings modal window*/
    document.getElementById("settings-modal").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("settings-modal").style.display = "none";
    }, 1000);
}
document.getElementById("info-modal-close").addEventListener("click", closeInfoModal);
document.getElementById("settings-button").addEventListener("click", openSettingsModal);
document.getElementById("settings-modal-close").addEventListener("click", closeSettingsModal);


/* Keyboard shortcuts */
window.addEventListener("keydown", function (e) {
    if (e.keyCode == 27) {
        if (document.getElementById("info-modal").style.opacity == 1) {
            closeInfoModal();
        }
        else if (document.getElementById("settings-modal").style.opacity == 1) {
            closeSettingsModal();
        }
    }
    else if(e.keyCode == 32) {
        pauseButtonHandler();
    }
    else if(e.keyCode == 83) {
        openSettingsModal();
    }
});