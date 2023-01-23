import { Winners, Car } from "../../types/types";
import WinnerCard from "./WinnerCard";
import { getCar } from "../../api/fetch";

class WinnerContainer {

  rootEl: HTMLElement;

  winners: Array<WinnerCard>;

  constructor(winners: Winners) {
    this.winners = winners.map((win) => new WinnerCard(win));
    this.rootEl = document.createElement('div');

    this.render();
  }

  render() {
    this.winners.forEach((win, ind) => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.innerHTML = `<span>${ind + 1}</span>`;
      const winEl = win.init();
      row.append(winEl);
      this.rootEl.append(row);
    });
  }

  update(newWinners: Winners): void {
    this.winners = newWinners.map((win) => new WinnerCard(win));
    this.rootEl.innerHTML = '';
    this.render();
  }
}

export default WinnerContainer;
