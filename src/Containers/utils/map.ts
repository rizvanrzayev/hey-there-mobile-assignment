import {Feature} from '@turf/turf';
import {User} from '../../Data/user';
import * as turf from '@turf/turf';
/**
 * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in a given polygon.
 * This runs in O(n) where n is the number of edges of the polygon.
 *
 * @param {Array} polygon an array representation of the polygon where polygon[i][0] is the x Value of the i-th point and polygon[i][1] is the y Value.
 * @param {Array} point   an array representation of the point where point[0] is its x Value and point[1] is its y Value
 * @return {boolean} whether the point is in the polygon (not on the edge, just turn < into <= and > into >= for that)
 */
export const pointInPolygon = (
  polygon: number[][],
  point: number[],
): boolean => {
  let odd = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
    if (
      polygon[i][1] > point[1] !== polygon[j][1] > point[1] &&
      point[0] <
        ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) /
          (polygon[j][1] - polygon[i][1]) +
          polygon[i][0]
    ) {
      odd = !odd;
    }
    j = i;
  }
  return odd;
};

export const createUserPinFeature = (user: User): Feature => ({
  type: 'Feature',
  id: user.id,
  properties: {},
  geometry: {
    type: 'Point',
    coordinates: user.coordinates,
  },
});

const DEFAULT_UNITS = 'kilometers';

export const createDestinationPointFromDistance = (
  point: number[],
  distanceKm: number,
): number[] => {
  const turfPoint = turf.point(point);
  const distance = distanceKm;
  const bearing = Math.floor(Math.random() * 360);
  const options: turf.helpers.Properties = {
    units: DEFAULT_UNITS,
  };
  const destination = turf.destination(turfPoint, distance, bearing, options);
  return destination.geometry.coordinates;
};

export const getDistanceFromPoint = (from: number[], to: number[]): number => {
  const fromTurf = turf.point(from);
  const toTurf = turf.point(to);
  const options: turf.helpers.Properties = {units: DEFAULT_UNITS};

  const distance = turf.distance(fromTurf, toTurf, options);
  return distance;
};
