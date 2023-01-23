import { getWinners } from '../api/fetch';
import store from '../store/store';
import WinnersPage from '../components/winners/Winners';

const winnersPage = async(appEl: HTMLElement) => {
  const { currentPage, sort, order } = store.winners;
  const res = await getWinners(currentPage, sort, order);
  if (res && appEl) {
    const page = new WinnersPage(res);
    appEl.append(page.rootEl);
  }
};

export default winnersPage;
