import model from '../model/model';
import translate from '../helpers/translate';
import resultView from '../view/resultView';

const btnGame = document.querySelector('.js-btn-still');

const showResultCard = () => {
  if (model.isWonGame()) {
    resultView('win');
  } else {
    resultView('notWin');
  }
};

const resultController = () => {
  resultView('score', model.getQuizScore());
  if (!model.langIsDefault) {
    translate(model.getLang());
  }
  showResultCard();

  btnGame.addEventListener('click', () => {
    model.cleanQuiz();
    window.location.hash = '#quiz';
  });
};

export default resultController;
