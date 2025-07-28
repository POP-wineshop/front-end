import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { ProductRes } from '@/types/backOffice/product/ProductRes';

interface ProductListProps {
  onSelect: (product: ProductRes) => void;
  selectedProduct: ProductRes | null;
  sortKey: 'name' | 'stock' | 'sales' | 'latest';
}

const ProductList = ({
  onSelect,
  selectedProduct,
  sortKey,
}: ProductListProps) => {
  const [productList, setProductList] = useState<ProductRes[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/wines`)
      .then((response) => response.json())
      .then((jsonResponse) => setProductList(jsonResponse.data))
      .catch((err) => console.error('GET 요청 오류', err));
  }, []);

  // 정렬 적용 (이름/재고/등록일)
  const sortedList = [...productList].sort((a, b) => {
    if (sortKey === 'name') {
      return a.korName.localeCompare(b.korName);
    }
    if (sortKey === 'stock') {
      return b.stock - a.stock; // 재고 많은 순
    }
    if (sortKey === 'latest') {
      // 등록일이 최신일수록 먼저, 날짜 필드는 예시로 'createdAt' 사용
      return b.id - a.id;
    }
    // 판매순 정렬은 미구현 (추후 추가)
    return 0;
  });

  return (
    <div className="flex flex-col gap-2">
      {sortedList.map((product) => (
        <div
          key={product.korName}
          onClick={() => onSelect(product)}
          className="cursor-pointer"
        >
          <ProductItem
            product={product}
            selected={selectedProduct?.korName === product.korName}
          />
        </div>
      ))}
    </div>
  );
};
export default ProductList;
