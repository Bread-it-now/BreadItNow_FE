/** ISO DATE 문자열로부터 날짜(ex. 2025.02.01)를 추출하는 함수 */
export const getDate = (isoDateStr: string) => {
  const date = new Date(isoDateStr);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

/** ISO DATE 문자열로부터 요일(ex. 일)을 추출하는 함수 */
export const getDay = (isoDateStr: string) => {
  const date = new Date(isoDateStr);

  date.setHours(date.getHours() + 9);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return daysOfWeek[date.getDay()];
};

/** ISO DATE 문자열로부터 시간(ex. 오후 07:42)을 추출하는 함수 */
export const getTime = (isoDateStr: string) => {
  const date = new Date(isoDateStr);

  date.setHours(date.getHours() + 9);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? '오후' : '오전';

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  return `${period} ${hours}:${minutes.toString().padStart(2, '0')}`;
};

const TIME_FACTORS = {
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 60 * 60 * 24,
};

export const getElapsedTime = (createdAt: string): string => {
  const diff = new Date().getTime() - new Date(createdAt).getTime();
  const diffSec = diff / 1000;

  // 1분 이내
  if (diffSec < TIME_FACTORS.MINUTE) return `방금전`;
  // 1시간 이내
  if (diffSec < TIME_FACTORS.HOUR) return `${Math.floor(diffSec / TIME_FACTORS.MINUTE)}분 전`;
  // 1일 이내
  if (diffSec < TIME_FACTORS.DAY) return `${Math.floor(diffSec / TIME_FACTORS.HOUR)}시간 전`;

  return `${Math.floor(diffSec / TIME_FACTORS.DAY)}일 전`;
};

export const getDateFormat = (date: string, options?: { showDate?: boolean; showDay?: boolean; showTime?: boolean }) =>
  (options?.showDate !== false ? getDate(date) : '') +
  (options?.showDay !== false ? `(${getDay(date)})` : '') +
  (options?.showTime !== false ? ` ${getTime(date)}` : '');

const timeToMinutes = (time: string) => {
  const [hour, minute] = time.split(':').map((x) => +x);
  return 60 * hour + minute;
};

export const isCurTimeBetweenOpeningTimeAndClosingTime = (openingTime: string, closingTime: string) => {
  const curTimeTotalMinutes = timeToMinutes(new Date().toTimeString().slice(0, 5));
  const openingTimeTotalMinutes = timeToMinutes(openingTime);
  const closingTimeTotalMinutes = timeToMinutes(closingTime);
  if (closingTimeTotalMinutes >= openingTimeTotalMinutes) {
    return curTimeTotalMinutes >= openingTimeTotalMinutes && curTimeTotalMinutes <= closingTimeTotalMinutes;
  } else {
    return curTimeTotalMinutes >= openingTimeTotalMinutes || curTimeTotalMinutes <= closingTimeTotalMinutes;
  }
};

export const getFormattingDate = (date: Date, addedMinutes: number = 0): string => {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + addedMinutes);

  const month = months[newDate.getMonth()];
  const day = newDate.getDate();
  const hours = newDate.getHours().toString().padStart(2, '0');
  const minutes = newDate.getMinutes().toString().padStart(2, '0');

  return `${month} ${day}일 ${hours}:${minutes}`;
};

export const getFormattedTime = (hours: number, minutes: number, ampm: 'AM' | 'PM'): string => {
  return `${ampm === 'AM' ? hours.toString().padStart(2, '0') : (hours + 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const getMinutes = (time: string) => {
  const [hour, minute] = time.split(':');
  return parseInt(hour, 10) * 60 + parseInt(minute, 10);
};

export const getHoursMinutesAMPM = (time: string) => {
  const [hourStr, minuteStr] = time.split(':');
  let hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  // AM/PM 구분
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // 12시간 형식으로 변환
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return {
    hours,
    minutes,
    ampm,
  };
};

export const formatToHour = (time: string) => {
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;

  const meridiem = hour < 12 ? '오전' : '오후';

  hour = hour % 12;
  if (hour === 0) hour = 12;

  const formattedHour = hour.toString().padStart(2, '0');

  return `${meridiem} ${formattedHour}:${minute}`;
};

export const getFormattedStartEnd = (startTime: string, endTime: string) => {
  const startMinutes = getMinutes(startTime);
  const endMinutes = getMinutes(endTime);

  const isNextDay = endMinutes <= startMinutes;

  const formattedStart = formatToHour(startTime);
  const formattedEnd = (isNextDay ? ' 다음날 ' : '') + formatToHour(endTime);

  return `${formattedStart} - ${formattedEnd}`;
};

export const getMonthDateDay = (dateStr: Date) => {
  const monthNames = ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'];

  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  const month = monthNames[dateStr.getMonth()];
  const date = dateStr.getDate();
  const day = dayNames[dateStr.getDay()];

  return { month, date, day };
};
