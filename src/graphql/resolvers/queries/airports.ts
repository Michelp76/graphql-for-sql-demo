import { database } from '../../../apis/database';

export const allAirports = () =>
  database('airports_data')
    .columns({ id: 'airportCode' }, '*')
    .orderBy('airportCode')
    .select();
