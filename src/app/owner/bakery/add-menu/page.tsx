'use client';

import { ProductForm } from '@/types/bakery';
import { ProductFormLayout } from '../edit-menu/[id]/page';
import { createProduct } from '@/lib/api/bakery';

const bakeryId = 1;

export default function Page() {
  return (
    <ProductFormLayout
      type={'CREATE'}
      mutate={(productForm: ProductForm) => createProduct(bakeryId, productForm)}
      initValue={null}
    />
  );
}
