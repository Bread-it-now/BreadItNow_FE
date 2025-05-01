export interface SidoRegion {
  sidoCode: string;
  sidoName: string;
}

export interface GuGunRegion {
  sidoCode: string;
  gugunCode: string;
  gugunName: string;
}

export interface Region {
  sidoRegion: SidoRegion;
  gugunRegion: GuGunRegion;
}
