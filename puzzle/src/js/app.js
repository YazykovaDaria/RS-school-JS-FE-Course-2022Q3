import appWiev from './wiev';

const app = () => {
  const state = {
    startGame: false,
    saveResult: false,
    showResult: false,
  };

  const watcher = appWiev(state);

  const controls = document.querySelector('.js-controls');

  controls.addEventListener('click', (e) => {
    const { id } = e.target;
    switch (id) {
      case 'start':
        watcher.startGame = true;
        break;

      case 'stop':
        watcher.startGame = false;
        break;

      case 'save':
        watcher.saveResult = true;
        break;

      case 'result':
        watcher.showResult = true;
        break;

      default:
        break;
    }
  });
};

export default app;
