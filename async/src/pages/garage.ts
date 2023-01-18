import { getCars } from "../api/fetch";
import GarageContainer from "../components/garage/GarageContainer";

const garagePage = async (appEl: HTMLElement) => {

  const cars = await getCars();
  if (appEl && cars) {
    new GarageContainer(appEl, cars);
  }

}

export default garagePage;
