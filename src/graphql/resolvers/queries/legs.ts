import { database } from '../../../apis/database';

interface Props {
  flightNo: string;
  departureDate: string;
  departureAirport: string;
}

export const fetchLegs = (
  _: object,
  { flightNo, departureDate, departureAirport }: Props
) =>
  database('ticketFlights')
    .join('flights', 'flights.flightId', 'ticketFlights.flightId')
    .leftJoin('boardingPasses', 'boardingPasses.flightId', 'flights.flightId')
    .whereRaw(
      `date(scheduled_departure)='${departureDate}' and ticket_flights.ticket_no=boarding_passes.ticket_no`
    )
    .andWhere({ departureAirport, flightNo })
    .select(['*']);
