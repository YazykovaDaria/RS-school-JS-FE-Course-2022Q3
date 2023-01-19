import { Cars, Car } from '../../types/types';
import CarCard from '../car/Car';

class GarageContainer {
  garageEl: HTMLElement;

  cars: Cars;

  constructor(cars: Cars) {
    this.cars = cars;
    this.garageEl = document.createElement('div');
  }

  init(): HTMLElement {
    this.render();

    return this.garageEl;
  }

  render(): void {
    this.garageEl.setAttribute('id', 'garage');

    this.cars.forEach((car) => {
      const carEl = new CarCard(car).init();
      this.garageEl.append(carEl);
    });
  }

  addCar(car: Car):void {
    const newCar = new CarCard(car).init();
    this.garageEl.append(newCar);
  }

  update(newCars: Cars): void {
    this.cars = newCars;
    this.garageEl.innerHTML = '';
    this.render();
  }
}

export default GarageContainer;
