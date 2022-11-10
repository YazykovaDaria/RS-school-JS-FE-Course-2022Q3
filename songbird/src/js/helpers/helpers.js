export const getRandomInt = (max) => Math.floor(Math.random() * max);

export const playAudio = (sound) => {
  const audio = new Audio(sound);
  audio.play();
};
