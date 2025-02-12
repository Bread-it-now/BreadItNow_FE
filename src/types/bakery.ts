export const OPERATING_STATUS = {
  OPEN: "영업중",
  CLOSED: "영업 종료",
  TEMPORARY_CLOSED: "임시 휴업",
} as const;

export interface Bakery {
  id: number;
  ownerId: number;
  operatingStatus: keyof typeof OPERATING_STATUS;
  name: string;
  address: string;
  phone: string;
  introudction: string;
  profileImgUrl: string;
  openTime: string;
  city: string;
  region: string;
  description: string;
  zipcode: string;
  latitude?: string;
  longitude?: string;
}
