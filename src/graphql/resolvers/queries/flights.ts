import { database } from '../../../apis/database';

interface Props {
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
}

export const getListOfFlights = async (
  _: object,
  { departureCity, arrivalCity, departureTime, arrivalTime }: Props
) =>
  // https://stackoverflow.com/a/36374328
  database('flights')
    .select(['*'])
    .join('airportsData as ds1', 'ds1.airportCode', 'flights.departureAirport')
    .join('airportsData as ds2', 'ds2.airportCode', 'flights.arrivalAirport')
    .where('flights.status', 'Scheduled')
    .whereRaw(`ds1.city->'en' @> '${JSON.stringify(departureCity)}'`)
    .andWhereRaw(`ds2.city->'en' @> '${JSON.stringify(arrivalCity)}'`)
    .andWhereRaw('??::date = ?', ['scheduled_departure', departureTime])
    .andWhereRaw('??::date = ?', ['scheduled_arrival', arrivalTime])
    .orderBy('flights.scheduledDeparture')