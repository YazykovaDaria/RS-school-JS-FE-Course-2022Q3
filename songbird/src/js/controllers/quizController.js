import model from '../model/model';
import quizView from '../view/quizView';

// придется делать ререндер при выигрыше иначе данные в модели не сохраняются
//const linkforgit = 'https://jik789.github.io/music/round1/cosmopolitan.mp3';
const answersContainer = document.getElementById('quiz-answers');
const btnLevels = document.getElementById('nextLevel');
const maxLevel = 1;
let scoreCount = 5;

const buildQuizContent = () => {
  model.startQuiz();
  const { answers, rightAnswer } = model.quiz;
  quizView('init', { answers, rightAnswer });
};

const checkWonGame = (answer) => {
  const { level } = model.quiz;
  model.quiz.level += 1;
  model.quiz.score += scoreCount;
  scoreCount = 5;
  quizView('score', model.quiz.score);

  if (level < maxLevel) {
    quizView('right', answer);
  } else {
    quizView('right', answer);
    setTimeout(() => {
      window.location.hash = '#result';
    }, 2000);
  }
};

const quizController = () => {
  buildQuizContent();

  answersContainer.addEventListener('click', (e) => {
    const elId = Number(e.target.id);
    // const rightAnswer = model.getRightAnswer();
    // const { id } = rightAnswer;

    //if (elId === id && !model.quiz.isWonLevel)
    if (model.isRigthAnswer(elId) && !model.quiz.isWonLevel) {
      model.quiz.isWonLevel = true;
      checkWonGame(model.getRightAnswer());
    } else {
      const answer = model.getAnswersItem(elId);
      if (model.quiz.isWonLevel) {
        quizView('choised', answer);
      } else {
        scoreCount -= 1;
        quizView('wrong', answer);
      }
    }
  });

  btnLevels.addEventListener('click', () => {
    model.quiz.isWonLevel = false;
    buildQuizContent();
    quizView('nextLevel');
  });
};

export default quizController;
