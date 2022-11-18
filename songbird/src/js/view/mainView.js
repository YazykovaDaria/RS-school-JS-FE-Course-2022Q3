const startBtn = document.querySelector('.btn-link');

const mainView = (indicator, data = '') => {
  switch (indicator) {
    case 'lang':
      document.getElementById(data).checked = true;
      break;
    case 'startBtn':
      startBtn.classList.add('hide');
      break;
    default:
      console.log('unknom indicator');
      break;
  }
};

export default mainView;
