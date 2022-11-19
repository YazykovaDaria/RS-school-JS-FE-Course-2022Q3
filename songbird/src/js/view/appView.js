const startBtn = document.querySelector('.btn-link');

const appView = (indicator, data = '') => {
  switch (indicator) {
    case 'lang':
      document.getElementById(data).checked = true;
      break;
    case 'quizPage':
      startBtn.style.display = "none";
      //.classList.add('hide');
      break;
    default:
      console.log('unknom indicator');
      break;
  }
};

export default appView;
