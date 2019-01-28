'use strict';

let workTime = 25,
  breakTime = 5,
  time = workTime * 60,
  timer,
  isBreak = false;

const minusWork = document.getElementById('minusWork'),
  plusWork = document.getElementById('plusWork'),
  minusBreak = document.getElementById('minusBreak'),
  plusBreak = document.getElementById('plusBreak'),
  setWork = document.getElementById('setWork'),
  setBreak = document.getElementById('setBreak'),
  min = document.getElementById('min'),
  sec = document.getElementById('sec'),
  start = document.getElementById('start'),
  pause = document.getElementById('pause'),
  alarm = document.createElement('audio'),
  pad = n => n < 10 ? '0' + n : n;

alarm.setAttribute('src', 'http://www.soundjay.com/button/beep-07.mp3');

const decrementWorkTime = () => {
  if (workTime > 1) {
    workTime--;
    time = workTime * 60;
  }
};

const incrementWorkTime = () => {
  if (workTime < 59) {
    workTime++;
    time = workTime * 60;
  }
};

const decrementBreakTime = () => {
  if (breakTime > 1) {
    breakTime--;
  }
};

const incrementBreakTime = () => {
  if (breakTime < 59) {
    breakTime++;
  }
};

minusWork.onclick = () => {
  decrementWorkTime();
  setWork.textContent = pad(workTime);
  min.textContent = pad(workTime);
};

plusWork.onclick = () => {
  incrementWorkTime();
  setWork.textContent = pad(workTime);
  min.textContent = pad(workTime);
};

minusBreak.onclick = () => {
  decrementBreakTime();
  setBreak.textContent = pad(breakTime);
};

plusBreak.onclick = () => {
  incrementBreakTime();
  setBreak.textContent = pad(breakTime);
};

start.onclick = () => {
  timer = setInterval(() => {
    time--;
    if (time % 60 < 0) {
      !isBreak ? isBreak = true : isBreak = false;
      !isBreak ? time = workTime * 60 : time = breakTime * 60;
      alarm.play();
    }
    min.textContent = pad(Math.floor(time / 60));
    sec.textContent = pad(time % 60);
  }, 1000);
};

pause.onclick = () => {
  clearInterval(timer);
};
