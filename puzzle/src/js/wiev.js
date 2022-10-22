import onChange from 'on-change';
import stopWatch from './stopwatch';

const setItemStyles = (itemsPosition) => {
  const shiftPs = 100;
  itemsPosition.forEach((element) => {
    element.item.style.transform = `translate3D(${element.x * shiftPs}%, ${element.y * shiftPs}%, 0)`;
  });
};

const toggleShuffleClass = (el, isShuffle) => {
  isShuffle ? el.classList.add('game-shuffle')
    : el.classList.remove('game-shuffle');
};

const showMoves = (movesCount, movesEl) => {
  movesEl.innerText = movesCount;
};

const appWiev = (state, elements) => onChange(state, (path, value) => {
  switch (path) {
    case 'startGame':
      stopWatch(value, elements.timesMinute, elements.timesSecond);
      break;

    case 'isShuffle':
      toggleShuffleClass(elements.gamePlay, value);
      elements.newGameBtn.disabled = value;
      break;

    case 'gamePlay.itemCoordinates':
      setItemStyles(value);
      break;

    case 'gamePlay.moves':
      showMoves(value, elements.movesCount);
      // console.log(value);
      break;

    default:
      break;
  }
});

export default appWiev;
