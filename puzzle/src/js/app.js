import getStartHtml from './startHtml';
import appWiev from './wiev';
import { getMatrix } from './utils/utils';
import {
  getPositionItems, findCoordinatesByNum, swap, randomSwap,
} from './game/game';
import { isValidForSwap } from './game/validators';

const swapItems = (matrix, btnNum, blankNum, gameItems, watcher) => {
  const btnCoordinates = findCoordinatesByNum(btnNum, matrix);
  const blankBtnCoordinates = findCoordinatesByNum(blankNum, matrix);
  const isValid = isValidForSwap(btnCoordinates, blankBtnCoordinates);
  if (isValid) {
    // здесь добавить счётчик свапов
    swap(blankBtnCoordinates, btnCoordinates, matrix);
    watcher.gamePlay.itemCoordinates = getPositionItems(matrix, gameItems);
    watcher.gamePlay.moves += 1;
  }
};

let timer;

const shuffleAndStartGame = (matrix, countItems, gameItems, maxShuffleCount, watcher) => {
  randomSwap(matrix, countItems);
  watcher.isShuffle = true;
  watcher.gamePlay.itemCoordinates = getPositionItems(matrix, gameItems);

  let shuffleCount = 0;
  clearInterval(timer);

  timer = setInterval(() => {
    randomSwap(matrix, countItems);
    watcher.gamePlay.itemCoordinates = getPositionItems(matrix, gameItems);
    shuffleCount += 1;
    if (shuffleCount >= maxShuffleCount) {
      clearInterval(timer);
      watcher.isShuffle = false;
      watcher.startGame = true;
    }
  }, 70);
};

const app = () => {
  getStartHtml();

  const elements = {
    gameControls: document.getElementById('js-controls'),
    gamePlay: document.getElementById('game-play'),
    movesCount: document.getElementById('moves'),
    timesSecond: document.getElementById('second'),
    timesMinute: document.getElementById('minute'),
    newGameBtn: document.getElementById('start'),
    getGameItems() {
      return Array.from(this.gamePlay.querySelectorAll('.item'));
    },
    gameSize: document.getElementById('frame-size'),
  };

  const initState = {
    startGame: false,
    isShuffle: false,
    saveGame: false,
    gamePlay: {
      countItems: 16,
      maxShuffleCount: 80,
      matrix: [],
      itemCoordinates: [],
      moves: 0,
    },
    // showResult: false,
  };

  const watcher = appWiev(initState, elements);

  const gameItemsNumber = elements.getGameItems().map((item) => Number(item.dataset.matrixId));

  initState.gamePlay.matrix = getMatrix(gameItemsNumber);

  const { matrix, countItems, maxShuffleCount } = initState.gamePlay;

  // console.log(matrix);

  watcher.gamePlay.itemCoordinates = getPositionItems(matrix, elements.getGameItems());

  // console.log(initState.gamePlay.matrix);

  elements.gameControls.addEventListener('click', (e) => {
    const { id } = e.target;
    // console.log(id);
    switch (id) {
      case 'start':
        shuffleAndStartGame(matrix, countItems, elements.getGameItems(), maxShuffleCount, watcher);
        // добавить сост для блока поля и начала игры

        // watcher.startGame = true;
        break;

      case 'stop':
        // watcher.startGame = false;
        break;

      case 'save':
        // watcher.saveResult = true;
        break;

      case 'result':
        // watcher.showResult = true;
        break;

      default:
        break;
    }
  });

  elements.gamePlay.addEventListener('click', (e) => {
    const btn = e.target;
    const btnNumber = Number(btn.dataset.matrixId);
    swapItems(matrix, btnNumber, countItems, elements.getGameItems(), watcher);
  });

  elements.gameSize.addEventListener('change', (e) => {
    console.log(e.target.value);
    // watcher.gamePlay.countItems = e.target.value;
  });
};

export default app;
