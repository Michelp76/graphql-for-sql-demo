import { database } from '../../../apis/database';

interface tReference {
  reference: string;
}

export const oneBooking = async (
  _: object,
  { reference: bookRef }: tReference
) =>
  database('bookings')
    .where({ bookRef })
    .columns(
      { id: 'bookRef' },
      { reference: 'bookRef' },
      { bookedAt: 'bookDate' },
      '*'
    )
    .first();
