import { isValidForSwap, isWon } from './validators';

export const getPositionItems = (matrix, gameItems) => {
  const itemsPosition = [];
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix.length; x += 1) {
      const val = matrix[x][y];
      const item = gameItems[val - 1];
      itemsPosition.push({ item, x, y });
    }
  }
  return itemsPosition;
};

export const getWinFlatArr = (count) => {
  const winArr = new Array(count).fill(0).map((item, i) => i + 1);
  return winArr;
};

export const findCoordinatesByNum = (num, matrix) => {
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix.length; x += 1) {
      if (matrix[y][x] === num) {
        return { x, y };
      }
    }
  }
  return null;
};

export const swap = (coords1, coords2, matrix, winArr) => {
  const coords1Num = matrix[coords1.y][coords1.x];
  matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
  matrix[coords2.y][coords2.x] = coords1Num;
  if (isWon(matrix, winArr)) {
    return true;
  }
};

const findValidCoords = ({ blankCoords, matrix, blockedCoords }) => {
  const validCoords = [];
  for (let y = 0; y < matrix.length; y += 1) {
    for (let x = 0; x < matrix.length; x += 1) {
      if (isValidForSwap({ x, y }, blankCoords)) {
        if (!blockedCoords || !(blockedCoords.x === x && blockedCoords.y === y)) {
          validCoords.push({ x, y });
        }
      }
    }
  }
  return validCoords;
};

let blockedCoords = null;

export const randomSwap = (matrix, blankItem) => {
  const blankCoords = findCoordinatesByNum(blankItem, matrix);
  const validCoords = findValidCoords({
    blankCoords,
    matrix,
    blockedCoords,
  });
  const swapCoords = validCoords[Math.floor(Math.random() * validCoords.length)];
  swap(blankCoords, swapCoords, matrix);
  blockedCoords = blankCoords;
};
