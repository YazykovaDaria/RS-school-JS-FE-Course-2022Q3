// import birdsDataRu, { dataEn } from './data';
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
  defaultLang: 'by',
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
  getRightAnswer() {
    return this.quiz.rightAnswer;
  },
  isRigthAnswer(id) {
    return (this.quiz.rightAnswer.id === id);
  },
  getDataItem(id) {
    const [dataItem] = this.data.filter((item) => item.id === id);
    return dataItem;
  },
  setData(data) {
    this.data = data;
  },
  getData() {
    return this.data;
  },
  setLang(lang) {
    this.lang = lang;
  },
  langIsDefault() {
    return (this.defaultLang === this.lang);
  },
  getDefaultLang() {
    return this.defaultLang;
  },
    getLang() {
    return this.lang;
  },
};

export default model;
