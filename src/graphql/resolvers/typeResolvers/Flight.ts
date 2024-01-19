import { tBooking, tFlight } from '../../../typings/typings.d';
import { database } from '../../../apis/database';

export const Flight = {
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

  ticketedPassengers: ({ flightId }: tFlight, { bookRef }: tBooking) => {
    const whereClause = { 'ticketFlights.flightId': flightId };
    if (bookRef) whereClause['bookRef'] = bookRef;
    return database('ticketFlights')
      .join('tickets', 'tickets.ticketNo', 'ticket_flights.ticketNo')
      .join('flights', 'ticketFlights.flightId', 'flights.flightId')
      .leftJoin('boardingPasses', function () {
        this.on('boardingPasses.ticketNo', 'ticketFlights.ticketNo').on(
          'boardingPasses.flightId',
          'ticketFlights.flightId'
        );
      })
      .where(whereClause)
      .orderBy(['flights.scheduledDeparture', 'tickets.passengerName'])
      .select(['ticketFlights.*', 'boardingPasses.*']);
  },

  id: ({ flightId: id }: tFlight) => id,

  scheduled: ({
    scheduledArrival: arrive,
    scheduledDeparture: depart,
  }: tFlight) => ({ arrive, depart }),

  price: async ({ flightId }: tFlight) =>
    database('ticketFlights')
      .where({ flightId })
      .limit(1)
      .pluck('amount')  // Récupère 1 seule colonne
      .then(function (amount) {
        return amount.toString();  // "Float cannot represent non numeric value: [\"5300.00\"]" --> rajouter .toString()
      }),
};
