//import birdsDataRu, { dataEn } from './data';
import { getRandomInt } from '../helpers/helpers';

// const initQuizState = {
//   level: 0,
//   score: 0,
//   answers: [],
//   rightAnswer: {},
//   isWonLevel: false,
//   isWonGame: false,
// };

const model = {
  data: [],
  lang: '',
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
  getAnswersItem(id) {
    const answer = this.quiz.answers.filter((item) => item.id === id);
    return answer[0];
  },
  getDataItem(id) {
    const [dataItem] = this.data.filter((item) => item.id === id);
    return dataItem;
  },
  setData(data) {
    this.data = data;
  },
  setLang(lang) {
    this.lang = lang;
  },
  getLang() {
    return this.lang;
  },
};

export default model;
