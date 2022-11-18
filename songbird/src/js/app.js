import model from './model/model';
import mainController from './controllers/mainController';
import { enData, ruData } from './model/data';
// write translate!
import translate from './helpers/translate';
import viewQuiz from './view/quizView';

const main = document.querySelector('.main');
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

  window.addEventListener('hashchange', () => {
      const { hash } = window.location;
      switch (hash) {
        // case '#main':
        //   main.textContent = 'main page'
        //   break;
          case '#quiz':
            main.innerHTML = '';
            const div = document.createElement('div');
            div.textContent = 'hi quizzzzzz'
            main.prepend(div);
    //     main.innerHTML = '<p>quizzzzzzzzzzz</p>'
          break;
          case '#result':
            main.innerHTML = '';
            const d = document.createElement('div')
            d.textContent = 'result'
            main.prepend(d);
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
