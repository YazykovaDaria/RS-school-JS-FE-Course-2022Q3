const getEmptyMatrix = (size) => {
  const matrix = [];
  for (let i = 0; i < size; i += 1) {
    matrix.push([]);
  }
  return matrix;
};

export const getMatrix = (arr, size) => {
  const matrix = getEmptyMatrix(size);
  let x = 0;
  let y = 0;

  for (let i = 0; i < arr.length; i += 1) {
    if (x >= size) {
      y += 1;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x += 1;
  }
  return matrix;
};

export const saveBestResults = (winResult, gameItemsNum) => {
  const key = `win${gameItemsNum}`;
  const savedResults = localStorage.getItem(key);
  if (!savedResults) {
    localStorage.setItem(key, JSON.stringify(winResult));
  } else {
    const results = JSON.parse(savedResults).concat(winResult);
    results.sort((a, b) => a.moves - b.moves);
    if (results.length > 10) {
      results.slice(0, 10);
    }
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(results));
  }
};

export const getBestResults = (gameItemsNum) => {
  const key = `win${gameItemsNum}`;
  const savedResults = localStorage.getItem(key);
  if (!savedResults) {
    return `results have not been saved`;
  }
  return JSON.parse(savedResults);
};
