import model from './model/model';
import mainController from './controllers/mainController';
import quizController from './controllers/quizController';
import resultController from './controllers/resultController';
import { ruData, byData } from './model/data';
import translate from './helpers/translate';
import appView from './view/appView';

const language = document.querySelector('.language');

const changeLanguage = (lang) => {
  translate(lang);
  model.setLang(lang);
  switch (lang) {
    case 'by':
      model.setData(byData);
      break;
    case 'ru':
      model.setData(ruData);
      break;
    default:
      model.setData(byData);
      break;
  }
  localStorage.setItem('lang', lang);
};

const app = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang');
    const defaultLang = model.getDefaultLang();
    if (lang !== defaultLang) {
      if (!lang) {
        model.setLang(defaultLang);
      }
      model.setLang(lang);
      const secondLang = model.getLang();
      changeLanguage(secondLang);
      appView('lang', secondLang);
    } else {
      model.setData(byData);
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
        appView('resultPage');
        resultController();
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
