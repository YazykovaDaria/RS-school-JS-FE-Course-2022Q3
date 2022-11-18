/* eslint-disable no-underscore-dangle */
import './index.html';
import 'reset-css';
import './style.scss';
import app from '../js/app';

app();
// import mainController from '../js/mainController';

// mainController();

// mainApp();
// const main = document.querySelector('.main');
// const test = document.querySelector('.test');

// test.addEventListener('click', (e) => {
//   console.log(e.target.id);
// })

// window.addEventListener('hashchange', () => {
//   const { hash } = window.location;
//   switch (hash) {
//     // case '#main':
//     //   main.textContent = 'main page'
//     //   break;
//       case '#quiz':
//         main.innerHTML = '';
//         const div = document.createElement('div');
//         div.textContent = 'hi quizzzzzz'
//         main.prepend(div);
// //     main.innerHTML = '<p>quizzzzzzzzzzz</p>'
//       break;
//       case '#result':
//         main.innerHTML = '';
//         const d = document.createElement('div')
//         d.textContent = 'result'
//         main.prepend(d);
//         break;
//     default:
//       break;
//   }
// }, false);

// поменять хэш вручную - сработает событие hashchange
// window.location.hash = '#result';
