const getEmptyMatrix = (size) => {
  const matrix = [];
  for (let i = 0; i < size; i += 1) {
    matrix.push([]);
  }
  return matrix;
}

const getMatrix = (arr, size) => {
  const matrix = getEmptyMatrix(size);
  //console.log(arr);
  let x = 0;
  let y = 0;

  for (let i = 0; i < arr.length; i += 1) {
    if (x >= size) {
      y += 1;
      x = 0;
    }
    //console.log(x, y);
    matrix[y][x] = arr[i];
    x += 1;
  }
  //console.log(matrix);
  return matrix;
};

export default getMatrix;
