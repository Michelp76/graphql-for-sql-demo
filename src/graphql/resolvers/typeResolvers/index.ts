import {
  tAirport,
  tBooking,
  tContext,
  tFlight,
  tPassenger,
  tTicket,
  tTicketedPassenger,
} from '../../../typings/typings.d';

import { Flight } from './Flight';
import { database } from '../../../apis/database';

export const typeResolvers = {
  Airport: {
    airportName: ({ airportName }: tAirport, _: object, { req }: tContext) =>
      airportName[req.language],
    city: ({ city }: tAirport, _: object, { req }: tContext) =>
      city[req.language],
  },

  BoardingPass: {
    flight: ({ flightId }: { flightId: string }) =>
      database('flights').where({ flightId }).first(),
    ticket: ({ ticketNo }: { ticketNo: string }) =>
      database('tickets').where({ ticketNo }).first(),
  },

  Booking: {
    bookedAt: ({ bookDate: bookedAt }: tBooking) => bookedAt,
    tickets: ({ id: bookRef }: { id: string }) =>
      database('tickets')
        .where({ bookRef })
        .columns({ id: 'ticketNo' }, '*')
        .select(),
  },

  Flight,

  Ticket: {
    flights: ({ ticketNo }: tTicket) =>
      database('flights')
        .join('ticketFlights', 'flights.flightId', 'ticketFlights.flightId')
        .where({ ticketNo })
        .select(['flights.*'])
        .orderBy('scheduledDeparture'),
    passenger: ({
      passengerId: id,
      passengerName: name,
      contactData: { email, phone },
    }: tPassenger) => ({ id, name, email, phone }),
  },

  TicketedPassenger: {
    ticket: ({ ticketNo }: tTicketedPassenger) =>
      database('tickets').where({ ticketNo }).first(),
    boardingPass: async ({
      ticketNo,
      flightId,
      boardingNo,
      seatNo,
    }: tTicketedPassenger) => {
      if (boardingNo && seatNo) return { boardingNo, seatNo };
      else if (ticketNo && flightId) {
        const bp = await database('boardingPasses')
          .where({ ticketNo, flightId })
          .first();
        if (bp)
          return {
            boardingNo: bp.boardingNo,
            seatNo: bp.seatNo,
          };
      }
    },
    flight: ({ flightId }: tFlight) =>
      database('flights').where({ flightId }).select(['*']).first(),
  },
};
