let timer;
let running = false;
let seconds = 0, minutes = 0, hours = 0;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");

function formatTime(num) {
    return num < 10 ? "0" + num : num;
}

function updateDisplay() {
    display.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function startChronometer() {
    if (!running) {
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 1000);
        running = true;
        startStopButton.innerText = "Stop";
    } else {
        clearInterval(timer);
        running = false;
        startStopButton.innerText = "Start";
    }
}

function resetChronometer() {
    clearInterval(timer);
    running = false;
    startStopButton.innerText = "Start";
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
}

startStopButton.addEventListener("click", startChronometer);
resetButton.addEventListener("click", resetChronometer);
