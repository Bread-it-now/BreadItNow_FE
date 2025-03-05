export type ProductType = "BREAD" | "OTHER";

export interface Product {
  productId: string;
  bakery_id: string;
  type: ProductType;
  name: string;
  price: number;
  image?: string;
  description?: string;
  stock: number;
  relaseTime?: string;
  isActive: boolean;
}
