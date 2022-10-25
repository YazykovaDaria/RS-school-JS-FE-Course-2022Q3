import onChange from 'on-change';

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

const showWonMessage = (isShow, modal) => (isShow ? modal.classList.remove('hidden') : modal.classList.add('hidden'));

const addWonMessage = (winData, { modal }) => {
  const data = winData.map((info) => {
    const min = info.minute > 9 ? info.minute : `0${info.minute}`;
    const sec = info.second > 9 ? info.second : `0${info.second}`;
    return `Hooray! You solved the puzzle in ${min}:${sec} and ${info.moves} moves!`;
  });
  const container = modal.querySelector('.modal-cont');
  container.innerHTML = data.join('');
};

const addResultsTable = (results, modal) => {
  const container = modal.querySelector('.modal-cont');
  if (typeof results === 'string') {
    container.innerText = results;
  } else {
    const resultsList = results.map((res, i) => {
      const min = res.minute > 9 ? res.minute : `0${res.minute}`;
      const sec = res.second > 9 ? res.second : `0${res.second}`;
      const resultStr = `${i + 1}. moves: ${res.moves}; time: ${min} : ${sec}`;
      return `<span>${resultStr}</span>`;
    });
    container.innerHTML = resultsList.join('');
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
  for (let i = 0; i < size; i += 1) {
    const item = document.createElement('button');
    item.classList.add('item');
    item.setAttribute('data-matrix-id', `${i + 1}`);
    item.textContent = `${i + 1}`;
    setSizeElement(item, size);
    gamePlay.append(item);
  }
};

const showTime = (element, time) => {
  if (time <= 9) {
    element.innerText = `0${time}`;
  }
  if (time > 9) {
    element.innerText = time;
  }
};

const changeSoundBtn = (controls) => {
  const soundBtn = controls.querySelector('#sound');
  soundBtn.classList.toggle('off');
};

const appWiev = (state, elements) => onChange(state, (path, value) => {
  switch (path) {
    case 'isStart':
      toggleShuffleClass(elements.gamePlay, !value);
      break;

    case 'gamePlay.gameTime.second':
      showTime(elements.timesSecond, value);
      break;

    case 'isSound':
      changeSoundBtn(elements.gameControls);
      break;

    case 'gamePlay.gameTime.minute':
      showTime(elements.timesMinute, value);
      break;

    case 'isWin':
      showWonMessage(value, elements.modal);

      break;

    case 'isShuffle':
      toggleShuffleClass(elements.gamePlay, value);
      elements.newGameBtn.disabled = value;
      break;

    case 'resultTable':
      addResultsTable(value, elements.modal);
      // console.log(value);
      break;

    case 'winData':
      addWonMessage(value, elements);
      // console.log(value);
      break;

    case 'gamePlay.itemCoordinates':
      // console.log(value);
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
