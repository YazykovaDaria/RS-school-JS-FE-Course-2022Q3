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
    li.textContent = item.name;
    answersContainer.prepend(li);
  });
};

const changeAudio = ({ audio }) => audioSrc.src = audio;


const viewQuiz = (indicator, data) => {
  switch (indicator) {
    case 'answers':
      buildAnswers(data);
      break;

    case 'melody':
      //поменять логику после переделки плеера
      changeAudio(data);

      break;

    default:
      break;
  }
};

export default viewQuiz;
