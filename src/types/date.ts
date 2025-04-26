/**
 * 출석요일
 * 1: 일요일 ~ 7: 토요일
 */
import { KOR_TO_ENG_DAY } from '@/lib/shared/date';
import { ENG_TO_KOR_DAY } from '@/lib/shared/date';

export type KOR_DAY = keyof typeof KOR_TO_ENG_DAY;
export type ENG_DAY = keyof typeof ENG_TO_KOR_DAY;
