import { ApolloError } from 'apollo-server-errors';
import { availableSeats } from './../resolvers/queries/seats';
import { database } from '../../apis/database';
import { findFlight } from '../helpers/findFlight';

interface Props {
  flightNo: string;
  departureDate: string;
  departureAirport: string;
  passengerName: string;
  newSeat: string;
}
export const changeSeat = async (
  _: object,
  { flightNo, departureDate, departureAirport, passengerName, newSeat }: Props
) => {
  let boardingPass;
  const flight = await findFlight({
    flightNo,
    departureDate,
    departureAirport,
  });
  if (flight) {
    const { flightId } = flight;
    const ticket = await database('ticketFlights')
      .join('tickets', 'ticketFlights.ticketNo', 'tickets.ticketNo')
      .where({ flightId, passengerName })
      .first();

    if (ticket) {
      const { ticketNo } = ticket;
      const oneSeat = await database('boarding_passes')
        .where({ flightId, ticketNo })
        .first();

      // get the list of seats that are available on this flight
      const openSeats = await availableSeats(null, {
        flightNo,
        departureDate,
        departureAirport,
      });

      // verify that the new seat is available
      const seatIsAvailable =
        openSeats.findIndex(
          ({ seatNo }: { seatNo: string }) => seatNo === newSeat
        ) >= 0;

      if (seatIsAvailable) {
        const trx = await database.transaction();
        try {
          if (oneSeat) {
            // already has a boarding pass, change it to the new seat
            [boardingPass] = await trx('boardingPasses')
              .update({ seatNo: newSeat })
              .where({ flightId, seatNo: oneSeat.seatNo })
              .returning(['*']);
          } else {
            //create a brand new boarding pass
            // the combination of flightId and boardingNo needs to be unique, pick the next highest number
            // ideally we'd pick the lowest unused integer but the max will do for now
            const max = await database('boardingPasses')
              .where({ flightId })
              .max('boardingNo')
              .first();
            const boardingNo = max ? max + 1 : 0;
            [boardingPass] = await trx('boardingPasses')
              .insert({ seatNo: newSeat, flightId, ticketNo, boardingNo })
              .returning(['*']);
          }
          await trx.commit();
          return boardingPass;
        } catch (error) {
          await trx.rollback();
          throw new ApolloError(
            `Error creating pass: ${error.message}`,
            'BOARDING_PASS_ERROR'
          );
        }
      } else
        throw new ApolloError(
          `Seat ${newSeat} is already assigned`,
          'SEAT_TAKEN'
        );
    } else
      throw new ApolloError(
        `Passenger ${passengerName} does not have a ticket on flight ${flightNo} leaving ${departureAirport} on ${departureDate}!`,
        'TICKET_NOT_FOUND'
      );
  } else throw new ApolloError(`No matching flight found!`, 'FLIGHT_NOT_FOUND');
};
