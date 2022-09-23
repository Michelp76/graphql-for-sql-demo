import * as airports from './airports';
import * as bookings from './bookings';
import * as itinerary from './itinerary';

export const queryResolvers = {
  Query: {
    ...airports,
    ...bookings,
    ...itinerary,
  },
};
