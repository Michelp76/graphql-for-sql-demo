import { database } from '../../../apis/database';

interface Props {
  flightNo: string;
  departureDate: string;
  departureAirport: string;
  fareConditions?: string;
}

/*
SELECT *
FROM "seats"
INNER JOIN "flights" ON "flights"."aircraft_code" = "seats"."aircraft_code"
WHERE "seat_no" not in
		(SELECT "boarding_passes"."seat_no"
			FROM "boarding_passes"
			INNER JOIN "flights" ON "boarding_passes"."flight_id" = "flights"."flight_id"
			WHERE DATE(SCHEDULED_DEPARTURE) = '2017-07-27'
				AND "flight_no" = 'PG0013'
				AND "departure_airport" = 'AER')
	AND DATE(SCHEDULED_DEPARTURE) = '2017-07-27'
	AND "flight_no" = 'PG0013'
	AND "departure_airport" = 'AER'
	AND "fare_conditions" = 'Business'
ORDER BY "flights"."scheduled_departure" ASC
*/

export const availableSeats = async (
  _: object,
  { flightNo, departureDate, departureAirport, fareConditions }: Props
) => {
  // first find the individual flight record based
  const flight = await database('flights')
    .whereRaw(
      `date(scheduled_departure)='${departureDate}' and flight_no='${flightNo}' and departure_airport='${departureAirport}'`
    )
    .first();

  // if it exists, find the seats that are not assigned boarding passes
  if (flight) {
    const { flightId, aircraftCode } = flight;
    const seatClause1 = { flightId };
    const seatClause2 = { aircraftCode };
    if (fareConditions) {
      seatClause1['fareConditions'] = fareConditions;
      seatClause2['fareConditions'] = fareConditions;
    }
    const seats = await database('seats')
      .whereNotIn('seatNo', function () {
        void this.select(['seatNo']).from('boardingPasses').where(seatClause1);
      })
      .andWhere(seatClause2)
      .select(['seats.*'])
      .orderBy('seatNo');
    return seats;
  }
};
