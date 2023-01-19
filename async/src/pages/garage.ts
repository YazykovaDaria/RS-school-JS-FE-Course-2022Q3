import { getCars } from "../api/fetch";
import GarageContainer from "../components/garage/GarageContainer";
import Pagination from "../components/Pagination";

const pageName = 'garage';
const limit = 7;

const garagePage = async (appEl: HTMLElement) => {

  const res = await getCars();
  if(res) {
    const {cars, count} = res;
    if (appEl) {
      const carsInGarage = new GarageContainer(cars).init();
      const pagination = new Pagination(pageName, count, limit, carsInGarage).init();

      appEl.append(pagination);
    }
  }


}

export default garagePage;
