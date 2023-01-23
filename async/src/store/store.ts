export type GarageStor = {
  currentPage: number;
  update: string;
  updateId: number;
  create: string;

};

type WinnersStor = {
  currentPage: number,
  sort: string,
  order: string,
};

type Store = {
  [key: string]: GarageStor | WinnersStor,
};

const store: Store = {
  garage: {
    currentPage: 1,
    update: '',
    updateId: 0,
    create: '',
  },
  winners: {
    currentPage: 1,
    sort: 'time',
    order: 'ASC',
  },
};

export default store;
