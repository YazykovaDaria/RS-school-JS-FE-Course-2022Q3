import { getCars, getWinners } from '../../api/fetch';
import { Winners, Winners } from '../../types/types';
import WinnerCard from './WinnerCard';
import store from '../../store/store';

class WinnerContainer {
  rootEl: HTMLElement;

  containerEl: HTMLElement;

  winners: Array<WinnerCard>;

  constructor(winners: Winners) {
    this.winners = winners.map((win) => new WinnerCard(win));
    this.rootEl = document.createElement('div');
    this.containerEl = document.createElement('div');

    this.render();
  }

  render() {
    const panel = document.createElement('div');
    panel.classList.add('row', 'panel');
    panel.innerHTML = `
<span>№</span>
<span>Car</span>
<span>Name</span>
<p>Wins <span class="js-sort win-desc">↑</span><span class="js-sort win-asc">↓</span></p>
<p>Time (sec) <span class="js-sort time-desc">↑</span><span class="active js-sort time-asc">↓</span></p>
  `;

    this.winnersRender();
    this.rootEl.append(panel);
    this.rootEl.append(this.containerEl);
    this.attachEvents();
  }

  winnersRender() {
    this.winners.forEach((win, ind) => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.innerHTML = `<span>${ind + 1}</span>`;
      const winEl = win.init();
      row.append(winEl);
      this.containerEl.append(row);
    });
  }

  private removeActiveSpan() {
    this.rootEl.querySelectorAll('.js-sort').forEach((el) => {
      el.classList.remove('active');
    });
  }

  private attachEvents(): void {
    this.rootEl.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('.win-asc')) {
        store.winners.sort = 'wins';
        store.winners.order = 'ASC';
        this.sortWinners();
        target.classList.add('active');
      } else if (target.matches('.win-desc')) {
        store.winners.sort = 'wins';
        store.winners.order = 'DESC';
        this.sortWinners();
        target.classList.add('active');
      } else if (target.matches('.time-asc')) {
        store.winners.sort = 'time';
        store.winners.order = 'ASC';
        this.sortWinners();
        target.classList.add('active');
      } else if (target.matches('.time-desc')) {
        store.winners.sort = 'time';
        store.winners.order = 'DESC';
        this.sortWinners();
        target.classList.add('active');
      }
    });
  }

  private async sortWinners() {
    this.removeActiveSpan();
    const { currentPage, sort, order } = store.winners;
    const data = await getWinners(currentPage, sort, order);
    if (data) {
      this.update(data?.winners);
    }
  }

  update(newWinners: Winners): void {
    this.winners = newWinners.map((win) => new WinnerCard(win));
    this.containerEl.innerHTML = '';
    this.winnersRender();
  }
}

export default WinnerContainer;
