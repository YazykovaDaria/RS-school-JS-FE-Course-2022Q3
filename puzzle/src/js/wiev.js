import onChange from 'on-change';
import stopWatch from './stopwatch';


const appWiev = (state) => onChange(state, (path, value) => {
  switch (path) {
    case 'startGame':
      stopWatch(value);
console.log(value);
      break;

      case 'saveResult':
        console.log(value);
              break;

      case 'showResult':
        console.log(value);
              break;

    default:
      break;
  }
});

export default appWiev;
