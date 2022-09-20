import {
  tAirportName,
  tCity,
  tContext,
  tFlight,
  tPassenger,
  tTicket,
} from '../../../typings/typings.d';

import { database } from '../../../apis/database';

export const typeResolvers = {
  Airport: {
    airportName: (
      { airportName }: tAirportName,
      _: object,
      { req }: tContext
    ) => airportName[req.language],
    city: ({ city }: tCity, _: object, { req }: tContext) => city[req.language],
  },

  Booking: {
    tickets: ({ id: bookRef }: { id: string }) =>
      database('tickets')
        .where({ bookRef })
        .columns({ id: 'ticketNo' }, '*')
        .select(),
  },

  Flight: {
    actual: ({
      actualArrival: arrival,
      actualDeparture: departure,
    }: tFlight) => ({ actual: { arrival, departure } }),
    aircraft: ({ aircraftCode }: tFlight) =>
      database('aircrafts').where({ aircraftCode }).first(),
    arrivalAirport: ({ arrivalAirport: airportCode }: tFlight) =>
      database('airports').where({ airportCode }).first(),
    departureAirport: ({
      departureAirport: airportCode,
    }: {
      departureAirport: string;
    }) => database('airports').where({ airportCode }).first(),
    id: ({ flightId: id }: tFlight) => id,
    scheduled: ({
      scheduledArrival: arrival,
      scheduledDeparture: departure,
    }: tFlight) => ({ scheduled: { arrival, departure } }),
  },

  Leg: {
    flight: ({ flightId }: tFlight) =>
      database('flights').where({ flightId }).first(),
    ticket: ({ ticketNo }: tTicket) =>
      database('tickets').where({ ticketNo }).first(),
  },

  Ticket: {
    passenger: ({
      passengerId: id,
      passengerName: name,
      contactData: { email, phone },
    }: tPassenger) => ({ id, name, email, phone }),
  },
};
