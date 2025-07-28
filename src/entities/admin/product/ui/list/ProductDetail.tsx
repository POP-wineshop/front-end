import { ProductRes } from '@/types/backOffice/product/ProductRes';
import { Pencil, Trash2 } from 'lucide-react';

const ProductDetail = ({ product }: { product: ProductRes }) => {
  if (!product) return null;

  return (
    <div className="m-auto w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 border">
      {/* 기존 상세 테이블 */}
      <table className="w-full border-collapse text-sm table-fixed">
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <tbody>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              이미지
            </th>
            <td className="text-center p-2" colSpan={6}>
              {/* 이미지 구현 시 src 교체 */}
              <div className="m-auto w-32 h-32 bg-gray-200 flex items-center justify-center rounded-md">
                <span className="text-gray-400">No Image</span>
              </div>
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              한글명
            </th>
            <td
              className="text-center p-2 font-bold"
              colSpan={6}
              title={product.korName}
            >
              {product.korName}
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              영문명
            </th>
            <td className="text-center p-2" colSpan={6} title={product.engName}>
              {product.engName}
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              요약 설명
            </th>
            <td className="text-center p-2" colSpan={6}>
              {/* {product.description || '-'} */}-
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              국가/지역
            </th>
            <td className="text-center p-2" colSpan={6}>
              {product.country} {product.region && <> &gt; {product.region}</>}
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              와이너리
            </th>
            <td className="text-center p-2" colSpan={6}>
              {/* {product.winery || '-'} */}-
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              품종
            </th>
            <td className="text-center p-2" colSpan={6}>
              {product.grapeVariety || '-'}
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              당도
            </th>
            <td className="text-center p-2" colSpan={2}>
              {product.tasteProfile.sweetness || '-'}
            </td>
            <th className="p-2 bg-gray-100" colSpan={2}>
              산도
            </th>
            <td className="text-center p-2" colSpan={2}>
              {product.tasteProfile.acidity || '-'}
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              바디
            </th>
            <td className="text-center p-2" colSpan={2}>
              {product.tasteProfile.body || '-'}
            </td>
            <th className="p-2 bg-gray-100" colSpan={2}>
              도수
            </th>
            <td className="text-center p-2" colSpan={2}>
              {product.alcoholContent ? `${product.alcoholContent}%` : '-'}
            </td>
          </tr>
          <tr>
            <th className="p-2 bg-gray-100" colSpan={2}>
              가격
            </th>
            <td className="text-center p-2 font-semibold" colSpan={2}>
              ₩{product.price?.toLocaleString() || '0'}
            </td>
            <th className="p-2 bg-gray-100" colSpan={2}>
              재고
            </th>
            <td className="text-center p-2" colSpan={2}>
              {product.stock}
            </td>
          </tr>
        </tbody>
      </table>
      {/* 버튼 영역: 테이블 위에 노출 */}
      <div className="flex justify-between gap-2 mt-4">
        <button
          className="w-full flex justify-center items-center gap-1 px-3 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
          onClick={() => alert('제품 수정 기능 연결 예정')}
        >
          <Pencil className="w-4 h-4" />
          제품 수정
        </button>
        <button
          className="w-full flex justify-center items-center gap-1 px-3 py-1 rounded bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
          onClick={() => window.confirm('정말 삭제하시겠습니까?')}
        >
          <Trash2 className="w-4 h-4" />
          제품 삭제
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
