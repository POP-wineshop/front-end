import {
  Search,
  ArrowDownAZ,
  ListOrdered,
  TrendingUp,
  Clock3,
} from 'lucide-react';

import { useState } from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import { ProductRes } from '@/types/backOffice/product/productRes';

const ProductListPanel = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductRes | null>(
    null
  );
  const [sortKey, setSortKey] = useState<'name' | 'stock' | 'sales' | 'latest'>(
    'name'
  );

  return (
    <div className="m-auto flex h-[80vh] rounded-xl overflow-hidden shadow-lg border bg-gray-50">
      <div className="w-[800px] border-r bg-white flex flex-col">
        {/* 정렬 옵션바 */}
        <div className="flex gap-4 justify-between items-center py-4 px-10 border-b bg-gray-50">
          <button
            className={`flex items-center gap-1 ${
              sortKey === 'latest' ? 'font-bold text-red-500' : ''
            }`}
            onClick={() => setSortKey('latest')}
          >
            <Clock3 className="w-4 h-4" />
            등록 최신 순
          </button>
          <button
            className={`flex items-center gap-1 ${
              sortKey === 'name' ? 'font-bold text-red-500' : ''
            }`}
            onClick={() => setSortKey('name')}
          >
            <ArrowDownAZ className="w-4 h-4" />
            이름 순
          </button>
          <button
            className={`flex items-center gap-1 ${
              sortKey === 'stock' ? 'font-bold text-red-500' : ''
            }`}
            onClick={() => setSortKey('stock')}
          >
            <ListOrdered className="w-4 h-4" />
            재고 순
          </button>
          <button
            className={`flex items-center gap-1 ${
              sortKey === 'sales' ? 'font-bold text-red-500' : ''
            }`}
            onClick={() => setSortKey('sales')}
          >
            <TrendingUp className="w-4 h-4" />
            판매 순
          </button>

          {/* 검색창 */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="찾으시는 와인 이름을 입력해주세요"
              className="pl-8 pr-2 py-1 border rounded w-full"
            />
          </div>
        </div>
        {/* 리스트 영역 */}
        <div className="flex-1 overflow-y-auto p-8">
          <ProductList
            onSelect={setSelectedProduct}
            selectedProduct={selectedProduct}
            sortKey={sortKey}
          />
        </div>
      </div>
      {/* 상세 영역 */}
      <div className="w-[600px] flex-1 flex items-center justify-center bg-gray-50 p-8">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} />
        ) : (
          <div className="text-gray-400 text-center flex flex-col items-center">
            <span className="text-4xl mb-2">🛒</span>
            <p>상품을 선택하면 상세 정보가 여기에 표시됨</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPanel;
