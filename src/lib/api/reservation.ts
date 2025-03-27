import { API_END_POINT } from '@/constants/api';
import { RESERVATION_QUERY_KEY } from '@/constants/queryKey';
import {
  CustomerReservationDetail,
  CustomerReservationsResponse,
  CustomerReservationStatus,
} from '@/types/reservation';
import { useQuery } from '@tanstack/react-query';

export const getCustomerReservations = async (
  reservationStatus: CustomerReservationStatus | 'ALL',
  page: number = 0,
  size = 10,
): Promise<{ data: CustomerReservationsResponse }> => {
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
  reservationStatus: CustomerReservationStatus | 'ALL';
  page: number;
  size: number;
}) =>
  useQuery({
    queryKey: [...RESERVATION_QUERY_KEY.CUSTOMER_RESERVATION(reservationStatus)],
    queryFn: () => getCustomerReservations(reservationStatus, page, size),
    select: (data: { data: CustomerReservationsResponse }) => data?.data,
  });

export const getCustomerReservationDetail = async (
  reservationId: number,
): Promise<{ data: CustomerReservationDetail }> => {
  const response = await fetch(`/${API_END_POINT.CUSTOMER_RESERVATION_DETAIL(reservationId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const useCustomerReservationDetail = (reservationId: number) =>
  useQuery({
    queryKey: [...RESERVATION_QUERY_KEY.CUSTOMER_RESERVATION_DETAIL(reservationId)],
    queryFn: () => getCustomerReservationDetail(reservationId),
    select: (data: { data: CustomerReservationDetail }) => data?.data,
  });

export const cancelCustomerReservation = async (
  reservationId: number,
): Promise<{ data: CustomerReservationDetail }> => {
  const response = await fetch(`/${API_END_POINT.CUSTOMER_RESERVATION_CANCEL(reservationId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason: '개인 사정으로 인한 취소' }),
  });

  if (!response.ok) throw new Error('Failed to patch');

  return response.json();
};
