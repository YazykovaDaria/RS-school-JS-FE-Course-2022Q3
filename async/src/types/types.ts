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
