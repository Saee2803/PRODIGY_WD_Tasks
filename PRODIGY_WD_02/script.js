let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const restartBtn = document.getElementById('restartBtn');
const lapBtn = document.getElementById('lapBtn');
const resetLapBtn = document.getElementById('resetLapBtn');
const lapsContainer = document.getElementById('laps');

startBtn.addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1000);
        running = true;
    }
});

pauseBtn.addEventListener('click', function() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    timeDisplay.innerHTML = '00:00:00';
});

restartBtn.addEventListener('click', function() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    timeDisplay.innerHTML = '00:00:00';
    startBtn.click(); // Start again
});

lapBtn.addEventListener('click', function() {
    if (running) {
        const currentTime = timeDisplay.innerHTML;
        laps.push(currentTime);
        updateLaps();
    }
});

resetLapBtn.addEventListener('click', function() {
    laps = [];
    updateLaps();
});

function updateLaps() {
    lapsContainer.innerHTML = laps.map((lap, index) => `<div>Lap ${index + 1}: ${lap}</div>`).join('');
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
}
