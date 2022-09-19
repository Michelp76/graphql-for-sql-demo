import {
  tAirportName,
  tCity,
  tContext,
  tPassenger,
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
    tickets: ({ id }: { id: string }) =>
      database('tickets')
        .where({ bookRef: id })
        .columns({ id: 'ticketNo' }, '*')
        .select(),
  },
  Ticket: {
    passenger: ({
      passengerId: id,
      passengerName: name,
      contactData: { email, phone },
    }: tPassenger) => ({ id, name, email, phone }),
  },
};
