import initRouter from './router/router';

const getHeader = (): HTMLElement => {
  const btns = document.createElement('header');
  btns.classList.add('btns');
  btns.innerHTML = `<button class="btn js-rout" data-rout="/">Garage</button>
  <button class="btn js-rout" data-rout="/winners">Winners</button>`;
  return btns;
};

const app = async () => {
  const body = document.querySelector<HTMLBodyElement>('body');
  if (body) {
    body.prepend(getHeader());
  }

  const appEl = document.createElement('main');
  appEl.setAttribute('id', 'app');
  body?.append(appEl);

  initRouter();
};

export default app;
