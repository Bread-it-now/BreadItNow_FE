import BakeryImg from "@/assets/images/bakery.png";

export const suggestions = ["즐거운 빵집", "빵 굽는집", "즐거운 빵집"];

export const bakeryList = [
  {
    id: 1,
    operatingStatus: "OPEN" as const,
    profileImgUrl: BakeryImg.src,
    name: "라 메종 뒤 팡 에 뒤 레브",
    distance: 1.5,
    size: "large" as const,
  },
  {
    id: 2,
    operatingStatus: "OPEN" as const,
    profileImgUrl: BakeryImg.src,
    name: "라 메종 뒤 팡 에 뒤 레브",
    distance: 1.5,
    size: "large" as const,
  },
];

export const breadList = [
  {
    id: 1,
    profileImgUrl: BakeryImg.src,
    name: "크루아상",
    description: "달콤한 아침",
    price: "3,200원",
    size: "normal" as const,
  },
  {
    id: 2,
    profileImgUrl: BakeryImg.src,
    name: "바게트",
    description: "달콤한 아침",
    price: "3,200원",
    size: "normal" as const,
  },
  {
    id: 3,
    profileImgUrl: BakeryImg.src,
    name: "크루아상",
    description: "달콤한 아침",
    price: "3,200원",
    size: "normal" as const,
  },
  {
    id: 4,
    profileImgUrl: BakeryImg.src,
    name: "바게트",
    description: "달콤한 아침",
    price: "3,200원",
    size: "normal" as const,
  },
];
