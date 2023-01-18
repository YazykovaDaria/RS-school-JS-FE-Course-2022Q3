import garagePage from '../pages/garage';
import winnersPage from '../pages/winners';

const routes = {
  garage: '/',
  winners: '/winners',
};

const render = (path: string) => {
  const app = document.getElementById('app');

  if (app) {
    app.innerHTML = '';
    if (path === routes.garage) {
      garagePage(app);
    } else if (path === routes.winners) {
      winnersPage(app);
    } else {
      app.innerHTML = '<p>Page not found</p>';
    }
  }
};

const goTo = (path: string) => {
  window.history.pushState({ path }, path, path);
  render(path);
};

const initRouter = () => {
  window.addEventListener('popstate', () => {
    render(new URL(window.location.href).pathname);
  });

  document.querySelectorAll('.js-rout').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const path = target?.dataset.rout;
      if (path) { goTo(path); }
    });
  });
  render(new URL(window.location.href).pathname);
};

export default initRouter;
