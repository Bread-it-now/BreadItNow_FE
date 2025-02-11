export interface Bakery {
  id: number;
  ownerId: number;
  opeartingStatus: "OPEN" | "CLOSED" | "TEMPORARY_CLOSED";
  name: string;
  address: string;
  phone: string;
  introudction: string;
  profileImg: string;
  openTime: string;
  city: string;
  region: string;
  description: string;
  zipcode: string;
  latitude?: string;
  longitude?: string;
}
