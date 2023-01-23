import { Cars } from '../../types/types';
import CarCard from '../car/Car';

class GarageContainer {
  garageEl: HTMLElement;

  cars: Array<CarCard> = [];

  constructor(cars: Cars) {
    this.cars = cars.map((car) => new CarCard(car));
    this.garageEl = document.createElement('div');

    this.render();
  }

  render(): void {
    this.garageEl.setAttribute('id', 'garage');

    this.cars.forEach((car) => {
      const carEl = car.init();
      this.garageEl.append(carEl);
    });
  }

  update(newCars: Cars): void {
    this.cars = newCars.map((car) => new CarCard(car));
    this.garageEl.innerHTML = '';
    this.render();
  }
}

export default GarageContainer;
