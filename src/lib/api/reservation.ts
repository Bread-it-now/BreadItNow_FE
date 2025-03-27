import { API_END_POINT } from '@/constants/api';
import { RESERVATION_QUERY_KEY } from '@/constants/queryKey';
import { CustomerReservationsResponse, CustomerReservationStatus } from '@/types/reservation';
import { useQuery } from '@tanstack/react-query';

export const getCustomerReservations = async (
  reservationStatus: CustomerReservationStatus,
  page: number = 0,
  size = 10,
) => {
  const response = await fetch(`/${API_END_POINT.CUSTOMER_RESERVATIONS(reservationStatus, page, size)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

/** 추후에 무한스크롤로 수정 */
export const useCustomerReservations = ({
  reservationStatus,
  page,
  size,
}: {
  reservationStatus: CustomerReservationStatus;
  page: number;
  size: number;
}) =>
  useQuery({
    queryKey: [...RESERVATION_QUERY_KEY.CUSTOMER_RESERVATION_QUERY_KEY(reservationStatus)],
    queryFn: () => getCustomerReservations(reservationStatus, page, size),
    select: (data: { data: CustomerReservationsResponse }) => data?.data,
  });
