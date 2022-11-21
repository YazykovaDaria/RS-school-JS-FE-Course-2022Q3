/* eslint-disable quotes */
const startBtn = document.querySelector('.btn-link');
const mainPage = document.querySelector('.js-main-page');
const quizPage = document.querySelector('.js-quiz-page');
const resultPage = document.querySelector('.js-result-page');
const score = document.querySelector('.score');

const appView = (indicator, data = '') => {
  switch (indicator) {
    case 'lang':
      document.getElementById(data).checked = true;
      break;
    case 'quizPage':
      startBtn.style.display = "none";
      mainPage.style.display = "none";
      resultPage.style.display = "none";
      quizPage.style.display = "block";
      score.style.display = "flex";
      document.getElementById('score').textContent = '0';

      break;

    case 'resultPage':
      quizPage.style.display = "none";
      score.style.display = "none";
      resultPage.style.display = "block";
      break;

    case 'mainPage':
      startBtn.style.display = "flex";
      mainPage.style.display = "block";
      quizPage.style.display = "none";
      score.style.display = "none";
      resultPage.style.display = "none";

      break;
    default:
      console.log('unknom indicator');
      break;
  }
};

export default appView;
