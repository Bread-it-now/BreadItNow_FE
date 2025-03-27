import { API_END_POINT } from '@/constants/api';
import { CustomerReservationStatus } from '@/types/reservation';

export const getCustomerReservations = async (
  reservationStatus: CustomerReservationStatus,
  page: number = 0,
  size = 10,
) => {
  const response = await fetch(`/${API_END_POINT.CUSTOMER_RESERVATIONS(reservationStatus, page, size)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch bakeryInfo');

  return response.json();
};
