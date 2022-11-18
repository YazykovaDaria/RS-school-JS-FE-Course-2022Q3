import model from './model/model';
import mainController from './mainController';
import { enData, ruData } from './model/data';
// write translate!
import translate from './helpers/translate';
import viewQuiz from './view/quizView';

const language = document.querySelector('.language');
const defaultLang = 'ru';
const secondLang = 'en';

const changeLanguage = (lang) => {
  translate(lang);

  switch (lang) {
    case 'en':
      model.setData(enData);
      break;
    case 'ru':
      model.setData(ruData);
      break;
    default:
      model.setData(ruData);
      break;
  }
  localStorage.setItem('lang', lang);
};

const app = () => {
  mainController();

  document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang');
    if (lang !== defaultLang || !lang) {
      changeLanguage(secondLang);
      viewQuiz('lang', secondLang);
    } else {
      model.setData(ruData);
    }
  });

  language.addEventListener('change', (e) => {
    const { value } = e.target;
    changeLanguage(value);
  });
};

export default app;
