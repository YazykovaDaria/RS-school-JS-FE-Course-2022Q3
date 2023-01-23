import store from '../store/store';

class Pagination {
  name: string;

  limit: number;

  count: number;

  nestedEl: HTMLElement;

  callback: () => Promise<void>;

  rootEl: HTMLElement;

  titleEl: HTMLElement;

  btnPrev: HTMLButtonElement;

  btnNext: HTMLButtonElement;

  constructor(
    name: string,
    limit: number,
    count: number,
    nestedEl: HTMLElement,
    callback: () => Promise<void>,
  ) {
    this.name = name;
    this.limit = limit;
    this.count = count;
    this.nestedEl = nestedEl;
    this.callback = callback;
    this.rootEl = document.createElement('div');
    this.titleEl = document.createElement('p');
    this.btnPrev = document.createElement('button');
    this.btnNext = document.createElement('button');

    this.render();
  }

  render(): void {
    this.rootEl.innerHTML = `
  <h2>${this.name.toUpperCase()}</h2>`;
    const { currentPage } = store[this.name];
    this.titleEl.textContent = `Page № ${currentPage} (${this.count})`;
    const btns = document.createElement('div');
    btns.classList.add('btns');
    this.btnPrev.textContent = 'Prev';
    this.btnNext.textContent = 'Next';
    this.disabledBtns();
    btns.append(this.btnPrev);
    btns.append(this.btnNext);

    this.rootEl.append(this.titleEl);
    this.rootEl.append(this.nestedEl);
    this.rootEl.append(btns);
  }

  disabledBtns() {
    const { currentPage } = store[this.name];
    this.btnPrev.disabled = currentPage === 1;
    this.btnNext.disabled = currentPage > this.count / this.limit;
  }

  updatePagination(count: number) {
    this.count = count;
    const { currentPage } = store[this.name];
    this.titleEl.textContent = `Page № ${currentPage} (${this.count})`;
    this.disabledBtns();
  }
}

export default Pagination;
