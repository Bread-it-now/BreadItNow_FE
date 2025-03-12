import OperatingStatusCard from '@/components/operatingstatuscard/OperatingStatusCard';

/** 로그인 시 가져온 bakeryId를 통해 빵집 정보 호출 */

export default function Page() {
  const name = '소급 한 꼬집';

  return (
    <>
      <section className="w-full bg-white rounded-b-[0.625rem]">
        <OperatingStatusCard name={name} operatingStatus="TEMPORARY_CLOSED" type="GENERAL" />
      </section>
      <section className="w-full bg-white rounded-[0.625rem]">
        <OperatingStatusCard operatingStatus="TEMPORARY_CLOSED" type="TEMPORARY" />
      </section>
    </>
  );
}
