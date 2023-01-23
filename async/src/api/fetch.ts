import {
  Car, Cars, CreateCar, Winners, Winner, CreateWinner,
  StartStopCar,
} from '../types/types';
import { limitGarage } from '../common/constans';

const baseUrl = 'http://127.0.0.1:3000';

export const startStopEngineCar = async (
  carId: number, status: string): Promise<{ status: number; result: StartStopCar }> => {
  try {
    const res = await fetch(`${baseUrl}/engine?id=${carId}&status=${status}`, { method: 'PATCH' });
    const result:StartStopCar = await res.json();

    return {
      status: res.status,
      result,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const switchToDriveMode = async (carId: number): Promise<number> => {
  try {
    const res = await fetch(`${baseUrl}/engine?id=${carId}&status=drive`, { method: 'PATCH' });

    return res.status;
  } catch (err) {
    throw new Error(err);
  }
};

export const getCars = async (
  page = 1,
  limit = limitGarage,
): Promise<{ cars: Cars; count: string } | null> => {
  try {
    const res = await fetch(`${baseUrl}/garage?_limit=${limit}&_page=${page}`);
    if (res.status === 200) {
      const cars: Cars = await res.json();
      const count = res.headers.get('X-Total-Count') || '0';
      return { cars, count };
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

export const getCar = async (carId: number): Promise<Car | null> => {
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
};

export const createCar = async (car: CreateCar): Promise<Car | null> => {
  try {
    const res = await fetch(`${baseUrl}/garage`, {
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
};

export const deleteCar = async (carId: number): Promise<void> => {
  try {
    await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const updateCar = async (carId: number, car: CreateCar): Promise<void> => {
  try {
    await fetch(`${baseUrl}/garage/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const getWinners = async (
  page = 1,
  sort = 'time',
  order = 'ASC',
  limit = 10,
): Promise<{ winners: Winners; count: string } | null> => {
  try {
    const res = await fetch(
      `${baseUrl}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
    );

    if (res.status === 200) {
      const winners = await res.json();
      const count = res.headers.get('X-Total-Count') || '0';
      return { winners, count };
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

export const getWinner = async (carId: number): Promise<Winner | null> => {
  try {
    const res = await fetch(`${baseUrl}/winners/${carId}`);
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteWinner = async (carId: number):Promise<void> => {
  try {
    await fetch(`${baseUrl}/winners/${carId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const createWinner = async (winner: Winner): Promise<Winner | null> => {
  try {
    const res = await fetch(`${baseUrl}/winners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
    if (res.status === 201) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateWinner = async (carId: number, winner: CreateWinner): Promise<void> => {
  try {
    await fetch(`${baseUrl}/winners/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });
  } catch (err) {
    throw new Error(err);
  }
};
