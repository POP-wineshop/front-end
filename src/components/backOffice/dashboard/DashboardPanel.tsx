import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/backOffice/dashboard/DashboardCard';
import {
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  RefreshCcw,
} from 'lucide-react';

const recentOrders = [
  { id: 101, user: '김OO', date: '07/14', total: '59,000', status: '배송중' },
  { id: 100, user: '이OO', date: '07/13', total: '38,000', status: '결제완료' },
  { id: 99, user: '박OO', date: '07/13', total: '42,000', status: '결제완료' },
];

const lowStocks = [
  { name: '샤또 루비통', stock: 2 },
  { name: '페트루스', stock: 1 },
];

const DashboardPanel = () => {
  return (
    <div className="m-auto h-[80vh] rounded-xl overflow-hidden shadow-lg border bg-gray-50 p-8">
      {/* 상단: 요약 + 기간 선택 */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600 flex items-center gap-1">
                총 와인 수
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-500">+3</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-gray-900">120</div>
              <div className="text-xs text-gray-400">종</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600 flex items-center gap-1">
                총 주문 수
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <span className="text-xs text-red-500">-1</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-gray-900">58</div>
              <div className="text-xs text-gray-400">건</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">판매 완료</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-gray-900">41</div>
              <div className="text-xs text-gray-400">건</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">회원 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold text-gray-900">35</div>
              <div className="text-xs text-gray-400">명</div>
            </CardContent>
          </Card>
        </div>
        {/* 우측: 기간 필터/새로고침 */}
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button className="bg-white rounded-md px-3 py-1 text-sm border text-gray-600 hover:bg-gray-100">
            오늘
          </button>
          <button className="bg-white rounded-md px-3 py-1 text-sm border text-gray-600 hover:bg-gray-100">
            이번 달
          </button>
          <button className="bg-white rounded-md px-3 py-1 text-sm border text-gray-600 hover:bg-gray-100">
            전체
          </button>
          <button
            className="ml-2 bg-white rounded-full p-2 border hover:bg-gray-100"
            title="새로고침"
          >
            <RefreshCcw className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* 최근 주문 카드 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
            최근 주문
            <span className="ml-2 text-xs text-gray-400 font-normal">
              최근 3건
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400">
                <th className="py-1">주문자</th>
                <th className="py-1">일자</th>
                <th className="py-1">결제금액</th>
                <th className="py-1">상태</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-2">{order.user}</td>
                  <td className="py-2">{order.date}</td>
                  <td className="py-2">{order.total}원</td>
                  <td className="py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* 재고 부족 알림 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
            재고 부족 와인
            <AlertCircle className="w-4 h-4 text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lowStocks.length === 0 ? (
            <div className="text-sm text-gray-400">부족한 재고 없음</div>
          ) : (
            <ul className="space-y-2">
              {lowStocks.map((wine, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-gray-800">{wine.name}</span>
                  <span className="text-xs bg-red-100 text-red-500 rounded px-2 py-0.5">
                    재고 {wine.stock}개
                  </span>
                  {wine.stock < 3 && (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPanel;
