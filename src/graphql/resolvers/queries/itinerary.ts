import { database } from '../../../apis/database';
import { tTicket } from '../../../typings/typings.d';

/*
sql: 
  select * from "flights" 
  where "flight_id" in (
    select "ticket_flights"."flight_id" 
    from "ticket_flights" inner join "tickets" 
    on "tickets"."ticket_no" = "ticket_flights"."ticket_no" 
    where "book_ref" = ?) 
  order by "flights"."scheduled_departure" asc
*/

export const fetchItinerary = (_: object, { bookRef }: tTicket) =>
  database('flights')
    .select(['*'])
    .whereIn('flightId', function () {
      void this.select('ticketFlights.flightId')
        .from('ticketFlights')
        .join('tickets', 'tickets.ticketNo', 'ticketFlights.ticketNo')
        .where({ bookRef });
    })
    .orderBy('flights.scheduledDeparture');
