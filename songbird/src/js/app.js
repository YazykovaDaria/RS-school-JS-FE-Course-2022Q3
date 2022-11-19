import model from './model/model';
import mainController from './controllers/mainController';
import quizController from './controllers/quizController';
import { enData, ruData } from './model/data';
// write translate!
import translate from './helpers/translate';
import appView from './view/appView';

// const main = document.querySelector('.main');
const language = document.querySelector('.language');
const defaultLang = 'ru';
let secondLang = '';

const changeLanguage = (lang) => {
  translate(lang);
  model.setLang(lang);
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
  document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang');
    if (lang !== defaultLang || !lang) {
      secondLang = lang;
      changeLanguage(secondLang);
      appView('lang', secondLang);
      model.setLang(secondLang);
    } else {
      model.setData(ruData);
      model.setLang(defaultLang);
    }
    mainController();
    window.location.hash = '#main';
  });

  window.addEventListener('hashchange', () => {
    const { hash } = window.location;

    switch (hash) {
      case '#main':
        appView('mainPage');
        break;
      case '#quiz':
        appView('quizPage');
        quizController();
        break;
      case '#result':
        //console.log('result');
        appView('resultPage')

        break;
      default:
        break;
    }
  }, false);

  language.addEventListener('change', (e) => {
    const { value } = e.target;
    changeLanguage(value);
  });
};

export default app;
