import AudioPlayer from '../helpers/audioPlayer';

const audio = new AudioPlayer('');
const audioPlayer = audio.init();

const popupCard = document.querySelector('.card__body');
const popupCardTitle = popupCard.querySelector('.js-title');
const popupCardSubtitle = popupCard.querySelector('.js-subtitle');
const popupCardText = document.querySelector('.js-text');
const popupImg = document.querySelector('.popup__img');

popupCard.append(audioPlayer);

const changePopupContent = (data) => {
  popupCardTitle.textContent = data.name;
  popupCardSubtitle.textContent = data.species;
  popupCardText.textContent = data.description;
  popupImg.src = data.image;
  audio.setSound(data.audio);
};

const popupView = (indicator, popupEl, data) => {

  switch (indicator) {
    case 'open':
      changePopupContent(data);
      popupEl.classList.add('active');
      break;

    case 'close':
      popupEl.classList.remove('active');
      break;
    default:
      break;
  }
};

export default popupView;
