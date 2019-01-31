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
  reset = document.getElementById('reset'),
  label = document.getElementById('label'),
  container = document.getElementById('container'),
  alarm = document.createElement('audio');

alarm.setAttribute('src', 'https://www.soundjay.com/button/beep-07.mp3');

pause.classList.add('disabled');

const pad = n => n < 10 ? '0' + n : n;

const togglePause = () => {
  pause.classList.toggle('disabled');
};

const toggleSettings = () => {
  minusWork.classList.toggle('disabled');
  plusWork.classList.toggle('disabled');
  minusBreak.classList.toggle('disabled');
  plusBreak.classList.toggle('disabled');
};

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
  sec.textContent = '00';
};

plusWork.onclick = () => {
  incrementWorkTime();
  setWork.textContent = pad(workTime);
  min.textContent = pad(workTime);
  sec.textContent = '00';
};

minusBreak.onclick = () => {
  decrementBreakTime();
  setBreak.textContent = pad(breakTime);
  sec.textContent = '00';
};

plusBreak.onclick = () => {
  incrementBreakTime();
  setBreak.textContent = pad(breakTime);
  sec.textContent = '00';
};

start.onclick = () => {
  timer = setInterval(() => {
    time--;
    if (time % 60 < 0) {
      !isBreak ? isBreak = true : isBreak = false;
      !isBreak ? time = workTime * 60 : time = breakTime * 60;
      !isBreak ? label.textContent = 'Work' : label.textContent = 'Break';
      alarm.play();
    }
    min.textContent = pad(Math.floor(time / 60));
    sec.textContent = pad(time % 60);
  }, 1000);
  togglePause();
  toggleSettings();
};

pause.onclick = () => {
  clearInterval(timer);
  togglePause();
  toggleSettings();
};

reset.onclick = () => {
  clearInterval(timer);
  min.textContent = pad(workTime);
  sec.textContent = '00';
  time = workTime * 60;
  minusWork.classList.remove('disabled');
  plusWork.classList.remove('disabled');
  minusBreak.classList.remove('disabled');
  plusBreak.classList.remove('disabled');
  pause.classList.add('disabled');
};
