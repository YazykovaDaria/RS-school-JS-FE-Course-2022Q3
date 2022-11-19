import { playAudio } from '../helpers/helpers';
import audioFail from '../../assets/audio/sucsses.mp3';
import audioSucsses from '../../assets/audio/wrong.mp3';
import AudioPlayer from '../helpers/audioPlayer';
import birdImg from '../../assets/img/bird.jpg';

// const elements = {
//   questBody: null,
//   answersContainer: null,
//   choisedContainer: null,
//   choisedBody: null,
//   quizRules: null,
//   btn: null,
//   score: null,
// }

const questBody = document.getElementById('question');
const answersContainer = document.getElementById('quiz-answers');
const choisedContainer = document.getElementById('choisedAnswer');
const choisedBody = choisedContainer.querySelector('.card__body');
const quizRules = document.getElementById('rules');
const btn = document.getElementById('nextLevel');
const score = document.getElementById('score');
const categories = document.querySelectorAll('.js-level');

// const main = document.querySelector('.main');
const hidedName = '*******';

const mainAudio = new AudioPlayer('');
const sideAudio = new AudioPlayer('');
const mainAudioPlayer = mainAudio.init();
const sideAudioPlayer = sideAudio.init();
mainAudio.setAnotherPlayer(sideAudio);
sideAudio.setAnotherPlayer(mainAudio);

questBody.append(mainAudioPlayer);
choisedBody.append(sideAudioPlayer);

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

const showChoizedContent = (indicator, data = '') => {
  if (indicator === 'init') {
    choisedContainer.classList.add('hide');
    quizRules.classList.remove('hide');
  } else {
    choisedContainer.classList.remove('hide');
    quizRules.classList.add('hide');

    choisedContainer.querySelector('.js-main-bird').src = data.image;
    choisedContainer.querySelector('.js-text').textContent = data.description;
    choisedBody.querySelector('.js-name').textContent = data.name;
    choisedBody.querySelector('.js-second-name').textContent = data.species;

    sideAudio.setSound(data.audio);
  }
};

const addClassForAnswer = ({ id }, className) => {
  const el = document.getElementById(id);
  el.classList.add(className);
};

const switchLevel = () => {
  for (let i = 0; i < categories.length; i += 1) {
    const el = categories[i];
    if (el.classList.contains('active')) {
      el.classList.remove('active');
      categories[i + 1].classList.add('active');
      return;
    }
  }
};

const showPlayCard = (img, cardName) => {
  questBody.querySelector('.title').textContent = cardName;
  document.body.querySelector('.js-main-bird').src = img;
};

const quizView = (indicator, data = '') => {
  switch (indicator) {
    case 'init':
      buildAnswers(data.answers);
      showChoizedContent(indicator);
      mainAudio.setSound(data.rightAnswer.audio);
      showPlayCard(birdImg, hidedName);
      btn.disabled = true;

      console.log(data);
      break;

    case 'wrong':
      addClassForAnswer(data, indicator);
      playAudio(audioSucsses);
      showChoizedContent(indicator, data);
      break;

    case 'right':
      addClassForAnswer(data, indicator);
      playAudio(audioFail);
      mainAudio.pause();
      showPlayCard(data.image, data.name);
      showChoizedContent(indicator, data);
      btn.disabled = false;
      break;

    case 'choised':
      showChoizedContent(indicator, data);
      break;

    case 'score':
      score.textContent = data;
      break;

    case 'nextLevel':
      switchLevel();
      break;

    default:
      console.log('unknom indicator');
      break;
  }
};

export default quizView;
