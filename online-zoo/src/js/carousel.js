import { animals } from './data';

const buttonsLeft = document.querySelectorAll('.control.ctrl-left');
const buttonsRight = document.querySelectorAll('.control.ctrl-right');
const carousels = document.querySelectorAll('.carousel-set');

function getRandomArr(min = 0, max = 11) {
  const randomArr = [];

  for (let i = 0; randomArr.length < 3; i += 1) {
    const num = Math.floor(Math.random() * (max - min) + min);
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
  carousels.forEach((carousel) => {
    carousel.classList.add('move-right');
    carousel.removeEventListener('click', moveRight);
    carousel.removeEventListener('click', moveLeft);
  });
}

function moveLeft() {
  carousels.forEach((carousel) => {
    carousel.classList.add('move-left');
    carousel.removeEventListener('click', moveRight);
    carousel.removeEventListener('click', moveLeft);
  });
}

const goCarousel = () => {
  buttonsLeft.forEach((button) => button.addEventListener('click', moveLeft));

  buttonsRight.forEach((button) => button.addEventListener('click', moveRight));

  carousels.forEach((carousel) => {
    carousel.addEventListener('animationend', (animationEvent) => {
      if (animationEvent.animationName === 'move-left-carousel') {
        carousel.classList.remove('move-left');
        const itemRight = carousel.querySelector('.carousel-item.right');
        const RightItem = itemRight.innerHTML;
        carousel.querySelectorAll('.carousel-item.active').forEach((item) => {
          item.innerHTML = RightItem;
          itemRight.innerHTML = '';
        });

        const randomArr = carousel.getAttribute('id') === 'first' ? getRandomArr(0, 7) : getRandomArr(8, 15);
        for (let i = 0; i < 3; i += 1) {
          const index = randomArr[i];
          const card = createCardTemplate(index);
          itemRight.appendChild(card);
        }
      } else {
        carousel.classList.remove('move-right');
        const itemLeft = carousel.querySelector('.carousel-item.left');
        const LeftItem = itemLeft.innerHTML;
        carousel.querySelector('.carousel-item.active').innerHTML = LeftItem;
        itemLeft.innerHTML = '';

        const randomArr = carousel.getAttribute('id') === 'first' ? getRandomArr(0, 7) : getRandomArr(8, 15);
        for (let i = 0; i < 3; i += 1) {
          const a = randomArr[i];
          const card = createCardTemplate(a);
          itemLeft.appendChild(card);
        }
      }
    });
  });
};

export default goCarousel;
