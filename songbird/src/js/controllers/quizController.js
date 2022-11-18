import model from '../model/model';
import viewQuiz from '../view/quizView';

// придется делать ререндер при выигрыше иначе данные в модели не сохраняются
const linkforgit = 'https://jik789.github.io/music/round1/cosmopolitan.mp3';
//const answersContainer = document.getElementById('quiz-answers');
// const btnLevels = document.getElementById('nextLevel');
const maxLevel = 5;
let scoreCount = 5;

const buildQuizContent = () => {
  model.startQuiz();
  const { answers, rightAnswer } = model.quiz;
  viewQuiz('init', { answers, rightAnswer });
};

const checkWonGame = (answer) => {
  const { level } = model.quiz;
  model.quiz.level += 1;
  model.quiz.score += scoreCount;
  scoreCount = 5;
  viewQuiz('score', model.quiz.score);

  if (level < maxLevel) {
    viewQuiz('right', answer);
  } else {
    viewQuiz('right', answer);

    // setTimeout(() => {
    //   window.location.href = resultPage;
    // }, 2000);
  }
};

const quizController = () => {
 // document.addEventListener('DOMContentLoaded', buildQuizContent);

  // answersContainer.addEventListener('click', (e) => {
  //   const elId = Number(e.target.id);
  //   const { id } = model.quiz.rightAnswer;

  //   if (elId === id && !model.quiz.isWonLevel) {
  //     model.quiz.isWonLevel = true;
  //     checkWonGame(model.quiz.rightAnswer);
  //   } else {
  //     const answer = model.getAnswer(elId);
  //     if (model.quiz.isWonLevel) {
  //       viewQuiz('choised', answer);
  //     } else {
  //       scoreCount -= 1;
  //       viewQuiz('wrong', answer);
  //     }
  //   }
  // });

  // btnLevels.addEventListener('click', () => {
  //   model.quiz.isWonLevel = false;
  //   buildQuizContent();
  //   viewQuiz('nextLevel');
  // });
};

export default quizController;
