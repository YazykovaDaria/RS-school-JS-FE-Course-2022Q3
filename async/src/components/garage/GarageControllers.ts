import { getCars, createCar, updateCar } from '../../api/fetch';
import GarageForm from './GarageForm';
import Pagination from '../Pagination';
import { CreateCar, Cars } from '../../types/types';
import CarCard from '../car/Car';
import GarageContainer from './GarageContainer';
import store from '../../store/store';
import { limitGarage, carNames, maxCarsGenerate } from '../../common/constans';
import getRandomColor from '../../common/helpers';

const pageName = 'garage' as const;

class GarageControllers {
  rootEl: HTMLElement;

  GarageContainer: GarageContainer;

  Pagination: Pagination;

  updateForm: GarageForm;

  createForm: GarageForm;

  constructor(data: { cars: Cars; count: string }) {
    this.rootEl = document.createElement('div');

    this.GarageContainer = new GarageContainer(data.cars);

    this.Pagination = new Pagination(
      pageName,
      limitGarage,
      Number(data.count),
      this.GarageContainer.garageEl,
      this.updateCars.bind(this),
    );

    this.updateForm = new GarageForm('update', this.updateCar.bind(this));

    this.createForm = new GarageForm('create', this.createCar.bind(this));

    this.render();
  }

  render():void {
    const controls = document.createElement('div');
    controls.classList.add('contrls');
    controls.innerHTML = `
<div class="garage-btns js-btns">
<button class="js-race">Race</button>
<button class="js-reset">Reset</button>
<button class="js-generate">Generate cars</button>
</div>
`;
    controls.prepend(this.updateForm.init());
    controls.prepend(this.createForm.init());

    this.rootEl.prepend(controls);
    this.rootEl.append(this.Pagination.rootEl);
    this.attachEvents();
  }

  private attachEvents(): void {
    const btnGenerate = this.rootEl.querySelector('.js-generate') as HTMLButtonElement;
    const btnRace = this.rootEl.querySelector('.js-race') as HTMLButtonElement;
    const btnReset = this.rootEl.querySelector('.js-reset') as HTMLButtonElement;

    const disabledBtns = (flag = true) => {
      btnGenerate.disabled = flag;
      btnRace.disabled = flag;
      btnReset.disabled = flag;
    };

    btnGenerate?.addEventListener('click', async () => {
      disabledBtns();
      await this.generateRandomCars();
      disabledBtns(false);
    });

    btnRace.addEventListener('click', async () => {
      disabledBtns();
      await this.startCarsRace();
      disabledBtns(false);
    });

    btnReset.addEventListener('click', () => {
      disabledBtns();
      this.resetCars();
      disabledBtns(false);
    });
  }

  private async startCarsRace(): Promise<void> {

    const res: Promise<CarCard>[] = this.GarageContainer.cars.map(
      async (car) => {
        await car.startCarEngine(car.car.id);
        car.disableButtons();
        return car;
      },
    );

  }

  private resetCars(): void {
    const allCarsToReset = this.GarageContainer.cars?.map(async (car) => {
      await car.stopCarEngine(car.car.id);
    });

    Promise.all(allCarsToReset);
  }



  private async generateRandomCars(): Promise<void> {
    for (let i = 0; i <= maxCarsGenerate; i -= -1) {
      const randomName = carNames[Math.floor(Math.random() * carNames.length)];
      // eslint-disable-next-line no-await-in-loop
      await this.createCar({
        name: randomName,
        color: getRandomColor(),
      });
    }
    await this.updateCars();
  }

  async createCar(data: CreateCar) {
    await createCar(data);
    await this.updateCars();
  }

  async updateCar(data: CreateCar) {
    await updateCar(store.garage.updateId, data);
    await this.updateCars();
  }

  async updateCars(): Promise<void> {
    const cars = await getCars(store.garage.currentPage);
    if (cars) {
      this.Pagination.updatePagination(Number(cars.count));
      this.GarageContainer.update(cars.cars);
    }
  }
}

export default GarageControllers;
