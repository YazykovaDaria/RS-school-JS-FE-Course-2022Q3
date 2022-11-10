import birdsData from './data';
import { getRandomInt } from '../helpers/helpers';

const model = {
  data: birdsData,
  quiz: {
    level: 0,
    answers: [],
    rightAnswer: {},
    isWin: false,
  },
  startQuiz() {
    const roundAnswers = this.data.filter((item) => item.level === this.quiz.level);
    this.quiz.answers = roundAnswers;
    const randomIndex = getRandomInt(roundAnswers.length);
    this.quiz.rightAnswer = roundAnswers[randomIndex];
  },
};

export default model;
