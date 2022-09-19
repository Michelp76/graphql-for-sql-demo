import { tAirportName, tCity, tContext } from '../../../typings/typings.d';

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
    tickets: async ({ id }: { id: string }) =>
      database('tickets')
        .where({ bookRef: id })
        .columns({ id: 'ticketNo' })
        .select(),
  },
};