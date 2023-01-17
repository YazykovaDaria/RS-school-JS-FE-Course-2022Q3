import gerCarImg from './carImg';
import flag from '../../../public/red-flag-svgrepo-com.svg';

class Car {
  carEl: HTMLElement;

  constructor() {
    this.carEl = document.createElement('div');
  }

  init(): HTMLElement {
    this.carEl.classList.add('car-card');

    const img = gerCarImg('green');
    this.carEl.innerHTML = `
<div class="btns">
<button>Select</button>
<button>Remove</button>
<span>Car Name<span>
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

    return this.carEl;
  }

  changeCarColor(color: string):void {

  }
}

export default Car;
