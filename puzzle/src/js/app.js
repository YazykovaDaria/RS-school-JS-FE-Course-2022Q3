/* eslint-disable max-len */
import getStartHtml from './startHtml';
import appWiev from './wiev';
import getMatrix from './utils/utils';
import {
  getPositionItems, findCoordinatesByNum, swap, randomSwap, getWinFlatArr,
} from './game/game';
import { isValidForSwap } from './game/validators';
import stopWatch from './stopwatch';

const swapItems = (matrix, btnNum, blankNum, gameItems, watcher, winArr) => {
  const btnCoordinates = findCoordinatesByNum(btnNum, matrix);
  const blankBtnCoordinates = findCoordinatesByNum(blankNum, matrix);
  const isValid = isValidForSwap(btnCoordinates, blankBtnCoordinates);
  if (isValid) {
    const swaper = swap(blankBtnCoordinates, btnCoordinates, matrix, winArr);
    watcher.gamePlay.itemCoordinates = getPositionItems(matrix, gameItems);
    watcher.gamePlay.moves += 1;
    // сигнал о выигрыше
    if (swaper) {
      // watcher.startGame = false;
      stopWatch(false, watcher);
      //console.log(blankNum);
      localStorage.removeItem(String(blankNum));
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
      stopWatch(true, watcher);
      // watcher.startGame = true;
    }
  }, 70);
};

const getItemsNumbers = (elements) => elements.getGameItems().map((item) => Number(item.dataset.matrixId));

const addMatrixIdForCoords = (coords) => coords.map((itemCoords) => {
  itemCoords.matrixId = itemCoords.item.dataset.matrixId;
  return itemCoords;
});

const restablishItems = (coordsWithMatrixId, gamePlay) => coordsWithMatrixId.map((el) => {
  el.item = gamePlay.querySelector(`[data-matrix-id="${el.matrixId}"]`);
  return el;
});

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
    isWin: false,
    isShuffle: false,
    saveGame: false,
    gamePlay: {
      countItems: 16,
      maxShuffleCount: 1,
      itemCoordinates: [],
      moves: 0,
      gameTime: {
        second: 0,
        minute: 0,
      },
    },
    // showResult: false,
  };

  const watcher = appWiev(initState, elements);

  let gameItemsNumber = getItemsNumbers(elements);
  let initFrameSize = 4;
  let matrix = getMatrix(gameItemsNumber, initFrameSize);
  let winArr = getWinFlatArr(initState.gamePlay.countItems);

  const { maxShuffleCount } = initState.gamePlay;

  watcher.gamePlay.itemCoordinates = getPositionItems(matrix, elements.getGameItems());

  elements.gameControls.addEventListener('click', (e) => {
    const { id } = e.target;
    // console.log(id);
    switch (id) {
      case 'start':
        shuffleAndStartGame(matrix, initState.gamePlay.countItems, elements.getGameItems(), maxShuffleCount, watcher);
        break;

      case 'stop':
        // watcher.startGame = false;
        break;

      case 'save':
        const {
          countItems, itemCoordinates, moves, gameTime,
        } = initState.gamePlay;

        const itemCoordsWithMatrixId = addMatrixIdForCoords(itemCoordinates);
        const saveData = {
          matrix, countItems, itemCoordsWithMatrixId, moves, gameTime, winArr
        };

//console.log(winArr, saveData);

        const key = String(countItems);
        //localStorage.clear();
        localStorage.setItem(key, JSON.stringify(saveData));
        stopWatch(false, watcher);
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
    // console.log(countItems);
    swapItems(matrix, btnNumber, initState.gamePlay.countItems, elements.getGameItems(), watcher, winArr);
  });

  elements.modal.addEventListener('click', () => {
    // console.log('hi');
    watcher.isWin = false;
  });

  elements.gameSize.addEventListener('change', (e) => {
    stopWatch(false, watcher);
    watcher.gamePlay.moves = 0;
    const size = e.target.value;
    const itemsCount = size * size;
    initFrameSize = size;
    const savedGame = localStorage.getItem(String(itemsCount));


    if (savedGame) {
      const gameData = JSON.parse(savedGame);
      matrix = gameData.matrix;
      watcher.gamePlay.countItems = gameData.countItems;
      //console.log(initState.gamePlay.countItems);

      //watcher.isShuffle = false;
      watcher.gamePlay.itemCoordinates = restablishItems(gameData.itemCoordsWithMatrixId, elements.gamePlay);
      watcher.gamePlay.gameTime.second = gameData.gameTime.second;
      watcher.gamePlay.gameTime.minute = gameData.gameTime.minute;

      watcher.gamePlay.moves = gameData.moves;
      stopWatch(true, watcher, gameData.gameTime.minute, gameData.gameTime.second);
      winArr = gameData.winArr;

    } else {
      watcher.gamePlay.countItems = itemsCount;
      gameItemsNumber = getItemsNumbers(elements);
      matrix = getMatrix(gameItemsNumber, initFrameSize);
      winArr = getWinFlatArr(initState.gamePlay.countItems);
      //watcher.isShuffle = true;
      watcher.gamePlay.itemCoordinates = getPositionItems(matrix, elements.getGameItems());
    }
  });
};

export default app;
