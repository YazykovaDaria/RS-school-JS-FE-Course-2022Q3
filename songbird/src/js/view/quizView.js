import { playAudio } from '../helpers/helpers';
import audioFail from '../../assets/audio/sucsses.mp3';
import audioSucsses from '../../assets/audio/wrong.mp3';
import AudioPlayer from '../helpers/audioPlayer';
import birdImg from '../../assets/img/bird.jpg';

const questBody = document.getElementById('question');
const answersContainer = document.getElementById('quiz-answers');
const choisedContainer = document.getElementById('choisedAnswer');
const btn = document.getElementById('nextLevel');
const score = document.getElementById('score');
const categories = document.querySelectorAll('.js-level');

const quizRules = '<p class="subtitle">Послушайте плеер</p><p class="subtitle">Выберите птицу из списка</p>';
const hidedName = '******';

const mainAudioPlayer = new AudioPlayer('');
const sideAudioPlayer = new AudioPlayer('');

mainAudioPlayer.setAnotherPlayer(sideAudioPlayer);
questBody.append(mainAudioPlayer.init());

sideAudioPlayer.init();
sideAudioPlayer.setAnotherPlayer(mainAudioPlayer);

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

const showChoizedContent = (content) => {
  choisedContainer.innerHTML = '';
  if (typeof content === 'string') {
    choisedContainer.innerHTML = content;
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

const viewQuiz = (indicator, data = '') => {
  switch (indicator) {
    case 'init':
      buildAnswers(data.answers);
      showChoizedContent(quizRules);
      mainAudioPlayer.setSound(data.rightAnswer.audio);
      showPlayCard(birdImg, hidedName);
      btn.disabled = true;

      console.log(data);
      break;

      // case 'answers':
      //   buildAnswers(data);
      //   btn.disabled = true;
      //   break;

      // case 'melody':
      //   // поменять логику после переделки плеера
      //   //changeAudio(data);
      //   console.log(data);
      //   break;

    case 'wrong':
      addClassForAnswer(data, indicator);
      playAudio(audioSucsses);
      showChoizedContent(data);
      break;

    case 'right':
      addClassForAnswer(data, indicator);
      playAudio(audioFail);
      mainAudioPlayer.pause();
      showPlayCard(data.image, data.name);
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

    case 'nextLevel':
      switchLevel();
      break;

    default:
      console.log('unknom indicator');
      break;
  }
};

export default viewQuiz;
