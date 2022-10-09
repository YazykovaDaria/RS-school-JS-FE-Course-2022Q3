import './index.html';
import 'normalize.css';
import './style.scss';
import burgerMenu from '../js/burger';
// import carousel from '../js/carousel';
import { animals } from '../js/data';
// carousel();
burgerMenu();

const buttonLeft = document.querySelector('#ctrl-lefr-d');
const buttonRight = document.querySelector('#ctrl-right-d');
const carousel = document.querySelector('.carousel-set');
const itemLeft = document.querySelector('.carousel-item.left');
const itemRight = document.querySelector('.carousel-item.right');
const itemActive = document.querySelector('.carousel-item.active');

// const createCardTemplate = () => {
//   const card1 = document.createElement('div');
//   card1.classList.add('animals-info');
//   card1.innerText = Math.floor(Math.random() * 8);
//   return card1;
// }

function getRandomArr() {
  const randomArr = [];

  for (let i = 0; randomArr.length < 3; i += 1) {
    const num = Math.floor(Math.random() * 6);
    if (!(randomArr.includes(num, 0))) {
      randomArr.unshift(num);
    }
  }
  return randomArr;
}

function createCardTemplate(i) {
  const card = document.createElement('div');
  card.classList.add('carousel-card');
  const cardContent = `<img class="carousel-img" src="${animals[i].img}" alt="${animals[i].name}">
  <div class="card-describtion">
  <div class="card-content">
  <div class="subtitle">${animals[i].name}</div>
  <div class="place">${animals[i].place}</div>
  </div>
  <img class="banana-icon" src="${animals[i].icon}" alt="banana bamboo icon">
  </div>`;
  card.innerHTML = cardContent;

  return card;
}

function moveRight() {
  carousel.classList.add('move-right');
  carousel.removeEventListener('click', moveRight);
  carousel.removeEventListener('click', moveLeft);
}

function moveLeft() {
  carousel.classList.add('move-left');
  carousel.removeEventListener('click', moveRight);
  carousel.removeEventListener('click', moveLeft);
}

buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);

// document.querySelector('.button-arrow-left-too').addEventListener('click', moveLeft);

carousel.addEventListener('animationend', (animationEvent) => {
  if (animationEvent.animationName === 'move-left-carousel') {
    carousel.classList.remove('move-left');
    const RightItem = itemRight.innerHTML;
    document.querySelector('.carousel-item.active').innerHTML = RightItem;
    itemRight.innerHTML = '';

    const randomArr = getRandomArr();
      for (let i = 0; i < 3; i += 1) {
      const index = randomArr[i];
      const card = createCardTemplate(index);
      itemRight.appendChild(card);
    }
  } else {
    carousel.classList.remove('move-right');
    const LeftItem = itemLeft.innerHTML;
    document.querySelector('.carousel-item.active').innerHTML = LeftItem;
    itemLeft.innerHTML = '';

    const randomArr = getRandomArr();
    for (let i = 0; i < 3; i += 1) {
      const a = randomArr[i];
      const card = createCardTemplate(a);
      itemLeft.appendChild(card);
    }
  }
});
