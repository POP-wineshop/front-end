import { ProductRes } from '@/types/backOffice/product/productRes';
import { ArrowRight } from 'lucide-react';

interface ProductItemProps {
  product: ProductRes;
  selected?: boolean;
}

const ProductItem = ({ product, selected }: ProductItemProps) => (
  <div
    className={`
      group relative flex items-center justify-between rounded-lg border bg-white px-6 py-2 shadow-sm 
      hover:shadow-md transition 
      ${
        selected
          ? 'border-red-400 ring-2 ring-red-200 bg-red-50'
          : 'border-gray-200'
      }
    `}
  >
    <table className="w-full text-sm text-gray-700">
      <tbody>
        <tr className="leading-tight">
          <th className="px-2 py-1 text-sm text-gray-500 bg-gray-100">
            {product.id}
          </th>
          <td
            className={`px-2 py-1 font-semibold truncate w-[220px] ${
              product.korName.length > 30 ? 'text-sm' : 'text-base'
            } `}
            colSpan={5}
          >
            {product.korName}
          </td>
          <th className="px-2 py-1 text-sm text-gray-500 bg-gray-100">가격</th>
          <td className="px-2 py-1 text-xs text-black text-center">
            ₩{product.price.toLocaleString()}
          </td>
        </tr>
        <tr className="border-t border-b align-middle">
          <th className="px-2 py-1 text-sm text-gray-500 bg-gray-100">타입</th>
          <td className="w-[80px] px-2 py-1 text-xs text-center whitespace-nowrap">
            {product.wineType}
          </td>
          <th className="px-2 py-1 text-sm text-gray-500 bg-gray-100">국가</th>
          <td className="w-[80px] px-2 py-1 text-xs text-center whitespace-nowrap">
            {product.country}
          </td>
          <th className="px-2 py-1 text-sm text-gray-500 bg-gray-100">
            빈티지
          </th>
          <td className="w-[80px] px-2 py-1 text-xs text-center whitespace-nowrap">
            {product.vintage}
          </td>
          <th className="px-2 py-1 text-sm text-gray-500 bg-gray-100">재고</th>
          <td className="w-[80px] px-2 py-1 text-xs text-center whitespace-nowrap">
            {product.stock}
          </td>
        </tr>
      </tbody>
    </table>
    <ArrowRight className="absolute right-2 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-400 opacity-0 group-hover:opacity-100 transition" />
  </div>
);

export default ProductItem;
