import { StartStopCar, Car } from '../../types/types';
import gerCarImg from './carImg';
import flag from '../../../public/red-flag-svgrepo-com.svg';
import {
  deleteCar, deleteWinner, switchToDriveMode, startStopEngineCar,
} from '../../api/fetch';
import store from '../../store/store';

const carImageWidth = 100;

class CarCard {
  carEl: HTMLElement;

  startStopBtns: HTMLElement;

  controlBtns: HTMLElement;

  public speed = 0;

  private carAnimation: Animation | undefined;

  car: Car;

  constructor(car: Car) {
    this.carEl = document.createElement('div');
    this.startStopBtns = document.createElement('div');
    this.controlBtns = document.createElement('div');
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

    this.controlBtns.classList.add('btns');
    this.controlBtns.innerHTML = `<button class="js-select">Select</button>
    <button class="js-remove">Remove</button>
    <span>${name}<span>`;

    this.startStopBtns.innerHTML = `
    <button class="btn-sm js-start">A</button>
    <button class="btn-sm js-stop" disabled>B</button>
    `;

    const track = document.createElement('div');
    track.classList.add('car-track');
    const img = gerCarImg(color);
    track.innerHTML = `
    <div class="car-animate">
    ${img}
    </div>
    <img src="${flag}" class="flag" alt="flag icon" />
    </div>`;

    const carContainer = document.createElement('div');
    carContainer.classList.add('car');

    carContainer.append(this.startStopBtns);
    carContainer.append(track);

    this.carEl.append(this.controlBtns);
    this.carEl.append(carContainer);
  }

  attachEvents(): void {
    const { id, name } = this.car;

    this.controlBtns.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('.js-remove')) {
        deleteCar(id);
        deleteWinner(id);
        this.carEl.remove();
      } else if (target.matches('.js-select')) {
        store.garage.updateId = id;
        store.garage.update = name;
        const input = document.querySelector('.js-update') as HTMLInputElement;
        input.value = name;
      }
    });

    this.startStopBtns.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('.js-start')) {
        this.startCarEngine(id);
      } else if (target.matches('.js-stop')) {
        this.stopCarEngine(id);
      }
    });
  }

  disableButtons(type = false): void {
    const startBtn = this.startStopBtns.querySelector('.js-start') as HTMLButtonElement;
    const stopBtn = this.startStopBtns.querySelector('.js-stop') as HTMLButtonElement;
    startBtn.disabled = type;
    stopBtn.disabled = !type;
  }

  async stopCarEngine(carId: number): Promise<void> {
    const status = 'stopped';
    const res = await startStopEngineCar(carId, status);

    if (res.status === 200) {
      this.disableButtons();
      this.speed = 0;
      this.carAnimation?.cancel();
      const imageCar = this.carEl.querySelector('.car-animate') as HTMLElement;
      imageCar.style.left = '0px';
    }
  }

  async startCarEngine(carId: number): Promise<void> {
    const status = 'started';
    const data = await startStopEngineCar(carId, status);

    if (data.status === 200) {
      this.disableButtons(true);

      const { result } = data;
      const time = result.distance / result.velocity;

      this.animationCar(time);
      await this.switchToDriveMode(result);
    }
  }

  private animationCar(time: number): void {
    const imageCar = this.carEl.querySelector('.car-animate') as HTMLElement;
    if (imageCar) {
      this.carAnimation = imageCar.animate(
        [{ left: '100px' }, { left: `calc(100% - ${carImageWidth}px)` }],
        {
          duration: time,
          easing: 'ease-in-out',
        },
      );
      this.carAnimation.play();
      this.carAnimation.onfinish = () => {
        imageCar.style.left = `calc(100% - ${carImageWidth}px)`;
      };
    }
  }

  private async switchToDriveMode(car: StartStopCar): Promise<void> {
    const driveMode = await switchToDriveMode(this.car.id);
    return new Promise((resolve) => {
      if (driveMode === 500) {
        this.carAnimation?.pause();
      }

      if (driveMode === 200) {
        this.speed = Math.floor(car.distance / car.velocity);
        resolve();
      }
    });
  }
}

export default CarCard;
