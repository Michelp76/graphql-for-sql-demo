import { database } from '../../apis/database';
import { ApolloError } from 'apollo-server-errors';

interface Props {
  ticketNo: string;
  bookRef: string;
  passengerId: string;
  passengerName: string;
  contactData: string;
}

export const createTicket = async (
  _: object,
  { ticketNo, bookRef, passengerId, passengerName, contactData }: Props
) => {
  let newTicket;
  const trx = await database.transaction();
  try {
    [newTicket] = await trx('tickets')
      .insert({ ticketNo, bookRef, passengerId, passengerName, contactData })
      .returning(['*']);

    await trx.commit();
    return newTicket;
  } catch (error) {
    await trx.rollback();
    throw new ApolloError(
      `Error creating ticket: ${error.message}`,
      'TICKET_ERROR'
    );
  }
};
