import GarageControllers from '../components/garage/GarageControllers';
import { getCars } from '../api/fetch';

const garagePage = async (appEl: HTMLElement) => {
  const res = await getCars();
  if (res && appEl) {
    const page = new GarageControllers(res);
    appEl.append(page.rootEl);
  }
};

export default garagePage;
