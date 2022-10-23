
export const isWon = (matrix, winArr) => {
  if (!winArr) return false;
  const flatMatrix = matrix.flat();
  for (let i = 0; i < winArr.length; i += 1) {
    if (flatMatrix[i] !== winArr[i]) {
      return false;
    }
  }
  return true;
};

export const isValidForSwap = (coords1, coords2) => {
  const difX = Math.abs(coords1.x - coords2.x);
  const difY = Math.abs(coords1.y - coords2.y);
  return (difX === 1 || difY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y);
}
