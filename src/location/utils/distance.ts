import { Location } from '../interfaces/location.interface';

const PI = Math.PI;
const RADIUS_OF_EARTH = 6371e3;

const greatCircleDistance = (locA: Location, locB: Location) => {
  const lat1 = locA.latitude;
  const lng1 = locA.longitude;
  const lat2 = locB.latitude;
  const lng2 = locB.longitude;

  const dLat = getRadians(lat2) - getRadians(lat1);
  const dLng = getRadians(lng2) - getRadians(lng1);

  const φ1 = getRadians(lat1);
  const φ2 = getRadians(lat2);
  const Δφ = getRadians(lat2 - lat1);
  const Δλ = getRadians(lng2 - lng1);

  /**
   * Havershine's formula
   *
   */

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = RADIUS_OF_EARTH * c;

  // distance in kms.
  return d / 1000;
};

const getRadians = (coordinate) => {
  return (coordinate * PI) / 180;
};

export default greatCircleDistance;
