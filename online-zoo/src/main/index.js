import './index.html';
import 'normalize.css';
import './style.scss';
import burgerMenu from '../js/burger';
import goCarousel from '../js/carousel';
import goPopup from '../js/popup';

burgerMenu();
goCarousel();
goPopup();

const rangeInput = document.getElementById('range');
const allTestimonialItems = document.querySelectorAll('.card-border');

let startIndex = 0;
let endIndex = startIndex + 3;
let previousIndex = 0;

const changeDisplayedItems = () => {
  const mooveForward = rangeInput.value - previousIndex > 0;
  startIndex = rangeInput.value;
  endIndex = +rangeInput.value + 3;
  //console.log(startIndex, endIndex, previousIndex);

  if (mooveForward) {
    //console.log(mooveForward);
    previousIndex += 1;
    if (startIndex > 0) {
      allTestimonialItems[startIndex - 1].classList.add('from-center-to-left');
      allTestimonialItems[startIndex].classList.add('from-center-to-left');
      allTestimonialItems[+startIndex + 1].classList.add('from-center-to-left');
      allTestimonialItems[+startIndex + 2].classList.add('from-center-to-left');
      allTestimonialItems[+startIndex + 3].classList.add('from-center-to-left');
      allTestimonialItems[+startIndex].addEventListener(
        'animationend',
        () => {
          allTestimonialItems[startIndex - 1].classList.remove('_visible');
          allTestimonialItems[startIndex - 1].classList.add('_hidden');

          allTestimonialItems[startIndex - 1].classList.remove(
            'from-center-to-left',
          );
          allTestimonialItems[startIndex].classList.remove(
            'from-center-to-left',
          );
          allTestimonialItems[+startIndex + 1].classList.remove(
            'from-center-to-left',
          );
          allTestimonialItems[+startIndex + 2].classList.remove(
            'from-center-to-left',
          );
          allTestimonialItems[+startIndex + 3].classList.remove(
            'from-center-to-left',
          );
        },
      );
    }

    if (endIndex <= 10) {
      allTestimonialItems[endIndex].classList.remove('_hidden');
      allTestimonialItems[endIndex].classList.add('_visible');
    }
  } else {
    startIndex == 0 ? (previousIndex = 0) : (previousIndex -= 1);
    //console.log(startIndex);
    allTestimonialItems[startIndex].classList.remove('_hidden');
    allTestimonialItems[startIndex].classList.add('_visible');

    allTestimonialItems[startIndex].classList.add('from-left-to-center');
    allTestimonialItems[+startIndex + 1].classList.add('from-left-to-center');
    allTestimonialItems[+startIndex + 2].classList.add('from-left-to-center');
    allTestimonialItems[+startIndex + 3].classList.add('from-left-to-center');
    allTestimonialItems[+startIndex + 4].classList.add('from-left-to-center');

    allTestimonialItems[endIndex].addEventListener('animationend', () => {
      allTestimonialItems[+endIndex].classList.remove('_hidden');
      allTestimonialItems[+endIndex].classList.add('_visible');

      allTestimonialItems[startIndex].classList.remove('from-left-to-center');

      allTestimonialItems[+startIndex].classList.remove('from-left-to-center');
      allTestimonialItems[+startIndex + 1].classList.remove(
        'from-left-to-center',
      );
      allTestimonialItems[+startIndex + 2].classList.remove(
        'from-left-to-center',
      );
      allTestimonialItems[+startIndex + 3].classList.remove(
        'from-left-to-center',
      );
      allTestimonialItems[+startIndex + 4].classList.remove(
        'from-left-to-center',
      );
    });

    if (startIndex > 0) {
      allTestimonialItems[startIndex - 1].classList.remove('_visible');
      allTestimonialItems[startIndex - 1].classList.add('_hidden');
    }
  }
};

rangeInput.addEventListener('input', () => {
console.log('hi');
  changeDisplayedItems();
});
