'use client';

import { getDateFormat } from '@/utils/date';
import { useOwnerReservationDetail } from '@/lib/api/reservation';
import { OWNER_RESERVATION_STATUS } from '@/components/reservation/ownerReservationCard/OwnerReservationCard';

const ReservationInfo = ({ title, info }: { title: string; info: string }) => {
  return (
    <p className="flex justify-between w-full h-5 text-title-content-s">
      <span className="font-normal text-gray500">{title}</span>
      <span className="font-medium text-gray900">{info}</span>
    </p>
  );
};

export default function Page() {
  const { id = 1 } = useParams();

  const { data: reservationDetail } = useOwnerReservationDetail(Number(id));

  return (
    <>
      {reservationDetail && (
        <>
          {/* 접수 마감 시간 Section 추가 필요 */}
          <section className="flex items-center p-5 gap-5 w-full">
            <p className="w-full text-title-content-m text-gray900">
              {OWNER_RESERVATION_STATUS[reservationDetail.status]}
            </p>
            <div className="flex items-center gap-[0.375rem] w-full h-full text-title-content-xs font-normal text-gray500">
              <p className="w-full text-right text-nowrap">예약번호 {reservationDetail.reservationNumber}</p>
            </div>
          </section>
          <section className="flex flex-col items-start gap-5 px-5 py-[30px] w-full bg-white">
            <p className="text-title-content-m text-gray900">예약 정보</p>
            <div className="flex flex-col items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-4 w-full">
                <ReservationInfo title="고객 닉네임" info={reservationDetail.consumerNickname} />
                <ReservationInfo title="고객 전화번호" info={reservationDetail.consumerPhone} />
                {reservationDetail.status !== 'WAITING' && (
                  <ReservationInfo
                    title="예약일시"
                    info={getDateFormat(reservationDetail.reservationDate, { showDay: false })}
                  />
                )}
                {reservationDetail.status === 'PAYMENT_COMPLETED' && reservationDetail.approveDate && (
                  <ReservationInfo
                    title="접수일시"
                    info={getDateFormat(reservationDetail.approveDate, { showDay: false })}
                  />
                )}
                {reservationDetail.status === 'PAYMENT_COMPLETED' && reservationDetail.paymentDate && (
                  <ReservationInfo
                    title="결제일시"
                    info={getDateFormat(reservationDetail.paymentDate, { showDay: false })}
                  />
                )}
              </div>
              {reservationDetail.status !== 'PAYMENT_COMPLETED' && (
                <div className="flex flex-col items-start gap-[10px] p-3 w-full bg-gray50 rounded-lg">
                  <div className="flex justify-center gap-[6px] w-full text-title-content-xs text-gray500">
                    <p>
                      {reservationDetail.status === 'WAITING'
                        ? '예약일시'
                        : reservationDetail.status === 'APPROVED' || reservationDetail.status === 'PARTIAL_APPROVED'
                          ? '접수일시'
                          : reservationDetail.status === 'CUSTOMER_CANCELED'
                            ? '고객'
                            : '판매자'}
                    </p>
                    <p className="font-normal">
                      {reservationDetail.status === 'WAITING'
                        ? getDateFormat(reservationDetail.reservationDate, { showDay: false })
                        : reservationDetail.status === 'APPROVED' || reservationDetail.status === 'PARTIAL_APPROVED'
                          ? getDateFormat(reservationDetail.approveDate || '', { showDay: false })
                          : reservationDetail.status === 'CUSTOMER_CANCELED'
                            ? '픽업 기간 내 미수령으로 예약 취소'
                            : '사정으로 예약 취소'}
                    </p>
                  </div>
                  {reservationDetail.status === 'OWNER_REJECTED' && (
                    <>
                      <div className="w-full border bg-100" />
                      <div className="flex justify-center w-full text-title-content-xs text-gray500 bg-gray50 rounded-lg">
                        <p>사유</p>
                        {reservationDetail.cancelDetail && (
                          <p className="font-normal">{reservationDetail.cancelDetail}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
