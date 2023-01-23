import { getCars } from '../../api/fetch';
import GarageForm from './GarageForm';
import Pagination from '../Pagination';
import { CreateCar } from '../../types/types';
import GarageContainer from './GarageContainer';
import store from '../../store/store';

const pageName = 'garage';
const limit = 7;

class GarageControllers {
  rootEl: HTMLElement;

  GarageContainer: GarageContainer;

  Pagination: Pagination;

  updateForm = new GarageForm('update');

  createForm = new GarageForm('create');

  constructor(data: { cars: Cars; count: string } ) {
    this.rootEl = document.createElement('div');

    // this.updateForm = new GarageForm('update');

    // this.createForm = new GarageForm('create');

    this.GarageContainer = new GarageContainer(data.cars);

    this.Pagination = new Pagination(
      pageName,
      limit,
      Number(data.count),
      this.GarageContainer.garageEl,
      this.updateCars,
    );

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

  async updateCars(): Promise<void> {
    const cars = await getCars(store.garage.currentPage);
    if (cars) {
      console.log(this.GarageContainer);

      this.Pagination.updatePagination(Number(cars.count));
      this.GarageContainer.update(cars.cars);
    }
  }
}

export default GarageControllers;

const y = `<form>
<input type="text" id="uname" name="name"/>
<input type="color" id="head" name="head"
value="#e66465">
<button type="submit">Create</bytton>
</form>

<form>
<input type="text" id="uname" name="name"/>
<input type="color" id="head" name="head"
value="#e66465">
<button type="submit">Update</bytton>
</form>`;
