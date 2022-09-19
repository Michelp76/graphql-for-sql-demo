import { database } from '../../../apis/database';

export const allAirports = async () =>
  database('airports_data')
    .columns({ id: 'airportCode' }, '*')
    .orderBy('airportCode')
    .select();
