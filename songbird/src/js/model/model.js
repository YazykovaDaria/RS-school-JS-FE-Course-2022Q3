import birdsData from './data';
import { getRandomInt } from '../helpers/helpers';

const model = {
  data: birdsData,
  quiz: {
    level: 0,
    score: 0,
    answers: [],
    rightAnswer: {},
    isWonLevel: false,
    isWonGame: false,
  },
  startQuiz() {
    const roundAnswers = this.data.filter((item) => item.level === this.quiz.level);
    this.quiz.answers = roundAnswers;
    const randomIndex = getRandomInt(roundAnswers.length);
    this.quiz.rightAnswer = roundAnswers[randomIndex];
  },
  getAnswer(id) {
    const answer = this.quiz.answers.filter((item) => item.id === id);
    return answer[0];
  },
};

export default model;
