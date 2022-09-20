import {
  tAirportName,
  tCity,
  tContext,
  tPassenger,
  tTicket,
} from '../../../typings/typings.d';

import { database } from '../../../apis/database';

interface tFlight {
  flightId: number;
  flightNo: string;
  aircraftCode: string;
  actualDeparture: Date;
  actualArrival: Date;
  scheduledDeparture: Date;
  scheduledArrival: Date;
  status: string;
}

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
  Leg: {
    flight: ({
      flightId: id,
      flightNo,
      scheduledArrival,
      scheduledDeparture,
      actualArrival,
      actualDeparture,
      status,
    }: tFlight) => {
      return {
        id,
        flightNo,
        actual: { departure: actualDeparture, arrival: actualArrival },
        scheduled: { departure: scheduledDeparture, arrival: scheduledArrival },
        status,
      };
    },
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
