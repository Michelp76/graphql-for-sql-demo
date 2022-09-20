import * as airports from './airports';
import * as bookings from './bookings';
import * as legs from './legs';

export const queryResolvers = {
  Query: {
    ...airports,
    ...bookings,
    ...legs,
  },
};
