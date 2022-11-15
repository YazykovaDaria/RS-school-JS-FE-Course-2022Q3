/* eslint-disable radix */
export const getRandomInt = (max) => Math.floor(Math.random() * max);

export const playAudio = (sound) => {
  const audio = new Audio(sound);
  audio.play();
};

export const getTimeCodeFromNum = (num) => {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60,
  ).padStart(2, 0)}`;
};
