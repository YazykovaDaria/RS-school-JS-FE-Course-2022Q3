const burger = document.querySelector('.menu-burger');
const menuNav = document.querySelector('.nav-container');

const burgerMenu = () => {
  burger.addEventListener('click', () => {
    burger.classList.toggle('burger-active');
    menuNav.classList.toggle('active');
  });

  menuNav.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-list')) {
      burger.classList.remove('burger-active');
      menuNav.classList.remove('active');
    }
  });
};

export default burgerMenu;
