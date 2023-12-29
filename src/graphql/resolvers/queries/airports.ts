import { database } from '../../../apis/database';
import haversine from 'haversine';

interface Props {
  departureAirport: string;
  arrivalAirport: string;
}

export const allAirports = () =>
  database('airports_data')
    .columns({ id: 'airportCode' }, '*')
    .orderBy('airportCode')
    .select();

export const measureDistance = async (
  _: object,
  { departureAirport, arrivalAirport }: Props
) => {
  // TODO : Haversine formula with : https://www.npmjs.com/package/@types/haversine
  const coords_departure = await database('airports_data')
    .columns({ id: 'airportCode' }, 'coordinates')
    .orderBy('airportCode')
    .where('airportCode', departureAirport)
    .first();

  const coords_arrival = await database('airports_data')
    .columns({ id: 'airportCode' }, 'coordinates')
    .orderBy('airportCode')
    .where('airportCode', arrivalAirport)
    .first();

  const departure = {
    latitude: coords_departure.coordinates.x,
    longitude: coords_departure.coordinates.y,
  };

  const arrival = {
    latitude: coords_arrival.coordinates.x,
    longitude: coords_arrival.coordinates.y,
  };

  const calculatedDistance = haversine(departure, arrival, {unit: 'km'});
  return calculatedDistance.toFixed(2) + ' km';
};
