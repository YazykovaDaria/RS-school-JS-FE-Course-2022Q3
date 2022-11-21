/* eslint-disable no-param-reassign */
import AudioPlayer from '../helpers/audioPlayer';

const audio = new AudioPlayer('');
const audioPlayer = audio.init();

const popupCard = document.querySelector('.card__popup');
const popupCardTitle = popupCard.querySelector('.js-title');
const popupCardSubtitle = popupCard.querySelector('.js-subtitle');
const popupCardText = document.querySelector('.js-text-popup');
const popupImg = document.querySelector('.popup__img');

popupCard.append(audioPlayer);

const changePopupContent = (data) => {
  popupCardTitle.textContent = data.name;
  popupCardSubtitle.textContent = data.species;
  popupCardText.textContent = data.description;
  popupImg.src = data.image;
  audio.setSound(data.audio);
};

const buildGallery = (container, data) => {
  const html = data.map((item) => `<div class="gallery__card" data-id="${item.id}">
  <p class="gallery__subtitle">${item.name}</p>
  <img class="card__img" src="${item.image}" alt="bird">
  </div>`);
  container.innerHTML = html.join('');
};

const mainView = (indicator, element, data) => {
  switch (indicator) {
    case 'openPopup':
      changePopupContent(data);
      element.classList.add('active');
      break;

    case 'closePopup':
      audio.pause();
      element.classList.remove('active');
      break;

    case 'gallery':
      buildGallery(element, data);
      break;
    default:
      console.log('unknom indicator');
      break;
  }
};

export default mainView;
