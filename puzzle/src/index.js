import './index.html';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import app from './js/app';

app();

// const gamePlay = document.getElementById('game-play');
// const gameItems = Array.from(gamePlay.querySelectorAll('.item'));
// const countItems = 16;
// const blankItem = 16;
// const maxShuffleCount = 80;
// let timer;
// let blockedCoords = null;
// // let shuffleCount = 0;

// if (gameItems.length !== 16) {
//   throw new Error('не 16 плиток');
// }

// // helpers
// const getMatrix = (arr) => {
//   const matrix = [[], [], [], []];
//   let x = 0;
//   let y = 0;

//   for (let i = 0; i < arr.length; i += 1) {
//     if (x >= 4) {
//       y += 1;
//       x = 0;
//     }
//     matrix[y][x] = arr[i];
//     x += 1;
//   }
//   return matrix;
// };

// // console.log(matrix);

// const setItemStyles = (item, x, y) => {
//   const shiftPs = 100;
//   item.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
// };

// const setPositionItems = (matrix) => {
//   for (let y = 0; y < matrix.length; y += 1) {
//     for (let x = 0; x < matrix.length; x += 1) {
//       const val = matrix[x][y];
//       const item = gameItems[val - 1];
//       setItemStyles(item, x, y);
//     }
//   }
// };

// // position
// gameItems[countItems - 1].style.display = 'none';

// const matrix = getMatrix(gameItems.map((item) => Number(item.dataset.matrixId)));

// const positionItems = setPositionItems(matrix);

// // shuffle;

// const findValidCoords = ({ blankCoords, matrix, blockedCoords }) => {
//   const validCoords = [];
//   for (let y = 0; y < matrix.length; y += 1) {
//     for (let x = 0; x < matrix.length; x += 1) {
//       if (isValidForSwap({ x, y }, blankCoords)) {
//         if (!blockedCoords || !(blockedCoords.x === x && blockedCoords.y === y)) {
//          validCoords.push({ x, y });
//         }
//       }
//     }
//   }
//   return validCoords;
// };

// // let blockedCoords = null;
// const randomSwap = (matrix) => {
//   const blankCoords = findCoordinatesByNum(blankItem, matrix);
//   const validCoords = findValidCoords({
//     blankCoords,
//     matrix,
//     blockedCoords,
//   });
//   const swapCoords = validCoords[Math.floor(Math.random() * validCoords.length)];
//   swap(blankCoords, swapCoords, matrix);
//   blockedCoords = blankCoords;
// };

// const shuffleBtn = document.getElementById('start').addEventListener('click', () => {
//   randomSwap(matrix);
//   setPositionItems(matrix);

//   // let timer;
//   let shuffleCount = 0;
//   clearInterval(timer);

//   timer = setInterval(() => {
//     randomSwap(matrix);
//     setPositionItems(matrix);
//     shuffleCount += 1;
//     if (shuffleCount >= maxShuffleCount) {
//       clearInterval(timer);
//     }
//   }, 70);
// });

// // change position by click
// // const blankItem = 16;

// const findCoordinatesByNum = (num, matrix) => {
//   for (let y = 0; y < matrix.length; y += 1) {
//     for (let x = 0; x < matrix.length; x += 1) {
//       if (matrix[y][x] === num) {
//         return { x, y };
//       }
//     }
//   }
//   return null;
// };

// function isValidForSwap(coords1, coords2) {
//   const difX = Math.abs(coords1.x - coords2.x);
//   const difY = Math.abs(coords1.y - coords2.y);
//   return (difX === 1 || difY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y);
// }

// // winner
// const winFlatArr = new Array(16).fill(0).map((item, i) => i + 1);
// // console.log(winFlatArr);

// const isWon = (matrix) => {
//   const flatMatrix = matrix.flat();
//   for (let i = 0; i < winFlatArr.length; i += 1) {
//     if (flatMatrix[i] !== winFlatArr[i]) {
//       return false;
//     }
//   }
//   return true;
// };

// // change position
// function swap(coords1, coords2, matrix) {
//   const coords1Num = matrix[coords1.y][coords1.x];
//   matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
//   matrix[coords2.y][coords2.x] = coords1Num;
//   // проверка победителя срабатывает при перемешивании!
//   // if (isWon(matrix)) {
//   //   alert('you are won!');
//   // }
// }

// gamePlay.addEventListener('click', (e) => {
//   const btn = e.target;
//   const btnNumber = Number(btn.dataset.matrixId);
//   const btnCoordinates = findCoordinatesByNum(btnNumber, matrix);
//   const blankBtnCoordinates = findCoordinatesByNum(blankItem, matrix);
//   const isValid = isValidForSwap(btnCoordinates, blankBtnCoordinates);
//   if (isValid) {
//     swap(blankBtnCoordinates, btnCoordinates, matrix);
//     setPositionItems(matrix);
//   }
// });
