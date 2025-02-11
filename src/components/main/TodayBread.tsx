interface Props {
  subTitle: string;
  title: string;
  reserveTimes: string[];
}

function TodayBread({ subTitle, title, reserveTimes }: Props) {
  return (
    <div className="bg-white px-4 py-5 h-[161px] w-[140px] shrink-0 rounded-2xl">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 14H13V16.5C13 17.8807 11.8807 19 10.5 19C9.11929 19 8 17.8807 8 16.5V14Z"
          fill="#FF7651"
        />
        <path
          d="M13.3125 15H7.6875H13.3125ZM13.3125 15H16.6781C17.0372 15 17.2172 15 17.3625 14.948C17.4992 14.8986 17.6233 14.8163 17.7253 14.7074C17.8272 14.5984 17.9043 14.4659 17.9503 14.32C18 14.164 18 13.972 18 13.586C18 13.417 18 13.333 17.9869 13.252C17.9637 13.1006 17.9082 12.9569 17.8247 12.832C17.7797 12.765 17.7234 12.705 17.6119 12.586L17.2462 12.196C17.1879 12.1337 17.1417 12.0598 17.1102 11.9785C17.0786 11.8972 17.0624 11.81 17.0625 11.722L17.0625 9C17.0625 8.08075 16.8928 7.1705 16.563 6.32122C16.2332 5.47194 15.7498 4.70026 15.1404 4.05025C14.531 3.40024 13.8076 2.88463 13.0114 2.53284C12.2152 2.18106 11.3618 2 10.5 2C9.6382 2 8.78484 2.18106 7.98864 2.53284C7.19244 2.88463 6.469 3.40024 5.85961 4.05025C5.25023 4.70026 4.76684 5.47194 4.43704 6.32122C4.10724 7.1705 3.9375 8.08075 3.9375 9L3.9375 11.722C3.93756 11.81 3.92136 11.8972 3.88983 11.9785C3.8583 12.0598 3.81206 12.1337 3.75375 12.196L3.38813 12.586C3.27563 12.706 3.22031 12.765 3.17625 12.831C3.0919 12.956 3.03575 13.1001 3.01219 13.252C3 13.332 3 13.417 3 13.586C3 13.972 3 14.164 3.04875 14.32C3.095 14.4661 3.17229 14.5988 3.27459 14.7077C3.37688 14.8167 3.50141 14.8989 3.63844 14.948C3.78375 15 3.96281 15 4.32187 15H7.6875"
          fill="#FF7651"
        />
        <rect x="7" y="15" width="7" height="1" fill="white" />
      </svg>
      <div className="mt-3 mb-6">
        <div className="text-xs font-normal text-gray-500">{subTitle}</div>
        <div className="text-black font-semibold">{title}</div>
      </div>
      <div
        className="flex gap-1/2 overflow-x-scroll [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* TODO...TOKEN 이후 작업 */}
        {reserveTimes.map((time) => (
          <div key={time} className="text-xs font-normal text-gray-500">
            {time}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayBread;
