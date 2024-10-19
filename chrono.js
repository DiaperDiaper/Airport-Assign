let timer;
let running = false;
let seconds = 0, minutes = 0, hours = 0;

// Get DOM elements
const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");

// Load the previous state from localStorage (if any)
window.onload = function() {
    if (localStorage.getItem('chronoTime')) {
        let savedTime = JSON.parse(localStorage.getItem('chronoTime'));
        seconds = savedTime.seconds;
        minutes = savedTime.minutes;
        hours = savedTime.hours;
        running = savedTime.running;
        updateDisplay();

        if (running) {
            startChronometer(true); // Restart the chronometer without resetting it
        }
    }
}

// Function to format time
function formatTime(num) {
    return num < 10 ? "0" + num : num;
}

// Function to update the display
function updateDisplay() {
    display.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Start or stop the chronometer
function startChronometer(resuming = false) {
    if (!running || resuming) {
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
            saveState();  // Save the state after every tick
        }, 1000);
        running = true;
        startStopButton.innerText = "Stop";
    } else {
        clearInterval(timer);
        running = false;
        startStopButton.innerText = "Start";
        saveState(); // Save the state when stopping
        askToLogEntry(); // Ask user if they want to log the entry
    }
}

// Reset the chronometer
function resetChronometer() {
    clearInterval(timer);
    running = false;
    startStopButton.innerText = "Start";
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    saveState(); // Save the reset state
}

// Function to save the state in localStorage
function saveState() {
    const chronoState = {
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        running: running
    };
    localStorage.setItem('chronoTime', JSON.stringify(chronoState));
}

// Function to ask user if they want to log the entry
function askToLogEntry() {
    const confirmLog = confirm("Do you want to log this time into your logbook?");
    if (confirmLog) {
        saveLogbookEntry(); // Save to logbook if user confirms
    }
}

// Function to save the current time entry to the logbook
function saveLogbookEntry() {
    const logbookEntry = {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        date: new Date().toLocaleString() // Save with timestamp
    };

    let logbook = JSON.parse(localStorage.getItem('logbook')) || [];
    logbook.push(logbookEntry);
    localStorage.setItem('logbook', JSON.stringify(logbook));

    alert("Time logged to your logbook!"); // Notify user
}

// Event listeners for buttons
startStopButton.addEventListener("click", () => startChronometer());
resetButton.addEventListener("click", resetChronometer);
