import ApplicationConfig from '../Config/Application';
import {
  createDestinationPointFromDistance,
  getDistanceFromPoint,
} from '../Utils/map';

export interface User {
  id: string;
  name: string;
  coordinates: number[];
  distanceFromMe: number;
}

export const MY_USER_DATA: User = {
  id: '0',
  name: 'RR',
  coordinates: [],
  distanceFromMe: 0,
};

const defaultAzerbaijanCoordinate: number[] = [
  49.809272184135835, 40.39417428610733,
];

const usersCoordinates: number[][] = Array(ApplicationConfig.randomUserCount)
  .fill(ApplicationConfig.randomUserMaxDistanceKm)
  .map((_, index) =>
    createDestinationPointFromDistance(
      defaultAzerbaijanCoordinate,
      (ApplicationConfig.randomUserMaxDistanceKm /
        ApplicationConfig.randomUserCount) *
        index,
    ),
  );

const createUserFactory = (
  coordinates: number[],
  index: number,
  distanceFromMe: number,
): User => ({
  id: `${index + 1}`,
  name: `User ${index}`,
  coordinates,
  distanceFromMe,
});

export const getUsers = (userCoordinates: number[], radius: number): User[] => {
  return usersCoordinates
    .map((coordinates, index) => {
      const distanceFromMe = getDistanceFromPoint(coordinates, userCoordinates);
      return createUserFactory(coordinates, index, distanceFromMe);
    })
    .filter(user => user.distanceFromMe <= radius);
};
