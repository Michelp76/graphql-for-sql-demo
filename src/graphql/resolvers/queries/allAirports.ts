import { database } from '../../../apis/database';

export const allAirports = async () => {
  const airports = await database('airports').select(['*']);
  return airports;
};
