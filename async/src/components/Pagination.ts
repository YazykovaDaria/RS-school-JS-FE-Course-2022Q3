import store from '../store/store';

class Pagination {
  name: string;

  count: string;

  limit: number;

  nestedEl: HTMLElement;

  rootEl: HTMLElement;

  titleEl: HTMLElement;

  btns: HTMLElement;

  constructor(
    name: string,
    count: string,
    limit: number,
    nestedEl: HTMLElement,
  ) {
    this.name = name;
    this.count = count;
    this.limit = limit;
    this.nestedEl = nestedEl;
    this.rootEl = document.createElement('div');
    this.titleEl = document.createElement('p');
    this.btns = document.createElement('div');
  }

  init(): HTMLElement {
    this.render();

    return this.rootEl;
  }

  render(): void {
    const { currentPage } = store[this.name];

    this.rootEl.innerHTML = `
  <h2>${this.name.toUpperCase()} (${this.count})</h2>`;

    this.titleEl.textContent = `Page # ${currentPage}`;

    this.btns.classList.add('btns');
    const btnPrev = document.createElement('button');
    btnPrev.textContent = 'Prev';
    btnPrev.disabled = currentPage === 1;

    const bntNext = document.createElement('button');
    bntNext.textContent = 'Next';
    bntNext.disabled = currentPage > Number(this.count) / this.limit;
    this.btns.append(btnPrev);
    this.btns.append(bntNext);

    this.rootEl.append(this.titleEl);
    this.rootEl.append(this.nestedEl);
    this.rootEl.append(this.btns);
  }
}

export default Pagination;
