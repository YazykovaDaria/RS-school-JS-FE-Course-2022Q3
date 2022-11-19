import model from './model/model';
import mainController from './controllers/mainController';
import quizController from './controllers/quizController';
import { enData, ruData } from './model/data';
// write translate!
import translate from './helpers/translate';
import appView from './view/appView';

//const main = document.querySelector('.main');
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
  });

  window.addEventListener('hashchange', () => {
      const { hash } = window.location;
      appView('quizPage');
      switch (hash) {
        // case '#main':
        //   main.textContent = 'main page'
        //   break;
          case '#quiz':
            console.log('quiz');
            // main.innerHTML = '';
            // const div = document.createElement('div');
            // div.textContent = 'hi quizzzzzz'
            // main.prepend(div);
    //     main.innerHTML = '<p>quizzzzzzzzzzz</p>'
          break;
          case '#result':
            console.log('result');
            // main.innerHTML = '';
            // const d = document.createElement('div')
            // d.textContent = 'result'
            // main.prepend(d);
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
