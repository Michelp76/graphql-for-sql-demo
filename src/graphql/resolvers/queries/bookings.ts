import { database } from '../../../apis/database';

interface tReference {
  reference: string;
}

export const oneBooking = (_: object, { reference: bookRef }: tReference) =>
  database('bookings')
    .where({ bookRef })
    .columns(
      { id: 'bookRef' },
      { reference: 'bookRef' },
      { bookedAt: 'bookDate' },
      '*'
    )
    .first();
