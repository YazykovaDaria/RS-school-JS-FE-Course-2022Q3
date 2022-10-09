
const buttonLeft = document.querySelector('.button-arrow-left');
const buttonRight = document.querySelector('.button-arrow-right');
const carousel = document.querySelector('.carousel');
const itemLeft = document.querySelector('#carousel-left');
const itemRight = document.querySelector('#carousel-right');
const itemActive = document.querySelector('#carousel-active');

const createCardTemplate = () => {
  const card1 = document.createElement('div');
  card1.classList.add('pets-info');
  card1.innerText = Math.floor(Math.random() * 8);
  return card1;
}

function getRandomArr() {
  let randomArr = [];

  for (let i = 0; randomArr.length < 3; i++) {
    let a = Math.floor(Math.random() * 8);
    if (!(randomArr.includes(a, 0))) {
      randomArr.unshift(a);
    }
  }
  return randomArr;
}

function createCardTemplate2(i) {
  const card = document.createElement('div');
  card.classList.add('pets-info');
  card.setAttribute('id', pets[i]['id']);
  const imgPet = `<img class="pets" src="${pets[i]['img']}" alt="${pets[i]['type']}">`;
  const namePet = `<h3 class="pets-name">${pets[i]['name']}</h3>`;
  const buttonPet = `<a href="../pets/index.html" class="btn-pets btn">Learn more</a>`;
  card.insertAdjacentHTML('beforeend', imgPet);
  card.insertAdjacentHTML('beforeend', namePet);
  card.insertAdjacentHTML('beforeend', buttonPet);
  return card;
}

const moveRight = () => {
  carousel.classList.add('move-right');
  carousel.removeEventListener('click', moveRight);
  carousel.removeEventListener('click', moveLeft);

}

const moveLeft = () => {
  carousel.classList.add('move-left');
  carousel.removeEventListener('click', moveRight);
  carousel.removeEventListener('click', moveLeft);

}

buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);
document.querySelector('.button-arrow-left-too').addEventListener('click', moveLeft);

carousel.addEventListener('animationend', animationEvent => {
  if (animationEvent.animationName === 'move-left-carousel') {
    carousel.classList.remove('move-left');
    const RightItem = itemRight.innerHTML;
    document.querySelector('#carousel-active').innerHTML = RightItem;
    itemRight.innerHTML = "";
    let randomArr = getRandomArr();
    for (let i = 0; i < 3; i++) {
      let a = randomArr[i];
      const card = createCardTemplate2(a);
      itemRight.appendChild(card);
    }


  } else {
    carousel.classList.remove('move-right');
    const LeftItem = itemLeft.innerHTML;
    document.querySelector('#carousel-active').innerHTML = LeftItem;
    itemLeft.innerHTML = "";
    let randomArr = getRandomArr();
    for (let i = 0; i < 3; i++) {
      let a = randomArr[i];
      const card = createCardTemplate2(a);
      itemLeft.appendChild(card);
    }
  }
})

const carousel = () => {
  console.log('car');
}

export default carousel;
