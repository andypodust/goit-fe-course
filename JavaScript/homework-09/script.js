'use strict'

const clockFace = document.querySelector(".js-time");
const startButton = document.querySelector(".js-start");
const lapButton = document.querySelector(".js-take-lap");
const resetButton = document.querySelector(".js-reset");
const lapsList = document.querySelector(".js-laps");

const stopWatch = {
  startTime: 0,
  deltaTime: 0,
  isActive: false,
  id: null,

  startTimer() {
    if (this.isActive) return;
    resetButton.removeAttribute('disabled');
    this.isActive = true;
    this.startTime = Date.now() - this.deltaTime;
    this.id = setInterval(() => {
      const currentTime = Date.now();
      this.deltaTime = currentTime - this.startTime;
      updClockFace(clockFace, this.deltaTime);
    }, 100);
  },
  stopTimer() {
    clearInterval(this.id);
    this.isActive = false;

  },
  startClick() {
    if(!this.isActive) {
      this.startTimer();
      startButton.textContent = "Pause";
    } else {
      this.stopTimer();
      startButton.textContent = "Continue";
    }
  },
  stopClick() {
    resetButton.setAttribute('disabled', '');
    this.stopTimer();
    this.deltaTime = 0;
    startButton.textContent = 'Start';
    updClockFace(clockFace, this.deltaTime);
    lapsList.innerHTML = '';
  },
  lapClick() {
    const lapsListItem = document.createElement('li');
    lapsListItem.textContent = `${formattedTime(this.deltaTime)}`;
    lapsList.append(lapsListItem);
  }
};

function formattedTime(time) {
  let date = new Date(time);
  let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  let ms = String(date.getMilliseconds());
  return `${min}:${sec}.${ms[0]}`
}

function updClockFace(elem, time) {
  elem.textContent = formattedTime(time);
}


startButton.addEventListener('click', stopWatch.startClick.bind(stopWatch));
resetButton.addEventListener('click', stopWatch.stopClick.bind(stopWatch));
lapButton.addEventListener('click', stopWatch.lapClick.bind(stopWatch));

