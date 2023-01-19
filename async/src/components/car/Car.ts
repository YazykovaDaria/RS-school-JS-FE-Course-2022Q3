import gerCarImg from './carImg';
import { Car } from '../../types/types';
import flag from '../../../public/red-flag-svgrepo-com.svg';
import { deleteCar, deleteWinner } from '../../api/fetch';

class CarCard {
  carEl: HTMLElement;

  car: Car;

  constructor(car: Car) {
    this.carEl = document.createElement('div');
    this.car = car;
  }

  init(): HTMLElement {
    this.render();
    this.attachEvents();

    return this.carEl;
  }

  render(): void {
    const { name, id, color } = this.car;
    this.carEl.classList.add('car-card');
    this.carEl.setAttribute('id', String(id));

    const img = gerCarImg(color);
    this.carEl.innerHTML = `
<div class="btns">
<button class="js-select">Select</button>
<button class="js-remove">Remove</button>
<span>${name}<span>
</div>

    <section class="car">

    <div>
    <button class="btn-sm">A</button>
    <button class="btn-sm">B</button>
    </div>

  <div class="car-track">
  ${img}
  <img src="${flag}" class="svg" alt="flag icon" />
  </div>
  </section>
  `;
  }

  attachEvents(): void {
    const {id} = this.car;

    const removeEl = this.carEl.querySelector('.js-remove');
    removeEl?.addEventListener('click', () => {
      deleteCar(id);
      deleteWinner(id);
      this.carEl.remove();
    });
  }


}

export default CarCard;
