import model from '../model/model';
import viewQuiz from '../view/quizView';

const buildQuizContent = () => {
  model.startQuiz();
  const { answers, rightAnswer } = model.quiz;
  // отрисовка списка птиц
  viewQuiz('answers', answers);
  // добавление мелодии в плеер
  viewQuiz('melody', rightAnswer);
};

const quizApp = () => {
  document.addEventListener('DOMContentLoaded', buildQuizContent);
};

export default quizApp;
