import './index.html';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import app from './js/app';

// app();

const gamePlay = document.getElementById('game-play');
const gameItems = Array.from(gamePlay.querySelectorAll('.item'));
const countItems = 16;

if (gameItems.length !== 16) {
  throw new Error('не 16 плиток');
}

// helpers
const getMatrix = (arr) => {
  const matrix = [[], [], [], []];
  let x = 0;
  let y = 0;

  for (let i = 0; i < arr.length; i += 1) {
    if (x >= 4) {
      y += 1;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x += 1;
  }
  return matrix;
};

// console.log(matrix);

const setItemStyles = (item, x, y) => {
  const shiftPs = 100;
  item.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
};

const setPositionItems = (matrix) => {
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix.length; x += 1) {
      const val = matrix[x][y];
      const item = gameItems[val - 1];
      setItemStyles(item, x, y);
    }
  }
};

// position
gameItems[countItems - 1].style.display = 'none';

let matrix = getMatrix(gameItems.map((item) => Number(item.dataset.matrixId)));

const positionItems = setPositionItems(matrix);

// shuffle;

const shuffleArr = (arr) => arr
  .map((val) => ({ val, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ val }) => val);

const shuffleBtn = document.getElementById('start').addEventListener('click', () => {
  const shuffle = shuffleArr(matrix.flat());
  matrix = getMatrix(shuffle);
  setPositionItems(matrix);
  // console.log('hi');
});

// change position by click
const blankItem = 16;

const findCoordinatesByNum = (num, matrix) => {
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix.length; x += 1) {
      if (matrix[y][x] === num) {
        return { x, y };
      }
    }
  }
  return null;
};

const isValidForSwap = (coords1, coords2) => {
  const difX = Math.abs(coords1.x - coords2.x);
  const difY = Math.abs(coords1.y - coords2.y);
  return (difX === 1 || difY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y);
};

// winner
const winFlatArr = new Array(16).fill(0).map((item, i) => i + 1);
// console.log(winFlatArr);

const isWon = (matrix) => {
  const flatMatrix = matrix.flat();
  for (let i = 0; i < winFlatArr.length; i += 1) {
    if (flatMatrix[i] !== winFlatArr[i]) {
      return false;
    }
  }
  return true;
};

// change position
const swap = (coords1, coords2, matrix) => {
  const coords1Num = matrix[coords1.y][coords1.x];
  matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
  matrix[coords2.y][coords2.x] = coords1Num;
  if (isWon(matrix)) {
    alert('you are won!');
  }
};

gamePlay.addEventListener('click', (e) => {
  const btn = e.target;
  const btnNumber = Number(btn.dataset.matrixId);
  const btnCoordinates = findCoordinatesByNum(btnNumber, matrix);
  const blankBtnCoordinates = findCoordinatesByNum(blankItem, matrix);
  const isValid = isValidForSwap(btnCoordinates, blankBtnCoordinates);
  if (isValid) {
    swap(blankBtnCoordinates, btnCoordinates, matrix);
    setPositionItems(matrix);
  }
});
