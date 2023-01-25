import { Store } from '../types/types';

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
