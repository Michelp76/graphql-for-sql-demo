import * as airports from './airports';
import * as bookings from './bookings';
import * as flights from './flights';
import * as itinerary from './itinerary';
import * as seats from './seats';
import * as tickets from './tickets';

export const queryResolvers = {
  Query: {
    ...airports,
    ...bookings,
    ...flights,    
    ...itinerary,
    ...seats,
    ...tickets,    
  },
};
