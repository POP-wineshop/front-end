import { ArrowRight } from 'lucide-react';

type OrderItemProps = {
  orderNumber: string;
  status: string;
  date: string;
  totalPayment: number;
};

const OrderItem = ({
  orderNumber,
  status,
  date,
  totalPayment,
}: OrderItemProps) => {
  return (
    <>
      <tr className="group border-b hover:bg-gray-100 cursor-pointer">
        <td className="py-2 px-4 text-center w-1/4 ">{orderNumber}</td>
        <td className="py-2 px-4 text-center w-1/4">{status}</td>
        <td className="py-2 px-4 text-center w-1/4">{date}</td>
        <td className="py-2 px-4 text-center w-1/4 relative">
          {totalPayment.toLocaleString()}
          <ArrowRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition" />
        </td>
      </tr>
    </>
  );
};

export default OrderItem;
