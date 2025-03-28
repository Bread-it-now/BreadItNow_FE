'use client';

import { getDateFormat } from '@/utils/date';
import { useParams } from 'next/navigation';
import ReservationProduct from '@/components/reservation/reservationproduct/ReservationProduct';
import Stack from '@/components/common/stack/Stack';
import { comma } from '@/utils/comma';
import Button from '@/components/button/Button';
import { changeReservationStatus, useOwnerReservationDetail } from '@/lib/api/reservation';
import { OWNER_RESERVATION_STATUS } from '@/components/reservation/ownerReservationCard/OwnerReservationCard';
import useReservationOptionBottomSheet from '@/hooks/useReservationOptionBottomSheet';
import BottomSheet from '@/components/bottomsheet/Bottomsheet';
import { useQueryClient } from '@tanstack/react-query';
import { RESERVATION_QUERY_KEY } from '@/constants/queryKey';
import ProductQuantity from '@/components/productquantity/ProductQuantity';

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
  const queryClient = useQueryClient();

  const { data: reservationDetail } = useOwnerReservationDetail(Number(id));
  const {
    isOpen: isReservationOptionBottomsheetOpen,
    reservationOptionStep,
    close: closeReservationOptionBottomsheet,
    open: openReservationOptionBottomsheet,
    selectedReservationStatus,
    handleReservationOptionStep,
    handleSelectedReservationStatus,
  } = useReservationOptionBottomSheet();

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
              <div className="flex flex-col items-start gap-[10px] w-full">
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
                        <div className="w-full border bg-gray100" />
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
                {reservationDetail.status === 'WAITING' && (
                  <p className="text-title-content-2xs font-medium text-gray500">
                    *접수기한 내 미접수 시 예약이 자동 취소됩니다. (30분)
                  </p>
                )}
              </div>
            </div>
          </section>
          {(reservationDetail.status === 'PARTIAL_APPROVED' ||
            reservationDetail.status === 'OWNER_REJECTED' ||
            reservationDetail.status === 'CUSTOMER_CANCELED') && (
            <section className="flex flex-col items-start p-5 gap-5 w-full rounded-2xl bg-white">
              <p className="w-full text-title-content-m text-gray900">예약 취소 상품</p>
              <div className="flex flex-col gap-[1.875rem] w-full">
                <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}></Stack>
              </div>
            </section>
          )}
          {(reservationDetail.status === 'APPROVED' ||
            reservationDetail.status === 'WAITING' ||
            reservationDetail.status === 'PARTIAL_APPROVED' ||
            reservationDetail.status === 'PAYMENT_COMPLETED') && (
            <section className="flex flex-col items-start p-5 gap-5 w-full rounded-2xl bg-white">
              <p className="w-full text-title-content-m text-gray900">예약 상품</p>
              <div className="flex flex-col gap-[1.875rem] w-full">
                <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
                  {reservationDetail.reservationItems.map((product) => (
                    <ReservationProduct key={`${product.productId}-${product.name}`} {...product} />
                  ))}
                </Stack>
              </div>
              <div className="flex items-center p-5 gap-5 w-full h-[66px] rounded-lg bg-gray50">
                <span className="text-title-content-s text-gray900 w-full">
                  총 <span className="text-primary">{reservationDetail.reservationItems.length}</span>건 상품 금액
                </span>
                <span className="text-right text-title-content-l text-primary w-full">
                  {comma(reservationDetail.totalPrice)}원
                </span>
              </div>
            </section>
          )}
          {(reservationDetail.status === 'WAITING' || reservationDetail.status === 'APPROVED') && (
            <section className="flex items-start p-5 w-full gap-2 bg-white shadow-[0px-1px-20px-[rgba(28,30,32,0.08)] z-9">
              <Button
                variant="default"
                onClick={() => {
                  openReservationOptionBottomsheet();
                }}
                fullWidth
                className="font-semibold">
                예약거부
              </Button>
              {reservationDetail.status === 'WAITING' && (
                <Button
                  variant="primary"
                  onClick={() => {
                    openReservationOptionBottomsheet();
                  }}
                  fullWidth>
                  접수
                </Button>
              )}
            </section>
          )}
          <BottomSheet
            title={
              reservationOptionStep === 'QUANTITY_STEP'
                ? '부분 접수할 상품과 수량 선택'
                : reservationOptionStep === 'REASON_STEP'
                  ? `${selectedReservationStatus === 'OWNER_REJECTED' ? '예약 취소' : '부분 접수'}사유`
                  : undefined
            }
            isOpen={isReservationOptionBottomsheetOpen}
            onClose={() => {
              closeReservationOptionBottomsheet();
              handleReservationOptionStep('APPOVE_STEP');
              handleSelectedReservationStatus('APPROVED');
            }}
            onConfirm={reservationOptionStep === 'QUANTITY_STEP' ? () => {} : undefined}
            cancelText={reservationOptionStep === 'QUANTITY_STEP' ? '취소' : undefined}
            confirmText={reservationOptionStep === 'QUANTITY_STEP' ? '다음' : undefined}
            cancelBtnFullWidth
            bgColor={reservationOptionStep === 'APPOVE_STEP' ? 'bg-gray50' : undefined}
            className={reservationOptionStep === 'APPOVE_STEP' ? 'mb-0 pb-5' : undefined}>
            <>
              {reservationOptionStep === 'APPOVE_STEP' && (
                <div className="flex flex-col items-start gap-[10px] w-full">
                  <div
                    className="flex p-5 w-full bg-white rounded-[10px] text-title-subtitle font-medium hover:cursor-pointer"
                    onClick={() => {
                      /** 예약 상태 변경 api 호출 */
                      changeReservationStatus({
                        reservationId: reservationDetail.reservationId,
                        changeReservationInfo: {
                          status: 'APPROVED',
                          reservationItems: reservationDetail.reservationItems.map((product) => ({
                            productId: product.productId,
                            quantity: product.quantity,
                          })),
                        },
                      });
                      closeReservationOptionBottomsheet();
                      queryClient.invalidateQueries({
                        queryKey: [...RESERVATION_QUERY_KEY.OWNER_RESERVATION_DETAIL(reservationDetail.reservationId)],
                      });
                    }}>
                    접수
                  </div>
                  <div
                    className="flex p-5 w-full bg-white rounded-[10px] text-title-subtitle font-medium hover:cursor-pointer"
                    onClick={() => {
                      handleSelectedReservationStatus('PARTIAL_APPROVED');
                      handleReservationOptionStep('QUANTITY_STEP');
                      closeReservationOptionBottomsheet();
                      openReservationOptionBottomsheet();
                    }}>
                    부분 접수
                  </div>
                </div>
              )}
              {selectedReservationStatus === 'PARTIAL_APPROVED' && reservationOptionStep === 'QUANTITY_STEP' && (
                <Stack divider={<div className="w-full h-[1px] bg-gray100"></div>}>
                  {reservationDetail.reservationItems.map((item) => (
                    <ProductQuantity
                      key={item.productId}
                      id={item.productId}
                      name={item.name}
                      quantity={item.quantity}
                    />
                  ))}
                </Stack>
              )}
            </>
          </BottomSheet>
        </>
      )}
    </>
  );
}
