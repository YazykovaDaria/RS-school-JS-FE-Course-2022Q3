export const getMatrix = (arr) => {
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
