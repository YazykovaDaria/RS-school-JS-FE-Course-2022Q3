const progressbar = document.getElementById('range');
const reviews = document.querySelectorAll('.card-border');

let prevNumber = 0;

const goTestim = () => {
  progressbar.addEventListener('change', (e) => {
    const lastIndex = 4;
    const firstReview = Number(e.target.value);
    const lastReview = Number(e.target.value) + lastIndex;
    reviews.forEach((r) => {
      r.classList.remove('visible');
      r.classList.remove('last_visible');
    });
    for (let i = firstReview; i < lastReview; i += 1) {
      if (prevNumber > firstReview && i === firstReview) reviews[i].classList.add('fade');
      if (i === lastReview - 1) {
        reviews[i].classList.add('last_visible');
        if (prevNumber < firstReview) {
          reviews[i].classList.add('fade');
        }
      }
      reviews[i].classList.add('visible');
    }
    prevNumber = firstReview;
  });
};

export default goTestim;
