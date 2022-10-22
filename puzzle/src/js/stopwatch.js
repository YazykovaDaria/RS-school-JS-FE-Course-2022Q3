// const minuteEl = document.getElementById('minute');
// const secondEl = document.getElementById('second');

let minute;
let second = 0;
let interval = 0;

const startStopWatch = (minuteEl, secondEl) => {
  second += 1;
  if (second <= 9) {
    secondEl.innerText = `0${second}`;
  }
  if (second > 9) {
    secondEl.innerText = second;
  } if (second === 60) {
    minute += 1;
    minuteEl.innerText = `0${minute}`;
    second = 0;
    secondEl.innerText = `0${second}`;
  } if (minute > 9) {
    minuteEl.innerText = minute;
  }
};

const stopWatch = (isStart, minuteEl, secondEl) => {
  if (isStart) {
    clearInterval(interval);
    interval = setInterval(() => startStopWatch(minuteEl, secondEl), 1000);
  } else {
    clearInterval(interval);
    second = 0;
    minute = 0;
  }
};

export default stopWatch;
