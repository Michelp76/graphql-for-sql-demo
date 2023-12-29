import { database } from '../../../apis/database';

// Broken : ne marche pas
export const allTickets = () =>
  database('tickets')
    .columns('ticketNo')
    .select();