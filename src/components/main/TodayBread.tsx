import BellIcon from '../common/Icons/NotificationIcon';
import Tag from '../common/Tag';
interface Props {
  subTitle: string;
  title: string;
  reserveTimes: string[];
}

function TodayBread({ subTitle, title, reserveTimes }: Props) {
  return (
    <div className="bg-white px-4 py-5 h-[161px] w-[140px] shrink-0 rounded-2xl">
      <div className="w-5 h-5 flex items-center justify-center">
        <BellIcon color="#FF7651" fillColor="#FF7651" />
      </div>
      <div className="mt-3 mb-6 truncate">
        <div className="text-[13px] font-normal text-gray700">{subTitle}</div>
        <div className="text-gray900 font-semibold">{title}</div>
      </div>
      <div
        className="flex gap-1/2 overflow-x-scroll [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
        {/* TODO...TOKEN 이후 작업 */}
        {reserveTimes.map((time) => (
          <Tag key={time} label={time} type="time" />
        ))}
      </div>
    </div>
  );
}

export default TodayBread;
