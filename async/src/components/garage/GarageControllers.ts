import { getCars, createCar, updateCar } from '../../api/fetch';
import GarageForm from './GarageForm';
import Pagination from '../Pagination';
import { CreateCar, Cars } from '../../types/types';
import GarageContainer from './GarageContainer';
import store from '../../store/store';

const pageName = 'garage';
const limit = 7;

class GarageControllers {
  rootEl: HTMLElement;

  GarageContainer: GarageContainer;

  Pagination: Pagination;

  updateForm: GarageForm;

  createForm: GarageForm;

  constructor(data: { cars: Cars; count: string } ) {
    this.rootEl = document.createElement('div');

    this.GarageContainer = new GarageContainer(data.cars);

    this.Pagination = new Pagination(
      pageName,
      limit,
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
<div class="garage-btns">
<button>Race</button>
<button>Reset</button>
<button>Generate cars</button>
</div>
`;
    controls.prepend(this.updateForm.init());
    controls.prepend(this.createForm.init());

    this.rootEl.prepend(controls);
    this.rootEl.append(this.Pagination.rootEl);
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
