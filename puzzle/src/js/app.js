/* eslint-disable max-len */
import getStartHtml from './startHtml';
import appWiev from './wiev';
import getMatrix from './utils/utils';
import {
  getPositionItems, findCoordinatesByNum, swap, randomSwap, getWinFlatArr,
} from './game/game';
import { isValidForSwap } from './game/validators';

const swapItems = (matrix, btnNum, blankNum, gameItems, watcher, winArr) => {
  const btnCoordinates = findCoordinatesByNum(btnNum, matrix);
  const blankBtnCoordinates = findCoordinatesByNum(blankNum, matrix);
  const isValid = isValidForSwap(btnCoordinates, blankBtnCoordinates);
  if (isValid) {
    const swaper = swap(blankBtnCoordinates, btnCoordinates, matrix, winArr);
    watcher.gamePlay.itemCoordinates = getPositionItems(matrix, gameItems);
    watcher.gamePlay.moves += 1;
//сигнал о выигрыше
    if (swaper) {
      watcher.startGame = false;
      watcher.isWin = true;
    }
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
      watcher.gamePlay.moves = 0;
      watcher.isShuffle = false;
      watcher.startGame = true;
    }
  }, 70);
};

const getItemsNumbers = (elements) => elements.getGameItems().map((item) => Number(item.dataset.matrixId));

const app = () => {
  getStartHtml();

  const elements = {
    gameControls: document.getElementById('js-controls'),
    gamePlay: document.getElementById('game-play'),
    movesCount: document.getElementById('moves'),
    timesSecond: document.getElementById('second'),
    timesMinute: document.getElementById('minute'),
    newGameBtn: document.getElementById('start'),
    modal: document.getElementById('modal'),
    getGameItems() {
      return Array.from(this.gamePlay.querySelectorAll('.item'));
    },
    gameSize: document.getElementById('frame-size'),
  };

  const initState = {
    startGame: false,
    isWin: false,
    isShuffle: false,
    saveGame: false,
    gamePlay: {
      countItems: 16,
      maxShuffleCount: 1,
      //matrix: [],
      itemCoordinates: [],
      moves: 0,
    },
    // showResult: false,
  };

  const watcher = appWiev(initState, elements);

  let gameItemsNumber = getItemsNumbers(elements);
  let initFrameSize = 4;
  let matrix = getMatrix(gameItemsNumber, initFrameSize);
  let winArr = getWinFlatArr(initState.gamePlay.countItems);


  const { maxShuffleCount } = initState.gamePlay;

  //console.log(matrix);
//const coord = getPositionItems(matrix, elements.getGameItems())
//console.log(coord);

  watcher.gamePlay.itemCoordinates = getPositionItems(matrix, elements.getGameItems());


  elements.gameControls.addEventListener('click', (e) => {
    const { id } = e.target;
    // console.log(id);
    switch (id) {
      case 'start':
        shuffleAndStartGame(matrix, initState.gamePlay.countItems, elements.getGameItems(), maxShuffleCount, watcher);


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
    //
    //console.log(countItems);
    swapItems(matrix, btnNumber, initState.gamePlay.countItems, elements.getGameItems(), watcher, winArr);
  });

  elements.modal.addEventListener('click', () => {
    //console.log('hi');
watcher.isWin = false;
  });

  elements.gameSize.addEventListener('change', (e) => {
   // console.log(e.target.value);
   const size = e.target.value;
   const itemsCount = size * size;
   initFrameSize = size;
    watcher.gamePlay.countItems = itemsCount;

    gameItemsNumber = getItemsNumbers(elements);

    //console.log(initState.gamePlay.countItems);

    matrix = getMatrix(gameItemsNumber, initFrameSize);
//console.log(gameItemsNumber);
    winArr = getWinFlatArr(initState.gamePlay.countItems);

    watcher.gamePlay.itemCoordinates = getPositionItems(matrix, elements.getGameItems());
  });

};

export default app;
