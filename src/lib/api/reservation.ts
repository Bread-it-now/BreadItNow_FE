import { API_END_POINT } from '@/constants/api';
import { RESERVATION_QUERY_KEY } from '@/constants/queryKey';
import {
  ApprovedReservationInfo,
  CancelReservationInfo,
  CustomerReservation,
  CustomerReservationDetail,
  CustomerReservationStatus,
  OwnerReservationDetail,
  OwnerReservations,
  OwnerReservationStatusQuery,
  PageInfo,
} from '@/types/reservation';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { customFetch } from '../customFetch';

export const getCustomerReservations = async ({
  pageParam = 0,
  size = 10,
  reservationStatus,
}: {
  pageParam?: number;
  size?: number;
  reservationStatus: CustomerReservationStatus | 'ALL';
}): Promise<{ data: { reservations: CustomerReservation[]; pageInfo: PageInfo } }> => {
  const response = await customFetch(`/${API_END_POINT.CUSTOMER_RESERVATIONS(reservationStatus, pageParam, size)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

/** 추후에 무한스크롤로 수정 */
export const useCustomerReservations = ({
  reservationStatus,
  size = 10,
}: {
  reservationStatus: CustomerReservationStatus | 'ALL';
  pageParam?: number;
  size: number;
}) => {
  return useInfiniteQuery({
    queryKey: [...RESERVATION_QUERY_KEY.CUSTOMER_RESERVATION(reservationStatus)],
    queryFn: ({ pageParam = 0 }) => getCustomerReservations({ pageParam, size, reservationStatus }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pageInfo.isLast) return undefined;
      return lastPage.data.pageInfo.currPage + 1;
    },
    initialPageParam: 0,
  });
};

export const getCustomerReservationDetail = async (
  reservationId: number,
): Promise<{ data: CustomerReservationDetail }> => {
  const response = await customFetch(`/${API_END_POINT.CUSTOMER_RESERVATION_DETAIL(reservationId)}`, {
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
  const response = await customFetch(`/${API_END_POINT.CUSTOMER_RESERVATION_CANCEL(reservationId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason: '개인 사정으로 인한 취소' }),
  });

  if (!response.ok) throw new Error('Failed to patch');

  return response.json();
};

export const getOwnerReservations = async (
  reservationStatus: OwnerReservationStatusQuery,
  page: number = 0,
  size = 10,
): Promise<{ data: OwnerReservations }> => {
  const response = await customFetch(`/${API_END_POINT.OWNER_RESERVATIONS(reservationStatus, page, size)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

/** 추후에 무한스크롤로 수정 */
export const useOwnerReservations = ({
  reservationStatus,
  page,
  size,
}: {
  reservationStatus: OwnerReservationStatusQuery;
  page: number;
  size: number;
}) =>
  useQuery({
    queryKey: [...RESERVATION_QUERY_KEY.OWNER_RESERVATION(reservationStatus)],
    queryFn: () => getOwnerReservations(reservationStatus, page, size),
    select: (data: { data: OwnerReservations }) => data?.data,
  });

export const getOwnerReservationDetail = async (reservationId: number): Promise<{ data: OwnerReservationDetail }> => {
  const response = await customFetch(`/${API_END_POINT.OWNER_RESERVATION_DETAIL(reservationId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const useOwnerReservationDetail = (reservationId: number) =>
  useQuery({
    queryKey: [...RESERVATION_QUERY_KEY.OWNER_RESERVATION_DETAIL(reservationId)],
    queryFn: () => getOwnerReservationDetail(reservationId),
    select: (data: { data: OwnerReservationDetail }) => data?.data,
  });

export const changeReservationStatus = async ({
  reservationId,
  changeReservationInfo,
}: {
  reservationId: number;
  changeReservationInfo: ApprovedReservationInfo | CancelReservationInfo;
}): Promise<{ data: { status: 'SUCCESS' } }> => {
  const response = await fetch(`/${API_END_POINT.CHANGE_RESERVATION_STATUS(reservationId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...changeReservationInfo }),
  });

  if (!response.ok) throw new Error('Failed to patch');

  return response.json();
};
