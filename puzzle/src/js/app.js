/* eslint-disable max-len */
import getStartHtml from './startHtml';
import appWiev from './wiev';
import {
  getMatrix, saveBestResults, getBestResults, saveGame,
} from './utils/utils';
import {
  getPositionItems, findCoordinatesByNum, swap, randomSwap, getWinFlatArr, playAudio,
} from './game/game';
import { isValidForSwap } from './game/validators';
import stopWatch from './stopwatch';

const swapItems = (matrix, btnNum, blankNum, gameItems, watcher, winArr, isSound) => {
  const btnCoordinates = findCoordinatesByNum(btnNum, matrix);
  const blankBtnCoordinates = findCoordinatesByNum(blankNum, matrix);
  const isValid = isValidForSwap(btnCoordinates, blankBtnCoordinates);
  if (isValid) {
    const swaper = swap(blankBtnCoordinates, btnCoordinates, matrix, winArr);
    watcher.gamePlay.itemCoordinates = getPositionItems(matrix, gameItems);
    watcher.gamePlay.moves += 1;
    // звук
    if (isSound) {
      playAudio();
    }

    // сигнал о выигрыше
    if (swaper) {
      const winResult = [{ minute: watcher.gamePlay.gameTime.minute, second: watcher.gamePlay.gameTime.second, moves: watcher.gamePlay.moves }];
      saveBestResults(winResult, blankNum);
      watcher.winData = winResult;

      localStorage.removeItem(String(blankNum));

      setTimeout(() => {
        watcher.isWin = true;
        stopWatch(false, watcher);
        watcher.gamePlay.moves = 0;
        watcher.isStart = false;
      }, 300);
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
      watcher.isStart = true;
    }
  }, 70);
};

const getItemsNumbers = (elements) => elements.getGameItems().map((item) => Number(item.dataset.matrixId));

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
    gameLevel: document.getElementById('level'),
  };

  const initState = {
    isWin: false,
    winData: [],
    resultTable: [],
    isShuffle: false,
    isStart: false,
    isSound: true,
    gamePlay: {
      countItems: 16,
      maxShuffleCount: 50,
      itemCoordinates: [],
      moves: 0,
      gameTime: {
        second: 0,
        minute: 0,
      },
    },
  };

  const watcher = appWiev(initState, elements);

  let gameItemsNumber = getItemsNumbers(elements);
  let initFrameSize = 4;
  let matrix = getMatrix(gameItemsNumber, initFrameSize);
  let winArr = getWinFlatArr(initState.gamePlay.countItems);

  watcher.gamePlay.itemCoordinates = getPositionItems(matrix, elements.getGameItems());

  const getSavedGame = (itemsCount) => {
    const savedGame = localStorage.getItem(String(itemsCount));

    if (savedGame) {
      const gameData = JSON.parse(savedGame);
      matrix = gameData.matrix;
      watcher.gamePlay.countItems = gameData.countItems;

      watcher.gamePlay.itemCoordinates = restablishItems(gameData.itemCoordsWithMatrixId, elements.gamePlay);
      watcher.gamePlay.gameTime.second = gameData.gameTime.second;
      watcher.gamePlay.gameTime.minute = gameData.gameTime.minute;

      watcher.gamePlay.moves = gameData.moves;
      stopWatch(true, watcher, gameData.gameTime.minute, gameData.gameTime.second);
      watcher.isStart = true;
      winArr = gameData.winArr;
    } else {
      watcher.gamePlay.countItems = itemsCount;
      gameItemsNumber = getItemsNumbers(elements);
      matrix = getMatrix(gameItemsNumber, initFrameSize);
      winArr = getWinFlatArr(initState.gamePlay.countItems);
      watcher.gamePlay.itemCoordinates = getPositionItems(matrix, elements.getGameItems());
      watcher.isStart = false;
    }
  };


  elements.gameControls.addEventListener('click', (e) => {
    const { id } = e.target;
    switch (id) {
      case 'start':
        shuffleAndStartGame(matrix, initState.gamePlay.countItems, elements.getGameItems(), initState.gamePlay.maxShuffleCount, watcher);
        break;

      case 'save':
        saveGame(initState.gamePlay, matrix, winArr);
        stopWatch(false, watcher);
        watcher.gamePlay.moves = 0;
        break;

      case 'result':
        watcher.resultTable = getBestResults(initState.gamePlay.countItems);
        watcher.isWin = true;
        break;

      case 'sound':
        watcher.isSound = !initState.isSound;
        break;
      default:
        break;
    }
  });

  elements.gamePlay.addEventListener('click', (e) => {
    const btn = e.target;
    const btnNumber = Number(btn.dataset.matrixId);
    swapItems(matrix, btnNumber, initState.gamePlay.countItems, elements.getGameItems(), watcher, winArr, initState.isSound);
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

    getSavedGame(itemsCount);
    // const savedGame = localStorage.getItem(String(itemsCount));

    // if (savedGame) {
    //   const gameData = JSON.parse(savedGame);
    //   matrix = gameData.matrix;
    //   watcher.gamePlay.countItems = gameData.countItems;

    //   watcher.gamePlay.itemCoordinates = restablishItems(gameData.itemCoordsWithMatrixId, elements.gamePlay);
    //   watcher.gamePlay.gameTime.second = gameData.gameTime.second;
    //   watcher.gamePlay.gameTime.minute = gameData.gameTime.minute;

    //   watcher.gamePlay.moves = gameData.moves;
    //   stopWatch(true, watcher, gameData.gameTime.minute, gameData.gameTime.second);
    //   winArr = gameData.winArr;
    // } else {
    //   watcher.gamePlay.countItems = itemsCount;
    //   gameItemsNumber = getItemsNumbers(elements);
    //   matrix = getMatrix(gameItemsNumber, initFrameSize);
    //   winArr = getWinFlatArr(initState.gamePlay.countItems);
    //   watcher.gamePlay.itemCoordinates = getPositionItems(matrix, elements.getGameItems());
    // }
  });

  // elements.gameLevel.onchange = (e) => {
  //   console.log('hi');
  // }
//   elements.gameLevel.addEventListener('click', (e) => {
//     console.log(e.target.value);
// //initState.gamePlay.maxShuffleCount = e.target.value;
//   });
};

export default app;
