import { ApolloError } from 'apollo-server-errors';
import { database } from '../../apis/database';

interface Props {
  flightNo: string;
  departureDate: string;
  departureAirport: string;
}

export const findFlight = async ({
  flightNo,
  departureDate,
  departureAirport,
}: Props) => {
  // validate inputs
  if (
    flightNo.match(/^[A-Z]{2}[0-9]{4}$/g) &&
    departureDate.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g) &&
    departureAirport.match(/^[A-Z]{3}$/g)
  )
    return database('flights')
      .whereRaw(
        `date(scheduled_departure)='${departureDate}' and flight_no='${flightNo}' and departure_airport='${departureAirport}'`
      )
      .first();
  else throw new ApolloError('Invalid parameters!');
};
