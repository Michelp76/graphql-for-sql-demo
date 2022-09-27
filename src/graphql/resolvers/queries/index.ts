import * as airports from './airports';
import * as bookings from './bookings';
import * as itinerary from './itinerary';
import * as seats from './seats';

export const queryResolvers = {
  Query: {
    ...airports,
    ...bookings,
    ...itinerary,
    ...seats,
  },
};
