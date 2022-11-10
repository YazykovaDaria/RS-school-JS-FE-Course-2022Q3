import { playAudio } from '../helpers/helpers';
import audioFail from '../../assets/audio/sucsses.mp3';
import audioSucsses from '../../assets/audio/wrong.mp3';

const questContainer = document.getElementById('question');
const answersContainer = document.getElementById('quiz-answers');
const choisedContainer = document.getElementById('choisedAnswer');
const btn = document.getElementById('nextLevel');
const score = document.getElementById('score');
const categories = document.querySelectorAll('.js-level');
const audioSrc = document.getElementById('audio');

const buildAnswers = (answers) => {
  answersContainer.innerHTML = '';
  answers.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('answer__list');
    li.setAttribute('id', `${item.id}`);
    const span = document.createElement('span');
    span.textContent = item.name;
    li.append(span);
    answersContainer.prepend(li);
  });
};

const changeAudio = ({ audio }) => audioSrc.src = audio;

const showChoizedContent = (content) => {
  choisedContainer.innerHTML = '';
  if (typeof content === 'string') {
    choisedContainer.textContent = content;
  } else {
    choisedContainer.textContent = content.name;
    // тут будет добавление карточки птицы
    // console.log(content);
  }
};

const addClassForAnswer = ({ id }, className) => {
  const el = document.getElementById(String(id));
  console.log(el);
  el.classList.add(className);
};

const viewQuiz = (indicator, data = '') => {
  switch (indicator) {
    case 'answers':
      buildAnswers(data);
      btn.disabled = true;
      break;

    case 'melody':
      // поменять логику после переделки плеера
      changeAudio(data);
      console.log(data);
      break;

    case 'wrong':
      addClassForAnswer(data, indicator);
      playAudio(audioSucsses);
      showChoizedContent(data);
      break;

    case 'right':
      addClassForAnswer(data, indicator);
      playAudio(audioFail);
      showChoizedContent(data);
      btn.disabled = false;
      // функцию для показа птицы в игровой карточке

      // console.log(data);
      break;

    case 'choised':
      showChoizedContent(data);
      break;

    case 'score':
      score.textContent = data;
      break;

    default:
      break;
  }
};

export default viewQuiz;
