import GarageControllers from '../components/garage/GarageControllers';
import { getCars } from '../api/fetch';
import store from '../store/store';
import { limitGarage } from '../common/constans';

const garagePage = async (appEl: HTMLElement) => {
  const res = await getCars(store.garage.currentPage, limitGarage);
  if (res && appEl) {
    const page = new GarageControllers(res);
    appEl.append(page.rootEl);
  }
};

export default garagePage;
