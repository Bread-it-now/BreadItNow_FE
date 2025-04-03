'use client';
import { useBakeryProduct } from '@/lib/api/bakery';

export default function Page() {
  const bakeryId = 1;
  const productId = 1;
  const { data: product } = useBakeryProduct(bakeryId, productId);
  return (
    <div>
      {product && <span>{product.productId}</span>}
      <h1>메뉴 수정 페이지</h1>
    </div>
  );
}
