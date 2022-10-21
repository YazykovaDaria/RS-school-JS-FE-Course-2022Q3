import onChange from 'on-change';
import stopWatch from './stopwatch';
//import { getPositionItems } from './utils/utils.js';

//export { getPositionItems } from './utils/utils.js';

const setItemStyles = (itemsPosition) => {
  const shiftPs = 100;
  itemsPosition.forEach((element) => {
    element.item.style.transform = `translate3D(${element.x * shiftPs}%, ${element.y * shiftPs}%, 0)`;
  });
  // сокрытие последнего квадрата
  //itemsPosition[itemsPosition.length - 1].item.style.display = 'none';
};

const appWiev = (state, elements) => onChange(state, (path, value) => {
  switch (path) {
    case 'startGame':
      //stopWatch(value);
      //console.log(value);
      break;

    case 'gamePlay.itemCoordinates':
      setItemStyles(value);
      // console.log(positions);
      break;

    case 'showResult':
      console.log(value);
      break;

    default:
      break;
  }
});

export default appWiev;
