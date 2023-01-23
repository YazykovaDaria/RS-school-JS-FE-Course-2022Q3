import { Winners } from '../../types/types';
import Pagination from '../Pagination';
import WinnerContainer from './WinnerContainer';
import { limitWinners } from '../../common/constans';
import { getWinners } from '../../api/fetch';
import store from '../../store/store';

const pageName = 'winners';

class WinnersPage {
  winners: { winners: Winners, count: string };

  rootEl: HTMLElement;

  WinnersContainer: WinnerContainer;

  Pagination: Pagination;

  constructor(winners:{ winners: Winners, count: string }) {
    this.winners = winners;
    this.rootEl = document.createElement('div');
    this.WinnersContainer = new WinnerContainer(winners.winners);
    this.Pagination = new Pagination(
      pageName,
      limitWinners,
      Number(winners.count),
      this.WinnersContainer.rootEl,
      this.updateWinners.bind(this),
    );

    this.render();
  }

  render(): void {
    this.rootEl.append(this.Pagination.rootEl);
  }

  async updateWinners() {
    const { currentPage, sort, order } = store.winners;
    const winners = await getWinners(currentPage, sort, order);
    if (winners) {
      this.Pagination.updatePagination(Number(winners.count));
      this.WinnersContainer.update(winners.winners);
    }
  }
}

export default WinnersPage;
