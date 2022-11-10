import birdsData from './data';
import { getRandomInt } from '../helpers/helpers';

const model = {
  data: birdsData,
  quiz: {
    answers: [],
    rightAnswer: {},
    isWin: false,
  },
  stardQuiz(round) {
    const roundAnswers = this.data.filter((item) => item.level === round);
    this.quiz.answers = roundAnswers;
    const randomIndex = getRandomInt(roundAnswers.length);
    this.quiz.rightAnswer = roundAnswers[randomIndex];
  },
};

export default model;
