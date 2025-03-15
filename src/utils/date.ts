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

export const getDateFormat = (date: string) => getDate(date) + `(${getDay(date)}) ` + getTime(date);
