import { Car, Cars, CreateCar } from './../types/types';

const baseUrl = 'http://127.0.0.1:3000';

export const getCars = async(): Promise<Cars | null> => {
  try {
    const res = await fetch(`${baseUrl}/garage`);
    if (res.status === 200) {
      const data: Cars = await res.json();
      return data;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
}


export const getCar = async(carId: number): Promise<Car | null> => {
  try {
    const res = await fetch(`${baseUrl}/garage/${carId}`);
    if (res.status === 200) {
      const data: Car = await res.json();
      return data;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
}

export const createCar = async(car: CreateCar): Promise<Car | null> => {
  try {
  const res =  await fetch(`${baseUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    if (res.status === 201) {
      const data: Car = await res.json();
      return data;
    }
    return null;

  } catch (err) {
    throw new Error(err);
  }
}

export const deleteCar = async(carId: number): Promise<void> => {
  try {
    await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    throw new Error(err);
  }
}


export const updateCar = async(carId: number, car: CreateCar):Promise<void> => {
  try {
  await fetch(`${baseUrl}/garage/:${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  } catch (err) {
    throw new Error(err);
  }
}
