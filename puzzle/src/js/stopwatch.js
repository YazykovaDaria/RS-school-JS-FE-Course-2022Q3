let minute = 0;
let second = 0;
let interval = 0;

const startStopWatch = (watcher) => {
  second += 1;
    watcher.gamePlay.gameTime.second = second;
  if (second === 60) {
    minute += 1;
    watcher.gamePlay.gameTime.minute = minute;
    second = 0;
    watcher.gamePlay.gameTime.second = second;
  }
};

const stopWatch = (isStart, watcher, min = 0, sec = 0) => {
  second = sec;
  minute = min;
  if (isStart) {
    clearInterval(interval);
    interval = setInterval(() => startStopWatch(watcher), 1000);
  } else {
    clearInterval(interval);
    second = 0;
    minute = 0;
    watcher.gamePlay.gameTime.minute = minute;
    watcher.gamePlay.gameTime.second = second;
  }
};

export default stopWatch;
