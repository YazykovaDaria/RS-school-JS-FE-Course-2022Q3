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

// доделать стили + закрытие + проверить на нескольких выигрышах
const showWonMessage = (isShow, {
  modal, movesCount, timesMinute, timesSecond,
}) => {
  if (isShow) {
    const moves = movesCount.textContent;
    const minutes = timesMinute.textContent;
    const seconds = timesSecond.textContent;
    const mes = `Hooray! You solved the puzzle in ${minutes}:${seconds} and ${moves} moves!`;
    modal.innerText = mes;
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
};

const setSizeElement = (element, size) => {
  let elementSize;

  switch (size) {
    case 9:
      elementSize = '33.3%';
      break;
    case 16:
      elementSize = '25%';
      break;
    case 25:
      elementSize = '20%';
      break;
    case 36:
      elementSize = '16.7%';
      break;
    case 49:
      elementSize = '14.3%';
      break;
    case 64:
      elementSize = '12.5%';
      break;
    default:
      break;
  }
  element.style.width = elementSize;
  element.style.height = elementSize;
};

const changeFrameSize = (size, { gamePlay }) => {
  gamePlay.innerHTML = '';
  gamePlay.classList.add('game-shuffle');
  for (let i = 0; i < size; i += 1) {
    const item = document.createElement('button');
    item.classList.add('item');
    item.setAttribute('data-matrix-id', `${i + 1}`);
    item.textContent = `${i + 1}`;
    setSizeElement(item, size);
    gamePlay.append(item);
  }
};

const appWiev = (state, elements) => onChange(state, (path, value) => {
  switch (path) {
    case 'startGame':
      stopWatch(value, elements.timesMinute, elements.timesSecond);
      break;

    case 'isWin':

      showWonMessage(value, elements);

      // console.log(value);
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

    case 'gamePlay.countItems':
      changeFrameSize(value, elements);
      // console.log(value);
      break;

    default:
      break;
  }
});

export default appWiev;
