// components/UserItem.tsx
import { UserWithOrders } from '@/types/backOffice/user/user';

interface UserItemProps {
  user: UserWithOrders;
  selected?: boolean;
}

const UserItem = ({ user, selected }: UserItemProps) => (
  <div
    className={`border rounded-lg px-6 py-2 mb-2 bg-white ${
      selected ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
    }`}
  >
    <div className="flex justify-between">
      <div>
        <span className="font-semibold">{user.name}</span>
        <span className="ml-2 text-xs text-gray-400">{user.email}</span>
      </div>
      <div>
        <span
          className={`px-2 py-1 rounded text-xs ${
            user.role === 'admin'
              ? 'bg-red-100 text-red-500'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {user.role}
        </span>
      </div>
    </div>
    <div className="text-xs text-gray-500">
      가입일: {user.createdAt} | 상태: {user.status}
    </div>
  </div>
);

export default UserItem;
