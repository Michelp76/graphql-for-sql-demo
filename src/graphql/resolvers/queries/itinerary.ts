import { database } from '../../../apis/database';

interface Props {
  reference: string;
}

/*
select ticket_flights.*,boarding_passes.* from ticket_flights
join tickets on ticket_flights.ticket_no = tickets.ticket_no
left join boarding_passes on boarding_passes.ticket_no = ticket_flights.ticket_no 
and boarding_passes.flight_id=ticket_flights.flight_id
where book_ref= ?
*/

export const fetchItinerary = (_: object, { reference: bookRef }: Props) =>
  database('ticketFlights')
    .join('tickets', 'tickets.ticketNo', 'ticket_flights.ticketNo')
    .join('flights', 'flights.flightId', 'ticketFlights.flightId')
    .leftJoin('boardingPasses', function () {
      this.on('boardingPasses.ticketNo', 'ticketFlights.ticketNo').on(
        'boardingPasses.flightId',
        'ticketFlights.flightId'
      );
    })
    .where({ bookRef })
    .orderBy('flights.scheduledDeparture')
    .select([
      'ticketFlights.*',
      'boardingPasses.boardingNo',
      'boardingPasses.seatNo',
    ]);
