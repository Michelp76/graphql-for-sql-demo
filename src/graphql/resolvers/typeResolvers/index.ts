import {
  tAirport,
  tContext,
  tFlight,
  tPassenger,
} from '../../../typings/typings.d';

import { database } from '../../../apis/database';

export const typeResolvers = {
  Airport: {
    airportName: ({ airportName }: tAirport, _: object, { req }: tContext) =>
      airportName[req.language],
    city: ({ city }: tAirport, _: object, { req }: tContext) =>
      city[req.language],
  },

  Booking: {
    tickets: ({ id: bookRef }: { id: string }) =>
      database('tickets')
        .where({ bookRef })
        .columns({ id: 'ticketNo' }, '*')
        .select(),
  },

  BookingLeg: {
    flight: ({ flightId }: { flightId: string }) =>
      database('flights').where({ flightId }).first(),
    ticket: ({ ticketNo }: { ticketNo: string }) =>
      database('tickets').where({ ticketNo }).first(),
  },

  Flight: {
    actual: ({ actualArrival: arrive, actualDeparture: depart }: tFlight) => ({
      arrive,
      depart,
    }),
    aircraft: ({ aircraftCode }: tFlight) =>
      database('aircrafts').where({ aircraftCode }).first(),
    arrivalAirport: ({ arrivalAirport: airportCode }: tFlight) =>
      database('airportsData').where({ airportCode }).first(),
    departureAirport: ({
      departureAirport: airportCode,
    }: {
      departureAirport: string;
    }) => database('airportsData').where({ airportCode }).first(),
    id: ({ flightId: id }: tFlight) => id,
    scheduled: ({
      scheduledArrival: arrive,
      scheduledDeparture: depart,
    }: tFlight) => ({ arrive, depart }),
  },

  Ticket: {
    passenger: ({
      passengerId: id,
      passengerName: name,
      contactData: { email, phone },
    }: tPassenger) => ({ id, name, email, phone }),
  },
};
