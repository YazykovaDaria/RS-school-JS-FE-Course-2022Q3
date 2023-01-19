type GarageStor = {
  currentPage: number;
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
    // currentCars: [],
  },
  winners: {
    currentPage: 1,
    sort: 'time',
    order: 'ASC',
  },
};

export default store;
