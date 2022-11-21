const score = document.querySelector('.js-res-score');
const winMessage = document.querySelector('.js-win');
const notWinMessage = document.querySelector('.js-not-win');

const resultView = (indicator, data) => {
  switch (indicator) {
    case 'score':
      score.textContent = data;
      break;

    case 'win':
      winMessage.style.display = 'block';
      notWinMessage.style.display = 'none';
      break;

    case 'notWin':
      notWinMessage.style.display = 'flex';
      winMessage.style.display = 'none';
      break;
    default:
      console.log('unknom indicator');
      break;
  }
};

export default resultView;
