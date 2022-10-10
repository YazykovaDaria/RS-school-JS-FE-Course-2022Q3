import { testimonials } from './data';

const cardsContainer = document.querySelector('.testim-cards');
const popup = document.querySelector('#popup');
const popupClose = popup.querySelector('.popup-close');

const getCardData = (id) => testimonials.filter((card) => card.id === id);

const getPopupCard = ([data]) => `<div class="testim-card">
  <div class="card-header">
  <img class="avatar" src="${data.avatar}" alt="avatar">
  <div class="card-header-title">
  <div class="card-title-name">${data.userName}</div>
  <div class="card-title-info">
  <span class="card-title-location">${data.userLocal} </span>
  <span class="card-title-date"> ${data.postDate}</span>
  </div>
  </div>
  </div>
  <div class="card-content">${data.content}</div>
    </div>`;

const close = () => popup.classList.remove('active');

const goPopup = () => {
  cardsContainer.addEventListener('click', (e) => {
    if (window.screen.width < 641) {
      const card = e.target.closest('.testim-card');
      if (card) {
        const popupCard = getPopupCard(getCardData(card.id));
        popup.querySelector('.card-border').innerHTML = popupCard;
        popup.classList.add('active');
      }
    }
  });

  popupClose.addEventListener('click', close);

  popup.addEventListener('click', (e) => {
    if (!e.target.closest('.popup-content')) {
      close();
    }
  });
};

export default goPopup;
