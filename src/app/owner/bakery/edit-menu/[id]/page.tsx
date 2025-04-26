'use client';

import { editProduct, useBakeryProduct } from '@/lib/api/bakery';
import { ProductForm } from '@/types/bakery';
import { useParams } from 'next/navigation';
import { ProductFormLayout } from '@/components/productformlayout/ProductFormLayout';

const bakeryId = 1;

export default function Page() {
  const params = useParams<{ id: string }>();
  const productId = Number(params.id);
  const { data: product } = useBakeryProduct(bakeryId, productId);
  const initValue: ProductForm | null = product
    ? {
        productType: product.productType,
        breadCategoryIds: product.breadCategories ? product.breadCategories.map((category) => category.categoryId) : [],
        name: product.name,
        price: product.price,
        description: product.description,
        releaseTimes: product.releaseTimes || [],
      }
    : null;

  return (
    product && (
      <ProductFormLayout
        type={'EDIT'}
        mutate={(productForm: ProductForm) => editProduct(bakeryId, productId, productForm)}
        initValue={initValue}
        productId={productId}
      />
    )
  );
}
