import { Cars } from '../../types/types';
import CarCard from '../car/Car';

class GarageContainer {
  targetEl: HTMLElement;

  garageEl: HTMLElement;

  cars: Cars;

  constructor(targetEl: HTMLElement, cars: Cars) {
    this.targetEl = targetEl;
    this.cars = cars;
    this.garageEl = document.createElement('div');

    this.render();
  }

  render(): void {
    this.garageEl.setAttribute('id', 'garage');

    this.garageEl.innerHTML = `
  <h2>Garage (${this.cars.length})</h2>
  <p>Page № </p>
  `;

    this.cars.forEach((car) => {
      const carEl = new CarCard(car).init();
      this.garageEl.append(carEl);
    });

    const btns = document.createElement('div');
    btns.classList.add('btns');
    btns.innerHTML = `
  <button>Prew</button>
  <button>Next</button>
  `;

    this.garageEl.append(btns);

    this.targetEl.append(this.garageEl);
  }
}

export default GarageContainer;
