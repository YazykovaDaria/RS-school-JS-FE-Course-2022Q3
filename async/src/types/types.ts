export type Car = {
  name: string,
  color: string,
  id: number
};

export type Cars = Array<Car>;

export type CreateCar = {
  name: string,
  color: string
};

export type Winner = {
  id: number,
  wins: number,
  time: number
};

export type Winners = Array<Winner>;

export type CreateWinner = {
  wins: number,
  time: number
};

export type StartStopCar = {
  velocity: number,
  distance: number
};

export type WinCarData = {
  id: number,
  name: string,
  color: string,
  speed: number,
  wins: number,
};

export type Store = {
  garage: {
    currentPage: number,
    update: string,
    updateId: number,
    create: string,
  },
  winners: {
    currentPage: number,
    sort: string,
    order: string,
  },
};
