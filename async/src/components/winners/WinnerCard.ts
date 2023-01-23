import { Winner, Car } from '../../types/types';
import { getCar } from '../../api/fetch';
import gerCarImg from '../car/carImg';

class WinnerCard {
  winner: Winner;

  winnerEl: HTMLElement;

  constructor(winner: Winner) {
    this.winner = winner;
    this.winnerEl = document.createElement('div');
  }

  async render() {
    const car = await this.getCar();
    if (car) {
      const img = gerCarImg(car.color);
      this.winnerEl.classList.add('row');
      this.winnerEl.innerHTML = `
    ${img}
<span>${car.name}</span>
<span>${this.winner.wins}</span>
<span>${this.winner.time}</span>
    `;
    }
  }

  init(): HTMLElement {
    this.render();
    return this.winnerEl;
  }

  async getCar(): Promise<Car | null> {
    const car = await getCar(this.winner.id);
    return car;
  }
}

export default WinnerCard;
