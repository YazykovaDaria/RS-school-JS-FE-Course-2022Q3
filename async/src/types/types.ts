export type Car = {
  name: string,
  color: string,
  id: number
}

export type Cars = Array<Car>;

export type CreateCar = {
  name: string,
  color: string
}
