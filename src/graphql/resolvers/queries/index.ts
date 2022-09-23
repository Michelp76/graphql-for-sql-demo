import * as airports from './airports';
import * as bookings from './bookings';

export const queryResolvers = {
  Query: {
    ...airports,
    ...bookings,
  },
};
